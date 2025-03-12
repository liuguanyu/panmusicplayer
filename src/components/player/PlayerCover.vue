<template>
  <div class="flex flex-col">
    <!-- 专辑封面 -->
    <div class="relative mb-6">
      <div 
        class="aspect-square mx-auto rounded-lg shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex justify-center items-center"
        :class="isPlaying ? 'animate-spin-slow' : ''"
      >
        <customer-service-outlined class="text-8xl text-gray-400" />
      </div>
      
      <!-- 播放状态指示器 -->
      <div 
        class="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary flex justify-center items-center text-white shadow-lg"
        @click="togglePlay"
      >
        <pause-outlined v-if="isPlaying" class="text-xl" />
        <play-circle-outlined v-else class="text-xl" />
      </div>
    </div>
    
    <!-- 歌曲信息 -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold truncate">{{ currentTrack?.name || '未播放' }}</h1>
      <p class="text-gray-500 mt-1">{{ currentTrack?.artist || '未知艺术家' }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  CustomerServiceOutlined,
  PlayCircleOutlined,
  PauseOutlined
} from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();

// 状态
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);

// 播放控制
const togglePlay = () => {
  playerStore.togglePlay();
};
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
