<template>
  <div class="flex-1 overflow-hidden bg-white/50 dark:bg-black/20 rounded-lg p-4">
    <div v-if="!lyrics.length" class="h-full flex justify-center items-center text-gray-400">
      <div class="text-center">
        <file-text-outlined class="text-4xl mb-2" />
        <p>暂无歌词</p>
      </div>
    </div>
    
    <div v-else ref="lyricsContainer" class="h-full overflow-y-auto px-4">
      <p 
        v-for="(line, index) in lyrics" 
        :key="index"
        :class="[
          'py-2 text-center transition-all duration-300',
          currentLyricIndex === index ? 'text-lg font-bold text-primary' : 'text-gray-500'
        ]"
      >
        {{ line.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { FileTextOutlined } from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const lyricsContainer = ref(null);

// 状态
const lyrics = computed(() => playerStore.lyrics);
const currentLyricIndex = computed(() => playerStore.currentLyricIndex);

// 滚动到当前歌词
watch(currentLyricIndex, async (newIndex) => {
  if (newIndex >= 0 && lyricsContainer.value) {
    await nextTick();
    const lyricElements = lyricsContainer.value.querySelectorAll('p');
    if (lyricElements[newIndex]) {
      lyricElements[newIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
}, { immediate: true });
</script>

<style scoped>
/* 可以添加额外的样式 */
</style>
