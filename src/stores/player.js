import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';
import { usePlayerState } from './player/playerState';
import { usePlayerAudio } from './player/playerAudio';
import { usePlayerControls } from './player/playerControls';
import { usePlayerPlaylist } from './player/playerPlaylist';
import { usePlayerLyrics } from './player/playerLyrics';
import { usePlayerVisualizer } from './player/playerVisualizer';

export const usePlayerStore = defineStore('player', () => {
  // 获取设置存储
  const settingsStore = useSettingsStore();
  
  // 初始化状态
  const state = usePlayerState(settingsStore);
  
  // 初始化音频处理
  const { 
    initAudio, 
    handleTimeUpdate, 
    handleTrackEnded, 
    handleCanPlay, 
    handleError,
    updateCurrentLyric,
    updateVisualizerData,
    destroy
  } = usePlayerAudio(state);
  
  // 初始化歌词处理
  const { 
    lyricSyncOffset,
    parseLrc, 
    fetchLyrics, 
    loadLyricsFromFile,
    loadLyricsFromText,
    loadLyricsFromUrl,
    exportLyricsToLrc,
    editLyrics,
    addLyricLine,
    removeLyricLine,
    setLyricSyncOffset
  } = usePlayerLyrics(state);
  
  // 初始化播放控制
  const { 
    play, 
    pause, 
    togglePlay, 
    playNext, 
    playPrev, 
    seek, 
    setVolume, 
    setPlayMode, 
    stop, 
    toggleVisualizer, 
    toggleLyrics 
  } = usePlayerControls(state, { initAudio, fetchLyrics });
  
  // 初始化播放列表管理
  const { 
    loadPlaylist, 
    addToPlaylist, 
    addMultipleToPlaylist, 
    removeFromPlaylist, 
    clearPlaylist, 
    playTrack, 
    getCurrentPlaylist,
    playlistStore
  } = usePlayerPlaylist(state, { play });
  
  // 初始化可视化处理
  const { 
    initVisualizer, 
    getFrequencyData, 
    getWaveformData, 
    setFftSize, 
    setSmoothingTimeConstant, 
    calculateEnergy, 
    calculateFrequencyBands, 
    detectBeat 
  } = usePlayerVisualizer(state);
  
  // 返回所有状态和方法
  return {
    // 状态
    ...state,
    
    // 音频处理
    initAudio,
    handleTimeUpdate,
    handleTrackEnded,
    handleCanPlay,
    handleError,
    updateCurrentLyric,
    updateVisualizerData,
    destroy,
    
    // 歌词处理
    lyricSyncOffset,
    parseLrc,
    fetchLyrics,
    loadLyricsFromFile,
    loadLyricsFromText,
    loadLyricsFromUrl,
    exportLyricsToLrc,
    editLyrics,
    addLyricLine,
    removeLyricLine,
    setLyricSyncOffset,
    
    // 播放控制
    play,
    pause,
    togglePlay,
    playNext,
    playPrev,
    seek,
    setVolume,
    setPlayMode,
    stop,
    toggleVisualizer,
    toggleLyrics,
    
    // 播放列表管理
    loadPlaylist,
    addToPlaylist,
    addMultipleToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
    playTrack,
    getCurrentPlaylist,
    playlistStore,
    
    // 可视化处理
    initVisualizer,
    getFrequencyData,
    getWaveformData,
    setFftSize,
    setSmoothingTimeConstant,
    calculateEnergy,
    calculateFrequencyBands,
    detectBeat
  };
});
