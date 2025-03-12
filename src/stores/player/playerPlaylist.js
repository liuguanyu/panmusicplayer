export function usePlayerPlaylist(state, { play }) {
  // 设置播放列表
  const setPlaylist = (tracks, autoPlay = false, startIndex = 0) => {
    if (!Array.isArray(tracks) || tracks.length === 0) {
      console.warn('设置播放列表失败: 无效的播放列表数据');
      return;
    }
    
    // 保存播放列表
    state.playlist.value = [...tracks];
    
    // 如果需要自动播放
    if (autoPlay && tracks.length > startIndex) {
      play(tracks[startIndex]);
    }
  };
  
  // 添加单个音轨到播放列表
  const addTrack = (track, autoPlay = false) => {
    if (!track || !track.id) {
      console.warn('添加音轨失败: 无效的音轨数据');
      return;
    }
    
    // 检查是否已存在
    const exists = state.playlist.value.some(t => t.id === track.id);
    
    if (!exists) {
      // 添加到播放列表
      state.playlist.value = [...state.playlist.value, track];
      
      // 如果需要自动播放且当前没有播放中的音轨
      if (autoPlay && (!state.currentTrack.value || !state.isPlaying.value)) {
        play(track);
      }
    }
  };
  
  // 添加多个音轨到播放列表
  const addTracks = (tracks, autoPlay = false) => {
    if (!Array.isArray(tracks) || tracks.length === 0) {
      console.warn('添加音轨失败: 无效的音轨数据');
      return;
    }
    
    // 过滤出不在播放列表中的音轨
    const newTracks = tracks.filter(track => {
      return track && track.id && !state.playlist.value.some(t => t.id === track.id);
    });
    
    if (newTracks.length > 0) {
      // 添加到播放列表
      state.playlist.value = [...state.playlist.value, ...newTracks];
      
      // 如果需要自动播放且当前没有播放中的音轨
      if (autoPlay && (!state.currentTrack.value || !state.isPlaying.value)) {
        play(newTracks[0]);
      }
    }
  };
  
  // 从播放列表中移除音轨
  const removeTrack = (trackId) => {
    const index = state.playlist.value.findIndex(track => track.id === trackId);
    
    if (index !== -1) {
      // 创建新的播放列表，排除要移除的音轨
      const newPlaylist = [
        ...state.playlist.value.slice(0, index),
        ...state.playlist.value.slice(index + 1)
      ];
      
      // 更新播放列表
      state.playlist.value = newPlaylist;
      
      // 如果移除的是当前播放的音轨
      if (state.currentTrack.value && state.currentTrack.value.id === trackId) {
        // 如果播放列表还有其他音轨，播放下一首
        if (newPlaylist.length > 0) {
          // 尝试播放同一位置的音轨，如果不存在则播放第一首
          const nextIndex = Math.min(index, newPlaylist.length - 1);
          play(newPlaylist[nextIndex]);
        } else {
          // 播放列表为空，重置状态
          state.resetState();
        }
      }
    }
  };
  
  // 清空播放列表
  const clearPlaylist = () => {
    // 停止当前播放并重置状态
    state.resetState();
    
    // 清空播放列表
    state.playlist.value = [];
  };
  
  // 播放指定 ID 的音轨
  const playTrack = (trackId) => {
    const track = state.playlist.value.find(t => t.id === trackId);
    
    if (track) {
      play(track);
    }
  };
  
  // 移动播放列表中的音轨位置
  const moveTrack = (fromIndex, toIndex) => {
    // 确保索引有效
    if (
      fromIndex < 0 || 
      fromIndex >= state.playlist.value.length || 
      toIndex < 0 || 
      toIndex >= state.playlist.value.length ||
      fromIndex === toIndex
    ) {
      return;
    }
    
    // 创建新的播放列表
    const newPlaylist = [...state.playlist.value];
    
    // 移除原位置的音轨
    const [movedTrack] = newPlaylist.splice(fromIndex, 1);
    
    // 插入到新位置
    newPlaylist.splice(toIndex, 0, movedTrack);
    
    // 更新播放列表
    state.playlist.value = newPlaylist;
  };
  
  // 根据条件过滤播放列表
  const filterPlaylist = (filterFn) => {
    if (typeof filterFn !== 'function') {
      console.warn('过滤播放列表失败: 过滤函数无效');
      return;
    }
    
    // 过滤播放列表
    const filteredPlaylist = state.playlist.value.filter(filterFn);
    
    // 更新播放列表
    state.playlist.value = filteredPlaylist;
    
    // 如果当前播放的音轨被过滤掉了
    if (
      state.currentTrack.value && 
      !filteredPlaylist.some(track => track.id === state.currentTrack.value.id)
    ) {
      // 如果过滤后的播放列表不为空，播放第一首
      if (filteredPlaylist.length > 0) {
        play(filteredPlaylist[0]);
      } else {
        // 播放列表为空，重置状态
        state.resetState();
      }
    }
  };
  
  // 排序播放列表
  const sortPlaylist = (sortFn) => {
    if (typeof sortFn !== 'function') {
      console.warn('排序播放列表失败: 排序函数无效');
      return;
    }
    
    // 创建新的播放列表并排序
    const sortedPlaylist = [...state.playlist.value].sort(sortFn);
    
    // 更新播放列表
    state.playlist.value = sortedPlaylist;
  };
  
  // 打乱播放列表顺序
  const shufflePlaylist = () => {
    // 如果播放列表为空或只有一首歌，不需要打乱
    if (state.playlist.value.length <= 1) {
      return;
    }
    
    // 创建新的播放列表
    const newPlaylist = [...state.playlist.value];
    
    // Fisher-Yates 洗牌算法
    for (let i = newPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPlaylist[i], newPlaylist[j]] = [newPlaylist[j], newPlaylist[i]];
    }
    
    // 如果当前有播放的音轨，确保它在新列表的第一位
    if (state.currentTrack.value) {
      const currentIndex = newPlaylist.findIndex(track => track.id === state.currentTrack.value.id);
      
      if (currentIndex !== -1 && currentIndex !== 0) {
        // 将当前播放的音轨移到第一位
        const currentTrack = newPlaylist.splice(currentIndex, 1)[0];
        newPlaylist.unshift(currentTrack);
      }
    }
    
    // 更新播放列表
    state.playlist.value = newPlaylist;
  };
  
  // 获取当前播放列表
  const getCurrentPlaylist = () => {
    return state.playlist.value;
  };
  
  // 播放列表存储对象
  const playlistStore = {
    get: getCurrentPlaylist,
    set: setPlaylist,
    add: addTrack,
    remove: removeTrack,
    clear: clearPlaylist
  };
  
  return {
    loadPlaylist: setPlaylist, // 添加别名，确保与 player.js 中导入的函数名一致
    addToPlaylist: addTrack, // 添加别名，确保与 player.js 中导入的函数名一致
    addMultipleToPlaylist: addTracks, // 添加别名，确保与 player.js 中导入的函数名一致
    removeFromPlaylist: removeTrack, // 添加别名，确保与 player.js 中导入的函数名一致
    setPlaylist,
    addTrack,
    addTracks,
    removeTrack,
    clearPlaylist,
    playTrack,
    moveTrack,
    filterPlaylist,
    sortPlaylist,
    shufflePlaylist,
    getCurrentPlaylist,
    playlistStore
  };
}
