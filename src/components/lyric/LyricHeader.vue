<template>
  <div class="lyric-header">
    <div class="lyric-title">
      <h3 v-if="currentTrack">{{ currentTrack.title || '未知歌曲' }}</h3>
      <p v-if="currentTrack">{{ currentTrack.artist || '未知艺术家' }}</p>
    </div>
    
    <div class="lyric-controls">
      <a-button 
        type="text" 
        :icon="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
        @click="toggleFullscreen"
      />
      <a-button 
        type="text" 
        :icon="isAutoScroll ? 'pause-circle' : 'play-circle'"
        @click="toggleAutoScroll"
      />
      <a-dropdown>
        <a-button type="text" icon="setting" />
        <template #overlay>
          <a-menu>
            <a-menu-item @click="openLyricFile">
              <a-icon type="upload" /> 加载歌词文件
            </a-menu-item>
            <a-menu-item @click="searchOnlineLyrics">
              <a-icon type="cloud-download" /> 在线搜索歌词
            </a-menu-item>
            <a-menu-item @click="editLyrics">
              <a-icon type="edit" /> 编辑歌词
            </a-menu-item>
            <a-menu-item @click="exportLyrics">
              <a-icon type="download" /> 导出歌词
            </a-menu-item>
            <a-menu-item @click="adjustSyncOffset">
              <a-icon type="clock-circle" /> 调整同步偏移
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// 定义 props
const props = defineProps({
  currentTrack: {
    type: Object,
    default: () => null
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  isAutoScroll: {
    type: Boolean,
    default: true
  }
});

// 定义事件
const emit = defineEmits([
  'toggle-fullscreen', 
  'toggle-auto-scroll', 
  'open-lyric-file', 
  'search-online-lyrics',
  'edit-lyrics',
  'export-lyrics',
  'adjust-sync-offset'
]);

// 方法
function toggleFullscreen() {
  emit('toggle-fullscreen');
}

function toggleAutoScroll() {
  emit('toggle-auto-scroll');
}

function openLyricFile() {
  emit('open-lyric-file');
}

function searchOnlineLyrics() {
  emit('search-online-lyrics');
}

function editLyrics() {
  emit('edit-lyrics');
}

function exportLyrics() {
  emit('export-lyrics');
}

function adjustSyncOffset() {
  emit('adjust-sync-offset');
}
</script>

<style lang="less" scoped>
.lyric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  
  .lyric-title {
    flex: 1;
    overflow: hidden;
    
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: var(--text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    p {
      margin: 4px 0 0;
      font-size: 14px;
      color: var(--inactive-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .lyric-controls {
    display: flex;
    gap: 8px;
  }
}
</style>
