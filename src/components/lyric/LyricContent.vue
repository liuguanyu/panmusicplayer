<template>
  <div 
    ref="lyricContainer" 
    class="lyric-container"
    @wheel="handleWheel"
  >
    <div v-if="hasLyrics" class="lyric-content">
      <div 
        v-for="(line, index) in lyrics" 
        :key="index"
        :class="{ 
          'lyric-line': true,
          'active': index === currentLyricIndex,
          'prev': index === currentLyricIndex - 1,
          'next': index === currentLyricIndex + 1
        }"
        :ref="el => { if (index === currentLyricIndex) activeLyricRef = el }"
      >
        {{ line.text }}
      </div>
    </div>
    <div v-else class="no-lyric-message">
      <p>暂无歌词</p>
      <div class="no-lyric-actions">
        <a-button type="primary" @click="openLyricFile">
          <a-icon type="upload" /> 加载歌词文件
        </a-button>
        <a-button @click="searchOnlineLyrics">
          <a-icon type="cloud-download" /> 在线搜索歌词
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onUnmounted } from 'vue';

// 定义 props
const props = defineProps({
  lyrics: {
    type: Array,
    default: () => []
  },
  currentLyricIndex: {
    type: Number,
    default: -1
  },
  isAutoScroll: {
    type: Boolean,
    default: true
  }
});

// 定义事件
const emit = defineEmits([
  'update:isAutoScroll',
  'open-lyric-file',
  'search-online-lyrics'
]);

// 响应式状态
const lyricContainer = ref(null);
const activeLyricRef = ref(null);
const manualScrollTimeout = ref(null);

// 计算属性
const hasLyrics = computed(() => props.lyrics && props.lyrics.length > 0);

// 监听当前歌词索引变化，自动滚动到当前歌词
watch(() => props.currentLyricIndex, async (newIndex) => {
  if (!props.isAutoScroll || newIndex === -1) return;
  
  await nextTick();
  scrollToActiveLyric();
});

// 生命周期钩子
onUnmounted(() => {
  if (manualScrollTimeout.value) {
    clearTimeout(manualScrollTimeout.value);
  }
});

// 方法
function scrollToActiveLyric() {
  if (!activeLyricRef.value || !lyricContainer.value) return;
  
  const container = lyricContainer.value;
  const element = activeLyricRef.value;
  
  const containerHeight = container.clientHeight;
  const elementTop = element.offsetTop;
  const elementHeight = element.clientHeight;
  
  // 将活动歌词行滚动到容器中央
  container.scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);
}

function handleWheel() {
  // 用户滚动时暂时禁用自动滚动
  emit('update:isAutoScroll', false);
  
  // 清除之前的定时器
  if (manualScrollTimeout.value) {
    clearTimeout(manualScrollTimeout.value);
  }
  
  // 设置新的定时器，3秒后恢复自动滚动
  manualScrollTimeout.value = setTimeout(() => {
    emit('update:isAutoScroll', true);
    scrollToActiveLyric();
  }, 3000);
}

function openLyricFile() {
  emit('open-lyric-file');
}

function searchOnlineLyrics() {
  emit('search-online-lyrics');
}

// 导出方法供父组件调用
defineExpose({
  scrollToActiveLyric
});
</script>

<style lang="less" scoped>
.lyric-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--inactive-color);
    border-radius: 3px;
  }
  
  .lyric-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30vh 0;
    
    .lyric-line {
      width: 100%;
      text-align: center;
      margin: 12px 0;
      font-size: 16px;
      color: var(--inactive-color);
      transition: all 0.3s ease;
      
      &.active {
        font-size: 20px;
        font-weight: 500;
        color: var(--active-color);
      }
      
      &.prev, &.next {
        font-size: 18px;
        color: var(--text-color);
      }
    }
  }
  
  .no-lyric-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
    
    p {
      font-size: 16px;
      color: var(--inactive-color);
      margin-bottom: 20px;
    }
    
    .no-lyric-actions {
      display: flex;
      gap: 12px;
    }
  }
}
</style>
