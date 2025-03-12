<template>
  <div 
    class="lyric-display"
    :class="{ 
      'dark': isDarkMode,
      'light': !isDarkMode,
      'has-lyrics': hasLyrics,
      'no-lyrics': !hasLyrics,
      'fullscreen': isFullscreen
    }"
  >
    <!-- 歌词头部组件 -->
    <LyricHeader
      :current-track="currentTrack"
      :is-fullscreen="isFullscreen"
      :is-auto-scroll="isAutoScroll"
      @toggle-fullscreen="toggleFullscreen"
      @toggle-auto-scroll="toggleAutoScroll"
      @open-lyric-file="openLyricFile"
      @search-online-lyrics="searchOnlineLyrics"
      @edit-lyrics="editLyrics"
      @export-lyrics="exportLyrics"
      @adjust-sync-offset="adjustSyncOffset"
    />
    
    <!-- 歌词内容组件 -->
    <LyricContent
      ref="lyricContentRef"
      :lyrics="lyrics"
      :current-lyric-index="currentLyricIndex"
      :is-auto-scroll="isAutoScroll"
      v-model:is-auto-scroll="isAutoScroll"
      @open-lyric-file="openLyricFile"
      @search-online-lyrics="searchOnlineLyrics"
    />
    
    <!-- 歌词模态框组件 -->
    <LyricModals
      ref="lyricModalsRef"
      :sync-offset="syncOffset"
      :lyrics-text="editableLyricText"
      @update:sync-offset="updateSyncOffset"
      @save-sync-offset="saveSyncOffset"
      @update:lyrics-text="updateLyricsText"
      @save-lyric-edits="saveLyricEdits"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { usePlayerStore } from '../stores/player';
import { useSettingsStore } from '../stores/settings';
import { message } from 'ant-design-vue';
import LyricHeader from './lyric/LyricHeader.vue';
import LyricContent from './lyric/LyricContent.vue';
import LyricModals from './lyric/LyricModals.vue';

// 获取 store
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();

// 响应式状态
const lyricContentRef = ref(null);
const lyricModalsRef = ref(null);
const isFullscreen = ref(false);
const isAutoScroll = ref(true);
const editableLyricText = ref('');

// 计算属性
const currentTrack = computed(() => playerStore.currentTrack);
const lyrics = computed(() => playerStore.lyrics || []);
const currentLyricIndex = computed(() => playerStore.currentLyricIndex);
const hasLyrics = computed(() => lyrics.value && lyrics.value.length > 0);
const isDarkMode = computed(() => settingsStore.isDarkMode);
const syncOffset = computed(() => playerStore.lyricSyncOffset);

// 监听当前歌曲变化，重置全屏状态
watch(currentTrack, () => {
  if (isFullscreen.value) {
    isFullscreen.value = false;
  }
});

// 生命周期钩子
onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

// 方法
function toggleAutoScroll() {
  isAutoScroll.value = !isAutoScroll.value;
  
  if (isAutoScroll.value && lyricContentRef.value) {
    lyricContentRef.value.scrollToActiveLyric();
  }
}

function toggleFullscreen() {
  if (!isFullscreen.value) {
    // 进入全屏
    const element = document.querySelector('.lyric-display');
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    
    isFullscreen.value = true;
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    isFullscreen.value = false;
  }
}

function handleFullscreenChange() {
  // 检测浏览器全屏状态变化
  isFullscreen.value = !!document.fullscreenElement;
}

function openLyricFile() {
  // 创建文件输入元素
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.lrc,.txt';
  
  // 监听文件选择
  input.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      await playerStore.loadLyricsFromFile(file);
      message.success('歌词加载成功');
    } catch (error) {
      message.error('歌词加载失败');
      console.error('加载歌词文件失败:', error);
    }
  };
  
  // 触发文件选择对话框
  input.click();
}

function searchOnlineLyrics() {
  if (!currentTrack.value) {
    message.warning('请先播放一首歌曲');
    return;
  }
  
  // 尝试在线搜索歌词
  playerStore.fetchLyrics(currentTrack.value)
    .then(() => {
      if (hasLyrics.value) {
        message.success('歌词获取成功');
      } else {
        message.warning('未找到匹配的歌词');
      }
    })
    .catch(() => {
      message.error('歌词搜索失败');
    });
}

function adjustSyncOffset() {
  if (lyricModalsRef.value) {
    lyricModalsRef.value.openSyncOffsetModal();
  }
}

function updateSyncOffset(value) {
  playerStore.setLyricSyncOffset(value);
}

function saveSyncOffset(value) {
  // 已在 LyricModals 组件中处理
}

function editLyrics() {
  if (!hasLyrics.value) {
    editableLyricText.value = '';
  } else {
    // 将当前歌词转换为可编辑的文本格式
    editableLyricText.value = playerStore.exportLyricsToLrc() || '';
  }
  
  if (lyricModalsRef.value) {
    lyricModalsRef.value.openLyricEditModal();
  }
}

function updateLyricsText(text) {
  editableLyricText.value = text;
}

function saveLyricEdits(text) {
  try {
    playerStore.loadLyricsFromText(text);
  } catch (error) {
    message.error('歌词格式错误，请检查后重试');
    console.error('保存歌词编辑失败:', error);
  }
}

function exportLyrics() {
  if (!hasLyrics.value) {
    message.warning('没有可导出的歌词');
    return;
  }
  
  const lrcContent = playerStore.exportLyricsToLrc();
  if (!lrcContent) {
    message.warning('歌词导出失败');
    return;
  }
  
  // 创建 Blob 对象
  const blob = new Blob([lrcContent], { type: 'text/plain;charset=utf-8' });
  
  // 创建下载链接
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // 设置文件名
  const fileName = currentTrack.value && currentTrack.value.title 
    ? `${currentTrack.value.title}.lrc` 
    : 'lyrics.lrc';
  
  link.download = fileName;
  
  // 触发下载
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  message.success('歌词导出成功');
}
</script>

<style lang="less" scoped>
.lyric-display {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: all 0.3s ease;
  
  // 深色主题变量
  &.dark {
    --background-color: rgba(30, 30, 30, 0.9);
    --text-color: rgba(255, 255, 255, 0.85);
    --active-color: #1890ff;
    --inactive-color: rgba(255, 255, 255, 0.5);
    --border-color: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.5);
  }
  
  // 浅色主题变量
  &.light {
    --background-color: rgba(245, 245, 245, 0.9);
    --text-color: rgba(0, 0, 0, 0.85);
    --active-color: #1890ff;
    --inactive-color: rgba(0, 0, 0, 0.45);
    --border-color: rgba(0, 0, 0, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.1);
  }
  
  // 全屏模式
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: var(--background-color);
  }
}
</style>
