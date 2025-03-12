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
      
      // 设置当前音轨
      state.currentTrack.value = track;
      
      // 设置音频源
      state.audioElement.value.src = track.url;
      
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
      }
    } catch (error) {
      console.error('播放音频失败:', error);
      state.setError('播放音频失败');
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
  
  const handleError = (event) => {
    console.error('音频错误:', event);
    state.setError('音频播放出错');
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
