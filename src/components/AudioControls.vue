<template>
  <div class="w-full px-4 py-2 bg-[var(--component-background)] border-t border-[var(--border-color)] flex flex-col gap-2" :class="{ 'dark': isDarkMode }">
    <!-- 进度条 -->
    <div class="flex items-center gap-2">
      <span class="text-xs text-[var(--text-color-secondary)] min-w-12 text-right">{{ formatTime(currentTime) }}</span>
      <a-slider
        class="flex-1"
        :value="progress"
        :min="0"
        :max="100"
        :tooltip-visible="false"
        @change="onProgressChange"
      />
      <span class="text-xs text-[var(--text-color-secondary)] min-w-12 text-left">{{ formatTime(duration) }}</span>
    </div>
    
    <!-- 主控制区 -->
    <div class="flex justify-between items-center">
      <!-- 播放模式 -->
      <div>
        <a-tooltip :title="playModeText">
          <a-button
            type="text"
            shape="circle"
            @click="togglePlayMode"
          >
            <template #icon>
              <RetweetOutlined v-if="playMode === 'repeat'" />
              <SwapOutlined v-else-if="playMode === 'shuffle'" />
              <MenuUnfoldOutlined v-else-if="playMode === 'repeat-one'" />
              <OrderedListOutlined v-else />
            </template>
          </a-button>
        </a-tooltip>
      </div>
      
      <!-- 主控制按钮 -->
      <div class="flex items-center gap-2">
        <a-button
          type="text"
          shape="circle"
          size="large"
          @click="$emit('prev')"
          :disabled="!hasPrev"
        >
          <template #icon><StepBackwardOutlined /></template>
        </a-button>
        
        <a-button
          type="primary"
          shape="circle"
          size="large"
          @click="$emit('toggle-play')"
          class="mx-2"
        >
          <template #icon>
            <PauseOutlined v-if="isPlaying" />
            <CaretRightOutlined v-else />
          </template>
        </a-button>
        
        <a-button
          type="text"
          shape="circle"
          size="large"
          @click="$emit('next')"
          :disabled="!hasNext"
        >
          <template #icon><StepForwardOutlined /></template>
        </a-button>
      </div>
      
      <!-- 音量控制 -->
      <div class="flex items-center gap-2 w-[150px] md:w-[100px]">
        <a-button
          type="text"
          shape="circle"
          @click="toggleMute"
        >
          <template #icon>
            <SoundOutlined v-if="volume > 0 && !muted" />
            <SoundFilled v-else-if="volume > 50 && !muted" />
            <AudioMutedOutlined v-else />
          </template>
        </a-button>
        
        <a-slider
          class="flex-1"
          :value="effectiveVolume"
          :min="0"
          :max="100"
          :tooltip-visible="false"
          @change="onVolumeChange"
        />
      </div>
    </div>
    
    <!-- 额外控制区 -->
    <div class="flex justify-center gap-4 md:gap-2 mt-2">
      <!-- 歌词显示切换 -->
      <a-tooltip title="歌词显示">
        <a-button
          type="text"
          shape="circle"
          @click="$emit('toggle-lyrics')"
          :class="{ 'text-[var(--primary-color)]': showLyrics }"
        >
          <template #icon><FileTextOutlined /></template>
        </a-button>
      </a-tooltip>
      
      <!-- 可视化切换 -->
      <a-tooltip title="可视化效果">
        <a-button
          type="text"
          shape="circle"
          @click="$emit('toggle-visualizer')"
          :class="{ 'text-[var(--primary-color)]': showVisualizer }"
        >
          <template #icon><BarChartOutlined /></template>
        </a-button>
      </a-tooltip>
      
      <!-- 播放列表切换 -->
      <a-tooltip title="播放列表">
        <a-button
          type="text"
          shape="circle"
          @click="$emit('toggle-playlist')"
          :class="{ 'text-[var(--primary-color)]': showPlaylist }"
        >
          <template #icon><UnorderedListOutlined /></template>
        </a-button>
      </a-tooltip>
      
      <!-- 全屏切换 -->
      <a-tooltip title="全屏">
        <a-button
          type="text"
          shape="circle"
          @click="$emit('toggle-fullscreen')"
          :class="{ 'text-[var(--primary-color)]': isFullscreen }"
        >
          <template #icon>
            <FullscreenExitOutlined v-if="isFullscreen" />
            <FullscreenOutlined v-else />
          </template>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  SoundFilled,
  AudioMutedOutlined,
  RetweetOutlined,
  SwapOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue';
import { useSettingsStore } from '@/stores/settings';

// 定义props
const props = defineProps({
  currentTime: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  volume: {
    type: Number,
    default: 80
  },
  muted: {
    type: Boolean,
    default: false
  },
  playMode: {
    type: String,
    default: 'sequence', // 'sequence', 'repeat', 'repeat-one', 'shuffle'
    validator: (value) => ['sequence', 'repeat', 'repeat-one', 'shuffle'].includes(value)
  },
  hasPrev: {
    type: Boolean,
    default: false
  },
  hasNext: {
    type: Boolean,
    default: false
  },
  showLyrics: {
    type: Boolean,
    default: false
  },
  showVisualizer: {
    type: Boolean,
    default: false
  },
  showPlaylist: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  }
});

// 定义emit
const emit = defineEmits([
  'toggle-play',
  'prev',
  'next',
  'seek',
  'volume-change',
  'toggle-mute',
  'change-play-mode',
  'toggle-lyrics',
  'toggle-visualizer',
  'toggle-playlist',
  'toggle-fullscreen'
]);

// 获取设置
const settingsStore = useSettingsStore();
const isDarkMode = computed(() => settingsStore.isDarkMode);

// 计算属性
const progress = computed(() => {
  if (props.duration <= 0) return 0;
  return (props.currentTime / props.duration) * 100;
});

const effectiveVolume = computed(() => {
  return props.muted ? 0 : props.volume;
});

const playModeText = computed(() => {
  switch (props.playMode) {
    case 'sequence':
      return '顺序播放';
    case 'repeat':
      return '列表循环';
    case 'repeat-one':
      return '单曲循环';
    case 'shuffle':
      return '随机播放';
    default:
      return '顺序播放';
  }
});

// 方法
const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const onProgressChange = (value) => {
  if (props.duration <= 0) return;
  const seekTime = (value / 100) * props.duration;
  emit('seek', seekTime);
};

const onVolumeChange = (value) => {
  emit('volume-change', value);
  if (value > 0 && props.muted) {
    emit('toggle-mute');
  }
};

const toggleMute = () => {
  emit('toggle-mute');
};

const togglePlayMode = () => {
  const modes = ['sequence', 'repeat', 'repeat-one', 'shuffle'];
  const currentIndex = modes.indexOf(props.playMode);
  const nextIndex = (currentIndex + 1) % modes.length;
  emit('change-play-mode', modes[nextIndex]);
};
</script>
