<template>
  <div class="h-64 mb-4 bg-white/50 dark:bg-black/20 rounded-lg overflow-hidden">
    <div class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
      <h3 class="font-medium">可视化效果</h3>
      <a-select 
        v-model:value="visualizerType" 
        size="small" 
        style="width: 120px"
        @change="changeVisualizerType"
      >
        <a-select-option value="bars">频谱柱状图</a-select-option>
        <a-select-option value="wave">波形图</a-select-option>
        <a-select-option value="circle">环形频谱</a-select-option>
        <a-select-option value="particles">粒子效果</a-select-option>
      </a-select>
    </div>
    
    <div class="h-full">
      <Visualizer :type="visualizerType" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePlayerStore } from '@/stores/player';
import Visualizer from '@/components/Visualizer.vue';

const playerStore = usePlayerStore();

// 可视化类型
const visualizerType = computed({
  get: () => playerStore.visualizerType,
  set: (value) => playerStore.setVisualizerType(value)
});

// 切换可视化类型
const changeVisualizerType = (value) => {
  playerStore.setVisualizerType(value);
};
</script>

<style scoped>
/* 可以添加额外的样式 */
</style>
