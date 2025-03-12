<template>
  <div class="h-full flex flex-col">
    <!-- 播放器主体 -->
    <div class="flex-1 flex flex-col md:flex-row">
      <!-- 左侧：专辑封面和歌词 -->
      <div class="w-full md:w-1/2 p-4 flex flex-col">
        <!-- 专辑封面 -->
        <PlayerCover />
        
        <!-- 歌词显示 -->
        <PlayerLyrics class="flex-1 mb-4" />
      </div>
      
      <!-- 右侧：可视化和播放列表 -->
      <div class="w-full md:w-1/2 p-4 flex flex-col">
        <!-- 可视化效果 -->
        <PlayerVisualizer />
        
        <!-- 播放控制 -->
        <PlayerControls class="mb-4" />
        
        <!-- 播放列表 -->
        <PlayerPlaylist class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { usePlayerStore } from '@/stores/player';
import PlayerCover from '@/components/player/PlayerCover.vue';
import PlayerLyrics from '@/components/player/PlayerLyrics.vue';
import PlayerVisualizer from '@/components/player/PlayerVisualizer.vue';
import PlayerControls from '@/components/player/PlayerControls.vue';
import PlayerPlaylist from '@/components/player/PlayerPlaylist.vue';

const playerStore = usePlayerStore();

// 组件挂载时初始化播放器
onMounted(() => {
  playerStore.initAudio();
  playerStore.initVisualizer();
});

// 组件卸载时清理播放器资源
onUnmounted(() => {
  playerStore.destroy();
});
</script>
