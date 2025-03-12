import { ref } from 'vue';

export function usePlayerLyrics(state) {
  // 歌词同步偏移量（毫秒）
  const lyricSyncOffset = ref(0);
  
  // 解析 LRC 歌词
  const parseLrc = (lrcContent) => {
    if (!lrcContent || typeof lrcContent !== 'string') {
      return [];
    }
    
    const lines = lrcContent.split('\n');
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g;
    const result = [];
    
    lines.forEach(line => {
      // 跳过空行
      if (!line.trim()) return;
      
      // 匹配时间标签
      const matches = [...line.matchAll(timeRegex)];
      
      if (matches.length > 0) {
        // 提取歌词文本（去除所有时间标签）
        let text = line.replace(timeRegex, '').trim();
        
        // 处理每个时间标签
        matches.forEach(match => {
          const minutes = parseInt(match[1], 10);
          const seconds = parseInt(match[2], 10);
          const milliseconds = parseInt(match[3], 10) * (match[3].length === 2 ? 10 : 1);
          
          // 计算总时间（秒）
          const time = minutes * 60 + seconds + milliseconds / 1000;
          
          result.push({
            time,
            text
          });
        });
      }
    });
    
    // 按时间排序
    return result.sort((a, b) => a.time - b.time);
  };
  
  // 从文件中加载歌词
  const loadLyricsFromFile = async (file) => {
    if (!file) {
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
      return;
    }
    
    try {
      // 读取文件内容
      const text = await file.text();
      
      // 解析歌词
      const parsedLyrics = parseLrc(text);
      
      // 更新状态
      state.lyrics.value = parsedLyrics;
      state.currentLyricIndex.value = -1;
    } catch (error) {
      console.error('加载歌词文件失败:', error);
      state.setError('加载歌词文件失败');
      
      // 重置歌词状态
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
    }
  };
  
  // 从文本内容加载歌词
  const loadLyricsFromText = (lrcContent) => {
    if (!lrcContent) {
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
      return;
    }
    
    try {
      // 解析歌词
      const parsedLyrics = parseLrc(lrcContent);
      
      // 更新状态
      state.lyrics.value = parsedLyrics;
      state.currentLyricIndex.value = -1;
    } catch (error) {
      console.error('解析歌词内容失败:', error);
      
      // 重置歌词状态
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
    }
  };
  
  // 从远程 URL 加载歌词
  const loadLyricsFromUrl = async (url) => {
    if (!url) {
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
      return;
    }
    
    try {
      // 获取歌词内容
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const lrcContent = await response.text();
      
      // 解析歌词
      const parsedLyrics = parseLrc(lrcContent);
      
      // 更新状态
      state.lyrics.value = parsedLyrics;
      state.currentLyricIndex.value = -1;
    } catch (error) {
      console.error('从 URL 加载歌词失败:', error);
      state.setError('从 URL 加载歌词失败');
      
      // 重置歌词状态
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
    }
  };
  
  // 根据音轨信息自动匹配歌词
  const fetchLyrics = async (track) => {
    if (!track) {
      state.lyrics.value = null;
      state.currentLyricIndex.value = -1;
      return;
    }
    
    // 重置歌词状态
    state.lyrics.value = null;
    state.currentLyricIndex.value = -1;
    
    try {
      // 如果音轨已经包含歌词 URL
      if (track.lrcUrl) {
        await loadLyricsFromUrl(track.lrcUrl);
        return;
      }
      
      // 如果音轨已经包含歌词内容
      if (track.lrcContent) {
        loadLyricsFromText(track.lrcContent);
        return;
      }
      
      // 尝试根据音轨信息自动匹配歌词
      // 这里可以实现自动匹配歌词的逻辑，例如：
      // 1. 根据音轨文件名查找同名的 .lrc 文件
      // 2. 根据音轨的元数据（歌手、歌名）在在线服务中搜索歌词
      
      // 示例：根据音轨路径查找同名的 .lrc 文件
      if (track.path) {
        const lrcPath = track.path.replace(/\.[^.]+$/, '.lrc');
        
        try {
          // 这里需要根据实际情况实现获取 lrc 文件的逻辑
          // 在 Electron 环境中，可以使用 Node.js 的 fs 模块读取文件
          // 在这个示例中，我们假设有一个 API 可以获取歌词文件
          const lrcUrl = `api/lyrics?path=${encodeURIComponent(lrcPath)}`;
          await loadLyricsFromUrl(lrcUrl);
        } catch (error) {
          console.warn('自动匹配本地歌词文件失败:', error);
          // 失败后可以尝试其他方式获取歌词
        }
      }
      
      // 如果本地匹配失败，可以尝试在线搜索
      if (!state.lyrics.value && track.artist && track.title) {
        try {
          // 这里需要根据实际情况实现在线搜索歌词的逻辑
          // 示例：使用某个在线歌词 API
          const searchUrl = `api/lyrics/search?artist=${encodeURIComponent(track.artist)}&title=${encodeURIComponent(track.title)}`;
          await loadLyricsFromUrl(searchUrl);
        } catch (error) {
          console.warn('在线搜索歌词失败:', error);
        }
      }
      
      // 如果所有尝试都失败，可以设置一个空的歌词数组
      if (!state.lyrics.value) {
        state.lyrics.value = [];
      }
    } catch (error) {
      console.error('获取歌词失败:', error);
      state.lyrics.value = [];
    }
  };
  
  // 导出歌词为 LRC 文件
  const exportLyricsToLrc = () => {
    if (!state.lyrics.value || state.lyrics.value.length === 0) {
      return null;
    }
    
    // 格式化时间
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      const ms = Math.floor((seconds % 1) * 100);
      
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };
    
    // 生成 LRC 内容
    let lrcContent = '';
    
    // 添加元数据（如果有）
    if (state.currentTrack.value) {
      if (state.currentTrack.value.title) {
        lrcContent += `[ti:${state.currentTrack.value.title}]\n`;
      }
      
      if (state.currentTrack.value.artist) {
        lrcContent += `[ar:${state.currentTrack.value.artist}]\n`;
      }
      
      if (state.currentTrack.value.album) {
        lrcContent += `[al:${state.currentTrack.value.album}]\n`;
      }
    }
    
    // 添加歌词行
    state.lyrics.value.forEach(line => {
      lrcContent += `[${formatTime(line.time)}]${line.text}\n`;
    });
    
    return lrcContent;
  };
  
  // 编辑歌词
  const editLyrics = (index, newText) => {
    if (!state.lyrics.value || index < 0 || index >= state.lyrics.value.length) {
      return;
    }
    
    // 创建新的歌词数组
    const newLyrics = [...state.lyrics.value];
    
    // 更新指定索引的歌词文本
    newLyrics[index] = {
      ...newLyrics[index],
      text: newText
    };
    
    // 更新状态
    state.lyrics.value = newLyrics;
  };
  
  // 添加歌词行
  const addLyricLine = (time, text) => {
    if (!state.lyrics.value) {
      state.lyrics.value = [];
    }
    
    // 创建新的歌词行
    const newLine = {
      time,
      text
    };
    
    // 添加到歌词数组
    const newLyrics = [...state.lyrics.value, newLine];
    
    // 按时间排序
    newLyrics.sort((a, b) => a.time - b.time);
    
    // 更新状态
    state.lyrics.value = newLyrics;
  };
  
  // 删除歌词行
  const removeLyricLine = (index) => {
    if (!state.lyrics.value || index < 0 || index >= state.lyrics.value.length) {
      return;
    }
    
    // 创建新的歌词数组，排除要删除的行
    const newLyrics = [
      ...state.lyrics.value.slice(0, index),
      ...state.lyrics.value.slice(index + 1)
    ];
    
    // 更新状态
    state.lyrics.value = newLyrics;
    
    // 如果当前显示的歌词行被删除，重置当前歌词索引
    if (state.currentLyricIndex.value === index) {
      state.currentLyricIndex.value = -1;
    } else if (state.currentLyricIndex.value > index) {
      // 如果删除的是当前歌词行之前的行，需要调整当前歌词索引
      state.currentLyricIndex.value--;
    }
  };
  
  // 设置歌词同步偏移量（毫秒）
  const setLyricSyncOffset = (value) => {
    lyricSyncOffset.value = value;
    
    // 如果有歌词，可能需要重新计算当前歌词索引
    if (state.lyrics.value && state.lyrics.value.length > 0 && state.currentTime.value > 0) {
      // 计算带偏移量的当前时间（秒）
      const adjustedTime = state.currentTime.value + (lyricSyncOffset.value / 1000);
      
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
  
  return {
    lyricSyncOffset,
    parseLrc,
    loadLyricsFromFile,
    loadLyricsFromText,
    loadLyricsFromUrl,
    fetchLyrics,
    exportLyricsToLrc,
    editLyrics,
    addLyricLine,
    removeLyricLine,
    setLyricSyncOffset
  };
}
