import { usePlayerLyrics } from './playerLyrics';

export function usePlayerAudio(state) {
  // 获取歌词处理功能
  const { fetchLyrics, lyricSyncOffset } = usePlayerLyrics(state);
  
  // 初始化音频
  const initAudio = async () => {
    initAudioContext();
    createAudioElement();
    return state.audioElement.value;
  };
  
  // 初始化音频上下文
  const initAudioContext = () => {
    if (state.audioContext.value) return;
    
    try {
      // 创建音频上下文
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      state.audioContext.value = new AudioContext();
      
      // 创建分析器节点
      state.analyser.value = state.audioContext.value.createAnalyser();
      
      // 设置分析器参数
      state.analyser.value.fftSize = 256;
      state.analyser.value.smoothingTimeConstant = 0.8;
    } catch (error) {
      console.error('初始化音频上下文失败:', error);
      state.setError('初始化音频上下文失败');
    }
  };
  
  // 创建音频元素
  const createAudioElement = () => {
    if (state.audioElement.value) return;
    
    try {
      // 创建音频元素
      const audio = new Audio();
      
      // 设置音频属性
      audio.volume = state.volume.value;
      audio.muted = state.isMuted.value;
      
      // 添加事件监听器
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);
      audio.addEventListener('progress', handleProgress);
      audio.addEventListener('waiting', () => { state.loading.value = true; });
      audio.addEventListener('canplay', handleCanPlay);
      
      // 保存音频元素
      state.audioElement.value = audio;
    } catch (error) {
      console.error('创建音频元素失败:', error);
      state.setError('创建音频元素失败');
    }
  };
  
  // 播放音频
  const play = async (track) => {
    if (!track) return;
    
    try {
      // 确保音频上下文和元素已初始化
      initAudioContext();
      createAudioElement();
      
      // 如果音频上下文被暂停，恢复它
      if (state.audioContext.value.state === 'suspended') {
        await state.audioContext.value.resume();
      }
      
      // 验证音频源
      const audioUrl = track.url || track.path;
      if (!audioUrl) {
        throw new Error('无效的音频源');
      }
      
      // 验证链接有效性和格式支持
      if (!(await validateAudioUrl(audioUrl)) || !isSupportedAudioFormat(audioUrl)) {
        throw new Error('不支持的音频格式或无效的链接');
      }
      
      // 设置当前音轨
      state.currentTrack.value = track;
      
      // 设置音频源
      state.audioElement.value.src = audioUrl;
      
      // 加载并播放
      state.loading.value = true;
      
      try {
        await state.audioElement.value.play();
        state.isPlaying.value = true;
        state.loading.value = false;
        
        // 获取歌词
        fetchLyrics(track);
      } catch (error) {
        console.error('播放失败:', error);
        state.setError('播放失败');
        // 触发错误处理
        await handleError(error);
      }
    } catch (error) {
      console.error('播放音频失败:', error);
      state.setError(error.message || '播放音频失败');
      // 触发错误处理
      await handleError(error);
    }
  };
  
  // 暂停播放
  const pause = () => {
    if (!state.audioElement.value || !state.isPlaying.value) return;
    
    state.audioElement.value.pause();
    state.isPlaying.value = false;
  };
  
  // 恢复播放
  const resume = async () => {
    if (!state.audioElement.value || state.isPlaying.value) return;
    
    try {
      // 如果音频上下文被暂停，恢复它
      if (state.audioContext.value && state.audioContext.value.state === 'suspended') {
        await state.audioContext.value.resume();
      }
      
      await state.audioElement.value.play();
      state.isPlaying.value = true;
    } catch (error) {
      console.error('恢复播放失败:', error);
      state.setError('恢复播放失败');
    }
  };
  
  // 切换播放/暂停
  const togglePlay = async () => {
    if (state.isPlaying.value) {
      pause();
    } else {
      await resume();
    }
  };
  
  // 跳转到指定时间
  const seek = (time) => {
    if (!state.audioElement.value) return;
    
    // 确保时间在有效范围内
    const seekTime = Math.max(0, Math.min(time, state.duration.value));
    
    state.audioElement.value.currentTime = seekTime;
    state.updateCurrentTime(seekTime);
  };
  
  // 跳转到指定百分比位置
  const seekByPercentage = (percentage) => {
    if (!state.audioElement.value || !state.duration.value) return;
    
    // 确保百分比在 0-100 范围内
    const validPercentage = Math.max(0, Math.min(100, percentage));
    
    // 计算时间
    const seekTime = (validPercentage / 100) * state.duration.value;
    
    seek(seekTime);
  };
  
  // 销毁音频元素
  const destroyAudioElement = () => {
    if (!state.audioElement.value) return;
    
    // 移除事件监听器
    state.audioElement.value.removeEventListener('timeupdate', handleTimeUpdate);
    state.audioElement.value.removeEventListener('loadedmetadata', handleLoadedMetadata);
    state.audioElement.value.removeEventListener('ended', handleEnded);
    state.audioElement.value.removeEventListener('error', handleError);
    state.audioElement.value.removeEventListener('progress', handleProgress);
    
    // 暂停并清除源
    state.audioElement.value.pause();
    state.audioElement.value.src = '';
    
    // 清除引用
    state.audioElement.value = null;
  };
  
  // 事件处理函数
  const handleTimeUpdate = () => {
    if (!state.audioElement.value) return;
    
    const currentTime = state.audioElement.value.currentTime;
    state.updateCurrentTime(currentTime);
    
    // 更新当前歌词索引
    if (state.lyrics.value && state.lyrics.value.length > 0) {
      // 计算带偏移量的当前时间（秒）
      const adjustedTime = currentTime + (lyricSyncOffset.value / 1000);
      
      // 找到当前时间对应的歌词
      for (let i = state.lyrics.value.length - 1; i >= 0; i--) {
        if (adjustedTime >= state.lyrics.value[i].time) {
          if (state.currentLyricIndex.value !== i) {
            state.currentLyricIndex.value = i;
          }
          break;
        }
      }
    }
  };
  
  const handleLoadedMetadata = () => {
    if (!state.audioElement.value) return;
    
    state.duration.value = state.audioElement.value.duration;
    state.loading.value = false;
  };
  
  const handleTrackEnded = () => {
    state.isPlaying.value = false;
    
    // 触发自定义事件，让播放列表处理下一首
    const event = new CustomEvent('track-ended');
    window.dispatchEvent(event);
  };
  
  // 别名，保持兼容性
  const handleEnded = handleTrackEnded;
  
  // 检查音频格式是否支持
  const isSupportedAudioFormat = (url) => {
    const audio = document.createElement('audio');
    const supportedFormats = ['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg'];
    
    // 检查是否支持播放该类型
    for (const format of supportedFormats) {
      if (audio.canPlayType(format)) {
        return true;
      }
    }
    return false;
  };
  
  // 验证链接有效性
  const validateAudioUrl = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && response.headers.get('content-type')?.startsWith('audio/');
    } catch (error) {
      return false;
    }
  };
  
  // 处理错误
  const handleError = async (error) => {
    console.error('音频播放错误:', error);
    
    // 检查是否为百度网盘文件
    if (state.currentTrack.value?.source === 'baidupan') {
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          console.log(`尝试重新获取文件下载链接... (第${retryCount + 1}次)`);
          // 通过 electron 的 IPC 调用重新获取下载链接
          const newUrl = await window.electron.invoke('baidupan:getDownloadLink', {
            fs_id: state.currentTrack.value.fs_id
          });
          
          if (newUrl) {
            // 验证新链接的有效性
            if (await validateAudioUrl(newUrl) && isSupportedAudioFormat(newUrl)) {
              console.log('成功获取新的下载链接，重试播放');
              // 更新音轨的 URL
              state.currentTrack.value.url = newUrl;
              // 重新设置音频源并播放
              state.audioElement.value.src = newUrl;
              await state.audioElement.value.play();
              return;
            }
          }
          retryCount++;
        } catch (retryError) {
          console.error(`重新获取下载链接失败 (第${retryCount + 1}次):`, retryError);
          retryCount++;
        }
        
        // 在重试之间添加延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // 如果重试失败或不是百度网盘文件，设置错误状态
    state.setError('播放失败，请稍后重试');
    state.loading.value = false;
  };
  
  const handleProgress = () => {
    state.updateBuffered();
  };
  
  const handleCanPlay = () => {
    state.loading.value = false;
  };
  
  // 更新当前歌词
  const updateCurrentLyric = () => {
    if (!state.lyrics.value || state.currentLyricIndex.value === -1) return '';
    return state.lyrics.value[state.currentLyricIndex.value]?.text || '';
  };
  
  // 更新可视化数据
  const updateVisualizerData = () => {
    if (!state.audioContext.value || !state.analyser.value || !state.visualizerEnabled.value) return null;
    
    try {
      // 创建数据数组
      const dataArray = new Uint8Array(state.analyser.value.frequencyBinCount);
      
      // 获取频率数据
      state.analyser.value.getByteFrequencyData(dataArray);
      
      return dataArray;
    } catch (error) {
      console.error('获取可视化数据失败:', error);
      return null;
    }
  };
  
  // 销毁播放器
  const destroy = () => {
    destroyAudioElement();
    
    // 清除音频上下文
    if (state.audioContext.value) {
      state.audioContext.value.close().catch(console.error);
      state.audioContext.value = null;
    }
    
    // 清除分析器
    state.analyser.value = null;
    
    // 重置状态
    state.resetState();
  };
  
  return {
    // 主要导出函数，与 player.js 中导入的函数保持一致
    initAudio,
    handleTimeUpdate,
    handleTrackEnded,
    handleCanPlay,
    handleError,
    updateCurrentLyric,
    updateVisualizerData,
    destroy,
    
    // 其他有用的函数，保持向后兼容性
    initAudioContext,
    createAudioElement,
    play,
    pause,
    resume,
    togglePlay,
    seek,
    seekByPercentage,
    destroyAudioElement
  };
}
