<template>
  <div class="bg-white/50 dark:bg-black/20 rounded-lg p-4">
    <!-- 进度条 -->
    <div class="mb-4">
      <div class="flex justify-between text-xs text-gray-500 mb-1">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
      <a-slider
        v-model:value="sliderValue"
        :min="0"
        :max="duration"
        :disabled="!currentTrack"
        @change="onSliderChange"
      />
    </div>
    
    <!-- 控制按钮 -->
    <div class="flex justify-center items-center space-x-4">
      <a-button 
        type="text" 
        shape="circle" 
        :disabled="!currentTrack"
        @click="previousTrack"
      >
        <step-backward-outlined />
      </a-button>
      
      <a-button 
        type="primary" 
        shape="circle" 
        size="large"
        :disabled="!currentTrack"
        @click="togglePlay"
      >
        <pause-outlined v-if="isPlaying" />
        <play-circle-outlined v-else />
      </a-button>
      
      <a-button 
        type="text" 
        shape="circle" 
        :disabled="!currentTrack"
        @click="nextTrack"
      >
        <step-forward-outlined />
      </a-button>
    </div>
    
    <!-- 音量控制 -->
    <div class="flex items-center mt-4">
      <sound-outlined class="mr-2" />
      <a-slider
        v-model:value="volume"
        :min="0"
        :max="100"
        style="flex: 1"
        @change="onVolumeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
  PauseOutlined,
  SoundOutlined
} from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();

// 状态
const currentTrack = computed(() => playerStore.currentTrack);
const isPlaying = computed(() => playerStore.isPlaying);
const currentTime = computed(() => playerStore.currentTime);
const duration = computed(() => playerStore.duration);
const volume = computed({
  get: () => playerStore.volume * 100,
  set: (value) => playerStore.setVolume(value / 100)
});

// 进度条值
const sliderValue = computed({
  get: () => currentTime.value,
  set: (value) => {}
});

// 播放控制
const togglePlay = () => {
  playerStore.togglePlay();
};

const previousTrack = () => {
  playerStore.previousTrack();
};

const nextTrack = () => {
  playerStore.nextTrack();
};

const onSliderChange = (value) => {
  playerStore.seek(value);
};

const onVolumeChange = (value) => {
  playerStore.setVolume(value / 100);
};

// 格式化时间
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
</script>

<style scoped>
/* 可以添加额外的样式 */
</style>
