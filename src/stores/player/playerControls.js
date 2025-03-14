export function usePlayerControls(state, { initAudio, fetchLyrics }) {
  // 播放
  const play = async (track) => {
    if (!track) return;
    
    try {
      // 初始化音频
      if (!state.audioElement.value) {
        await initAudio();
      }
      
      // 设置当前音轨
      state.currentTrack.value = track;
      
      // 设置音频源
      state.audioElement.value.src = track.url || track.path;
      
      // 加载并播放
      state.loading.value = true;
      
      try {
        await state.audioElement.value.play();
        state.isPlaying.value = true;
        state.loading.value = false;
        
        // 获取歌词
        fetchLyrics(track);
        
        // 添加到最近播放记录
        try {
          await window.electronAPI.addRecentTrack(track);
        } catch (err) {
          console.error('添加到最近播放记录失败:', err);
        }
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
  
  // 停止播放
  const stop = () => {
    if (!state.audioElement.value) return;
    
    state.audioElement.value.pause();
    state.audioElement.value.currentTime = 0;
    state.isPlaying.value = false;
    state.updateCurrentTime(0);
  };
  
  // 跳转到指定时间
  const seek = (time) => {
    if (!state.audioElement.value) return;
    
    // 确保时间在有效范围内
    const seekTime = Math.max(0, Math.min(time, state.duration.value));
    
    state.audioElement.value.currentTime = seekTime;
    state.updateCurrentTime(seekTime);
  };
  
  // 设置音量
  const setVolume = (volume) => {
    if (!state.audioElement.value) return;
    
    // 确保音量在 0-1 范围内
    const validVolume = Math.max(0, Math.min(1, volume));
    
    state.volume.value = validVolume;
    state.audioElement.value.volume = validVolume;
    
    // 如果设置了音量，取消静音
    if (validVolume > 0 && state.isMuted.value) {
      state.isMuted.value = false;
      state.audioElement.value.muted = false;
    }
  };
  
  // 设置播放模式
  const setPlayMode = (mode) => {
    if (['sequence', 'loop', 'random'].includes(mode)) {
      state.playMode.value = mode;
    }
  };
  
  // 播放下一首
  const playNext = async () => {
    if (!state.playlist.value.length || !state.currentTrack.value) return;
    
    let nextIndex = -1;
    const currentIndex = state.playlist.value.findIndex(track => track.id === state.currentTrack.value.id);
    
    // 根据播放模式决定下一首
    switch (state.playMode.value) {
      case 'sequence':
        // 顺序播放，到最后一首后停止
        nextIndex = currentIndex + 1;
        if (nextIndex >= state.playlist.value.length) {
          // 已经是最后一首，停止播放
          pause();
          return;
        }
        break;
        
      case 'loop':
        // 循环播放，到最后一首后回到第一首
        nextIndex = (currentIndex + 1) % state.playlist.value.length;
        break;
        
      case 'random':
        // 随机播放
        if (state.playlist.value.length === 1) {
          nextIndex = 0;
        } else {
          // 确保不会随机到当前歌曲
          do {
            nextIndex = Math.floor(Math.random() * state.playlist.value.length);
          } while (nextIndex === currentIndex);
        }
        break;
    }
    
    if (nextIndex >= 0 && nextIndex < state.playlist.value.length) {
      await play(state.playlist.value[nextIndex]);
    }
  };
  
  // 播放上一首
  const playPrev = async () => {
    if (!state.playlist.value.length || !state.currentTrack.value) return;
    
    let prevIndex = -1;
    const currentIndex = state.playlist.value.findIndex(track => track.id === state.currentTrack.value.id);
    
    // 根据播放模式决定上一首
    switch (state.playMode.value) {
      case 'sequence':
      case 'loop':
        // 顺序和循环模式下，上一首就是索引-1
        prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
          // 如果是循环模式且已经是第一首，则播放最后一首
          if (state.playMode.value === 'loop') {
            prevIndex = state.playlist.value.length - 1;
          } else {
            // 顺序模式下，已经是第一首，重新播放当前歌曲
            prevIndex = 0;
          }
        }
        break;
        
      case 'random':
        // 随机播放模式下，随机选择一首
        if (state.playlist.value.length === 1) {
          prevIndex = 0;
        } else {
          // 确保不会随机到当前歌曲
          do {
            prevIndex = Math.floor(Math.random() * state.playlist.value.length);
          } while (prevIndex === currentIndex);
        }
        break;
    }
    
    if (prevIndex >= 0 && prevIndex < state.playlist.value.length) {
      await play(state.playlist.value[prevIndex]);
    }
  };
  
  // 切换可视化效果显示
  const toggleVisualizer = () => {
    state.showVisualizer.value = !state.showVisualizer.value;
  };
  
  // 切换歌词显示
  const toggleLyrics = () => {
    state.showLyrics.value = !state.showLyrics.value;
  };
  
  // 重新播放当前歌曲
  const replay = async () => {
    if (!state.currentTrack.value) return;
    
    // 重置播放位置
    if (state.audioElement.value) {
      state.audioElement.value.currentTime = 0;
      state.updateCurrentTime(0);
    }
    
    // 如果当前是暂停状态，则恢复播放
    if (!state.isPlaying.value) {
      await resume();
    }
  };
  
  // 快进
  const fastForward = (seconds = 10) => {
    if (!state.audioElement.value) return;
    
    const newTime = Math.min(state.audioElement.value.currentTime + seconds, state.duration.value);
    state.audioElement.value.currentTime = newTime;
    state.updateCurrentTime(newTime);
  };
  
  // 快退
  const rewind = (seconds = 10) => {
    if (!state.audioElement.value) return;
    
    const newTime = Math.max(state.audioElement.value.currentTime - seconds, 0);
    state.audioElement.value.currentTime = newTime;
    state.updateCurrentTime(newTime);
  };
  
  // 设置播放速率
  const setPlaybackRate = (rate) => {
    if (!state.audioElement.value) return;
    
    // 确保播放速率在合理范围内
    const validRate = Math.max(0.25, Math.min(2, rate));
    state.audioElement.value.playbackRate = validRate;
  };
  
  // 监听轨道结束事件，自动播放下一首
  const setupTrackEndedListener = () => {
    window.addEventListener('track-ended', playNext);
    
    // 返回清理函数
    return () => {
      window.removeEventListener('track-ended', playNext);
    };
  };
  
  // 初始化键盘快捷键
  const setupKeyboardShortcuts = () => {
    const handleKeyDown = (event) => {
      // 如果焦点在输入框、文本区域等元素上，不处理快捷键
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      
      switch (event.key) {
        case ' ': // 空格键
          event.preventDefault();
          togglePlay();
          break;
          
        case 'ArrowRight': // 右箭头
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            playNext();
          } else {
            event.preventDefault();
            fastForward();
          }
          break;
          
        case 'ArrowLeft': // 左箭头
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            playPrev();
          } else {
            event.preventDefault();
            rewind();
          }
          break;
          
        case 'ArrowUp': // 上箭头
          event.preventDefault();
          setVolume(Math.min(1, state.volume.value + 0.1));
          break;
          
        case 'ArrowDown': // 下箭头
          event.preventDefault();
          setVolume(Math.max(0, state.volume.value - 0.1));
          break;
          
        case 'm': // 静音
        case 'M':
          event.preventDefault();
          state.toggleMute();
          break;
          
        case 'r': // 切换播放模式
        case 'R':
          event.preventDefault();
          state.togglePlayMode();
          break;
      }
    };
    
    // 添加键盘事件监听器
    window.addEventListener('keydown', handleKeyDown);
    
    // 返回清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  };
  
  return {
    play,
    pause,
    resume,
    togglePlay,
    stop,
    seek,
    setVolume,
    setPlayMode,
    playNext,
    playPrev,
    toggleVisualizer,
    toggleLyrics,
    replay,
    fastForward,
    rewind,
    setPlaybackRate,
    setupTrackEndedListener,
    setupKeyboardShortcuts
  };
}
