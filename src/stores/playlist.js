import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePlaylistStore = defineStore('playlist', () => {
  // 状态
  const playlists = ref([]);
  const currentPlaylistId = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // 计算属性
  const currentPlaylist = computed(() => {
    if (!currentPlaylistId.value) return null;
    return playlists.value.find(p => p.id === currentPlaylistId.value) || null;
  });

  // 获取所有播放列表
  const fetchPlaylists = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const result = await window.electronAPI.getPlaylists();
      playlists.value = result;
    } catch (err) {
      console.error('获取播放列表失败:', err);
      error.value = '获取播放列表失败';
    } finally {
      isLoading.value = false;
    }
  };

  // 获取播放列表详情
  const fetchPlaylistDetail = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // 获取所有播放列表
      const allPlaylists = await window.electronAPI.getPlaylists();
      
      // 查找指定ID的播放列表
      const result = allPlaylists.find(playlist => playlist.id === id);
      
      if (result) {
        // 更新播放列表
        const index = playlists.value.findIndex(p => p.id === id);
        if (index !== -1) {
          playlists.value[index] = result;
        } else {
          playlists.value.push(result);
        }
        
        currentPlaylistId.value = id;
      }
      
      return result;
    } catch (err) {
      console.error('获取播放列表详情失败:', err);
      error.value = '获取播放列表详情失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 创建播放列表
  const createPlaylist = async (name, description = '') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const newPlaylist = await window.electronAPI.createPlaylist(name, description);
      playlists.value.push(newPlaylist);
      return newPlaylist;
    } catch (err) {
      console.error('创建播放列表失败:', err);
      error.value = '创建播放列表失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 更新播放列表
  const updatePlaylist = async (id, data) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedPlaylist = await window.electronAPI.updatePlaylist(id, data);
      
      // 更新本地数据
      const index = playlists.value.findIndex(p => p.id === id);
      if (index !== -1) {
        playlists.value[index] = updatedPlaylist;
      }
      
      return updatedPlaylist;
    } catch (err) {
      console.error('更新播放列表失败:', err);
      error.value = '更新播放列表失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 删除播放列表
  const deletePlaylist = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      await window.electronAPI.deletePlaylist(id);
      
      // 更新本地数据
      playlists.value = playlists.value.filter(p => p.id !== id);
      
      // 如果删除的是当前播放列表，清空当前播放列表ID
      if (currentPlaylistId.value === id) {
        currentPlaylistId.value = null;
      }
    } catch (err) {
      console.error('删除播放列表失败:', err);
      error.value = '删除播放列表失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 添加歌曲到播放列表
  const addTracksToPlaylist = async (playlistId, tracks) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedPlaylist = await window.electronAPI.addTracksToPlaylist(playlistId, tracks);
      
      // 更新本地数据
      const index = playlists.value.findIndex(p => p.id === playlistId);
      if (index !== -1) {
        playlists.value[index] = updatedPlaylist;
      }
      
      return updatedPlaylist;
    } catch (err) {
      console.error('添加歌曲到播放列表失败:', err);
      error.value = '添加歌曲到播放列表失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 从播放列表中移除歌曲
  const removeTracksFromPlaylist = async (playlistId, trackIds) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedPlaylist = await window.electronAPI.removeTracksFromPlaylist(playlistId, trackIds);
      
      // 更新本地数据
      const index = playlists.value.findIndex(p => p.id === playlistId);
      if (index !== -1) {
        playlists.value[index] = updatedPlaylist;
      }
      
      return updatedPlaylist;
    } catch (err) {
      console.error('从播放列表中移除歌曲失败:', err);
      error.value = '从播放列表中移除歌曲失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 更新播放列表中歌曲的顺序
  const reorderPlaylistTracks = async (playlistId, trackIds) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedPlaylist = await window.electronAPI.reorderPlaylistTracks(playlistId, trackIds);
      
      // 更新本地数据
      const index = playlists.value.findIndex(p => p.id === playlistId);
      if (index !== -1) {
        playlists.value[index] = updatedPlaylist;
      }
      
      return updatedPlaylist;
    } catch (err) {
      console.error('更新播放列表中歌曲顺序失败:', err);
      error.value = '更新播放列表中歌曲顺序失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 搜索百度云盘中的音频文件
  const searchAudioFiles = async (keyword, path = '/') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      return await window.electronAPI.baiduPan.searchAudioFiles(keyword, { path });
    } catch (err) {
      console.error('搜索音频文件失败:', err);
      error.value = '搜索音频文件失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 获取文件夹中的音频文件
  const getAudioFilesInFolder = async (path) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      return await window.electronAPI.baiduPan.getAudioFileList(path);
    } catch (err) {
      console.error('获取文件夹中的音频文件失败:', err);
      error.value = '获取文件夹中的音频文件失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 设置当前播放列表
  const setCurrentPlaylist = (id) => {
    currentPlaylistId.value = id;
  };

  return {
    playlists,
    currentPlaylistId,
    currentPlaylist,
    isLoading,
    error,
    fetchPlaylists,
    fetchPlaylistDetail,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addTracksToPlaylist,
    removeTracksFromPlaylist,
    reorderPlaylistTracks,
    searchAudioFiles,
    getAudioFilesInFolder,
    setCurrentPlaylist
  };
});
