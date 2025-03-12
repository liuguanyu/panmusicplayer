import { ref, computed } from 'vue';

export function usePlayerState() {
  // 播放器基本状态
  const audioElement = ref(null);
  const audioContext = ref(null);
  const analyser = ref(null);
  const isPlaying = ref(false);
  const isMuted = ref(false);
  const volume = ref(0.8); // 0-1 范围
  const currentTime = ref(0);
  const duration = ref(0);
  const buffered = ref(0);
  const currentTrack = ref(null);
  const playlist = ref([]);
  const playMode = ref('sequence'); // sequence, loop, random
  const lyrics = ref(null);
  const currentLyricIndex = ref(-1);
  const visualizerEnabled = ref(true);
  const loading = ref(false);
  const error = ref(null);
  
  // 计算属性
  const progress = computed(() => {
    if (duration.value <= 0) return 0;
    return (currentTime.value / duration.value) * 100;
  });
  
  const formattedCurrentTime = computed(() => {
    return formatTime(currentTime.value);
  });
  
  const formattedDuration = computed(() => {
    return formatTime(duration.value);
  });
  
  const currentLyric = computed(() => {
    if (!lyrics.value || currentLyricIndex.value === -1) return '';
    return lyrics.value[currentLyricIndex.value]?.text || '';
  });
  
  const hasNext = computed(() => {
    if (!playlist.value.length || !currentTrack.value) return false;
    
    if (playMode.value === 'loop') return true;
    
    const currentIndex = playlist.value.findIndex(track => track.id === currentTrack.value.id);
    return currentIndex < playlist.value.length - 1;
  });
  
  const hasPrevious = computed(() => {
    if (!playlist.value.length || !currentTrack.value) return false;
    
    if (playMode.value === 'loop') return true;
    
    const currentIndex = playlist.value.findIndex(track => track.id === currentTrack.value.id);
    return currentIndex > 0;
  });
  
  // 辅助函数
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // 重置状态
  const resetState = () => {
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    buffered.value = 0;
    currentTrack.value = null;
    lyrics.value = null;
    currentLyricIndex.value = -1;
    error.value = null;
  };
  
  // 更新当前播放时间
  const updateCurrentTime = (time) => {
    currentTime.value = time;
  };
  
  // 更新缓冲进度
  const updateBuffered = () => {
    if (!audioElement.value || !audioElement.value.buffered.length) {
      buffered.value = 0;
      return;
    }
    
    const bufferedEnd = audioElement.value.buffered.end(audioElement.value.buffered.length - 1);
    buffered.value = (bufferedEnd / duration.value) * 100;
  };
  
  // 设置播放模式
  const setPlayMode = (mode) => {
    if (['sequence', 'loop', 'random'].includes(mode)) {
      playMode.value = mode;
    }
  };
  
  // 切换播放模式
  const togglePlayMode = () => {
    const modes = ['sequence', 'loop', 'random'];
    const currentIndex = modes.indexOf(playMode.value);
    const nextIndex = (currentIndex + 1) % modes.length;
    playMode.value = modes[nextIndex];
    return playMode.value;
  };
  
  // 设置音量
  const setVolume = (value) => {
    // 确保音量在 0-1 范围内
    const newVolume = Math.max(0, Math.min(1, value));
    volume.value = newVolume;
    
    if (audioElement.value) {
      audioElement.value.volume = newVolume;
    }
    
    // 如果音量为0，则设置为静音
    if (newVolume === 0) {
      isMuted.value = true;
    } else if (isMuted.value) {
      isMuted.value = false;
    }
  };
  
  // 静音/取消静音
  const toggleMute = () => {
    isMuted.value = !isMuted.value;
    
    if (audioElement.value) {
      audioElement.value.muted = isMuted.value;
    }
  };
  
  // 设置错误状态
  const setError = (errorMessage) => {
    error.value = errorMessage;
    loading.value = false;
  };
  
  // 清除错误状态
  const clearError = () => {
    error.value = null;
  };
  
  return {
    // 状态
    audioElement,
    audioContext,
    analyser,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    buffered,
    currentTrack,
    playlist,
    playMode,
    lyrics,
    currentLyricIndex,
    visualizerEnabled,
    loading,
    error,
    
    // 计算属性
    progress,
    formattedCurrentTime,
    formattedDuration,
    currentLyric,
    hasNext,
    hasPrevious,
    
    // 方法
    resetState,
    updateCurrentTime,
    updateBuffered,
    setPlayMode,
    togglePlayMode,
    setVolume,
    toggleMute,
    setError,
    clearError
  };
}
