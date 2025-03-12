<template>
  <div class="relative w-full h-full" :class="{ 'dark': isDarkMode }">
    <!-- 可视化效果画布 -->
    <visualizer-base
      ref="visualizerRef"
      :audio-context="audioContext"
      :audio-source="audioSource"
      :is-playing="isPlaying"
      :visualizer-type="currentType"
      :settings="visualizerSettings"
    />
    
    <!-- 可视化类型选择 -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10 bg-black/30 dark:bg-white/10 p-2 rounded-lg backdrop-blur-md" v-if="showControls">
      <a-radio-group 
        v-model:value="currentType" 
        button-style="solid" 
        size="small"
        @change="onTypeChange"
      >
        <a-radio-button v-for="type in visualizerTypes" :key="type.id" :value="type.id">
          {{ type.name }}
        </a-radio-button>
      </a-radio-group>
      
      <a-button 
        type="text" 
        shape="circle"
        @click="toggleSettings"
      >
        <template #icon><SettingOutlined /></template>
      </a-button>
    </div>
    
    <!-- 预设选择 -->
    <div class="absolute top-4 right-4 z-10" v-if="showControls && presets.length > 0">
      <a-select
        v-model:value="currentPreset"
        class="w-[150px]"
        size="small"
        @change="onPresetChange"
      >
        <a-select-option v-for="preset in presets" :key="preset.id" :value="preset.id">
          {{ preset.name }}
        </a-select-option>
      </a-select>
    </div>
    
    <!-- 设置抽屉 -->
    <a-drawer
      v-model:visible="settingsVisible"
      title="可视化设置"
      placement="right"
      :width="300"
      @close="settingsVisible = false"
    >
      <div class="h-full flex flex-col">
        <a-form layout="vertical">
          <!-- 通用设置 -->
          <a-form-item label="灵敏度">
            <a-slider 
              v-model:value="visualizerSettings.sensitivity" 
              :min="0.5" 
              :max="5" 
              :step="0.1" 
              :tooltip-visible="true"
            />
          </a-form-item>
          
          <a-form-item label="平滑度">
            <a-slider 
              v-model:value="visualizerSettings.smoothingTimeConstant" 
              :min="0" 
              :max="0.99" 
              :step="0.01" 
              :tooltip-visible="true"
            />
          </a-form-item>
          
          <a-form-item label="FFT大小">
            <a-select v-model:value="visualizerSettings.fftSize" class="w-full">
              <a-select-option :value="512">512</a-select-option>
              <a-select-option :value="1024">1024</a-select-option>
              <a-select-option :value="2048">2048</a-select-option>
              <a-select-option :value="4096">4096</a-select-option>
              <a-select-option :value="8192">8192</a-select-option>
            </a-select>
          </a-form-item>
          
          <a-divider />
          
          <!-- 柱状图设置 -->
          <template v-if="currentType === 'bars'">
            <a-form-item label="柱状数量">
              <a-slider 
                v-model:value="visualizerSettings.barCount" 
                :min="16" 
                :max="256" 
                :step="8" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="柱状间隔">
              <a-slider 
                v-model:value="visualizerSettings.barSpacing" 
                :min="0" 
                :max="5" 
                :step="0.5" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="柱状圆角">
              <a-switch v-model:checked="visualizerSettings.barRounded" />
            </a-form-item>
          </template>
          
          <!-- 波形图设置 -->
          <template v-if="currentType === 'wave'">
            <a-form-item label="线条宽度">
              <a-slider 
                v-model:value="visualizerSettings.lineWidth" 
                :min="1" 
                :max="10" 
                :step="0.5" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="填充波形">
              <a-switch v-model:checked="visualizerSettings.fillWave" />
            </a-form-item>
          </template>
          
          <!-- 环形频谱设置 -->
          <template v-if="currentType === 'circle'">
            <a-form-item label="半径">
              <a-slider 
                v-model:value="visualizerSettings.circleRadius" 
                :min="50" 
                :max="200" 
                :step="10" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="旋转速度">
              <a-slider 
                v-model:value="visualizerSettings.rotationSpeed" 
                :min="0" 
                :max="2" 
                :step="0.1" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="线条数量">
              <a-slider 
                v-model:value="visualizerSettings.circleBarCount" 
                :min="60" 
                :max="360" 
                :step="20" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="线条宽度">
              <a-slider 
                v-model:value="visualizerSettings.circleLineWidth" 
                :min="1" 
                :max="5" 
                :step="0.5" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="显示中心圆">
              <a-switch v-model:checked="visualizerSettings.showCenterCircle" />
            </a-form-item>
          </template>
          
          <!-- 粒子效果设置 -->
          <template v-if="currentType === 'particles'">
            <a-form-item label="粒子数量">
              <a-slider 
                v-model:value="visualizerSettings.particleCount" 
                :min="50" 
                :max="500" 
                :step="50" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="粒子大小">
              <a-slider 
                v-model:value="visualizerSettings.particleSize" 
                :min="1" 
                :max="10" 
                :step="0.5" 
                :tooltip-visible="true"
              />
            </a-form-item>
            
            <a-form-item label="粒子速度">
              <a-slider 
                v-model:value="visualizerSettings.particleSpeed" 
                :min="0.5" 
                :max="5" 
                :step="0.5" 
                :tooltip-visible="true"
              />
            </a-form-item>
          </template>
          
          <a-divider />
          
          <!-- 颜色设置 -->
          <a-form-item label="颜色模式">
            <a-radio-group v-model:value="visualizerSettings.colorMode" button-style="solid">
              <a-radio-button value="gradient">渐变</a-radio-button>
              <a-radio-button value="solid">纯色</a-radio-button>
              <a-radio-button value="rainbow">彩虹</a-radio-button>
            </a-radio-group>
          </a-form-item>
          
          <template v-if="visualizerSettings.colorMode === 'solid'">
            <a-form-item label="颜色">
              <a-input 
                v-model:value="visualizerSettings.primaryColor" 
                type="color"
                class="w-full"
              />
            </a-form-item>
          </template>
          
          <template v-if="visualizerSettings.colorMode === 'gradient'">
            <a-form-item label="起始颜色">
              <a-input 
                v-model:value="visualizerSettings.gradientFrom" 
                type="color"
                class="w-full"
              />
            </a-form-item>
            
            <a-form-item label="结束颜色">
              <a-input 
                v-model:value="visualizerSettings.gradientTo" 
                type="color"
                class="w-full"
              />
            </a-form-item>
          </template>
          
          <template v-if="visualizerSettings.colorMode === 'rainbow'">
            <a-form-item label="彩虹速度">
              <a-slider 
                v-model:value="visualizerSettings.rainbowSpeed" 
                :min="0.1" 
                :max="2" 
                :step="0.1" 
                :tooltip-visible="true"
              />
            </a-form-item>
          </template>
        </a-form>
        
        <div class="mt-auto pt-4 flex gap-2 justify-end">
          <a-button 
            type="primary" 
            @click="saveSettings"
          >
            保存设置
          </a-button>
          
          <a-button 
            @click="saveAsPreset"
          >
            保存为预设
          </a-button>
        </div>
      </div>
    </a-drawer>
    
    <!-- 保存预设对话框 -->
    <a-modal
      v-model:visible="presetModalVisible"
      title="保存为预设"
      @ok="confirmSavePreset"
      @cancel="presetModalVisible = false"
    >
      <a-form layout="vertical">
        <a-form-item label="预设名称">
          <a-input v-model:value="newPresetName" placeholder="请输入预设名称" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { useSettingsStore } from '@/stores/settings';
import VisualizerBase from './visualizer/VisualizerBase.vue';
import { visualizerTypes, visualizerPresets, getPresetsByType, getPreset } from './visualizer/VisualizerPresets';
import { message } from 'ant-design-vue';

// 定义props
const props = defineProps({
  audioContext: {
    type: Object,
    required: true
  },
  audioSource: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  showControls: {
    type: Boolean,
    default: true
  }
});

// 定义emit
const emit = defineEmits(['toggle-controls']);

// 获取设置
const settingsStore = useSettingsStore();
const isDarkMode = computed(() => settingsStore.isDarkMode);

// 可视化器引用
const visualizerRef = ref(null);

// 状态
const settingsVisible = ref(false);
const presetModalVisible = ref(false);
const newPresetName = ref('');

// 可视化类型
const currentType = ref('bars');

// 预设
const currentPreset = ref('');
const presets = computed(() => getPresetsByType(currentType.value));

// 可视化设置
const visualizerSettings = ref({
  // 通用设置
  sensitivity: 1.2,
  smoothingTimeConstant: 0.8,
  fftSize: 2048,
  colorMode: 'gradient',
  gradientFrom: '#1890ff',
  gradientTo: '#722ed1',
  primaryColor: '#1890ff',
  rainbowSpeed: 0.5,
  
  // 柱状图设置
  barCount: 64,
  barSpacing: 1,
  barRounded: true,
  
  // 波形图设置
  lineWidth: 2,
  fillWave: true,
  
  // 环形频谱设置
  circleRadius: 120,
  rotationSpeed: 0.5,
  circleBarCount: 180,
  circleLineWidth: 2,
  showCenterCircle: true,
  centerCircleColor: '#ffffff',
  
  // 粒子效果设置
  particleCount: 200,
  particleSize: 3,
  particleSpeed: 2
});

// 切换设置抽屉
const toggleSettings = () => {
  settingsVisible.value = !settingsVisible.value;
  emit('toggle-controls');
};

// 类型变更处理
const onTypeChange = () => {
  // 加载该类型的默认预设
  const typePresets = getPresetsByType(currentType.value);
  if (typePresets.length > 0) {
    currentPreset.value = typePresets[0].id;
    loadPreset(typePresets[0]);
  }
};

// 预设变更处理
const onPresetChange = (presetId) => {
  const preset = getPreset(presetId);
  if (preset) {
    loadPreset(preset);
  }
};

// 加载预设
const loadPreset = (preset) => {
  if (!preset) return;
  
  // 更新设置
  Object.assign(visualizerSettings.value, preset.settings);
};

// 保存设置
const saveSettings = () => {
  // 保存到设置存储
  settingsStore.saveVisualizerSettings({
    type: currentType.value,
    ...visualizerSettings.value
  });
  
  // 关闭设置抽屉
  settingsVisible.value = false;
  
  // 提示
  message.success('设置已保存');
};

// 保存为预设
const saveAsPreset = () => {
  presetModalVisible.value = true;
};

// 确认保存预设
const confirmSavePreset = () => {
  if (!newPresetName.value) {
    message.error('请输入预设名称');
    return;
  }
  
  // 创建自定义预设
  const customPreset = {
    id: `custom-${currentType.value}-${Date.now()}`,
    name: newPresetName.value,
    type: currentType.value,
    settings: { ...visualizerSettings.value }
  };
  
  // 保存到本地存储
  const customPresets = settingsStore.customVisualizerPresets || [];
  customPresets.push(customPreset);
  settingsStore.saveCustomVisualizerPresets(customPresets);
  
  // 关闭对话框
  presetModalVisible.value = false;
  newPresetName.value = '';
  
  // 提示
  message.success('预设已保存');
  
  // 更新当前预设
  currentPreset.value = customPreset.id;
};

// 导出方法
defineExpose({
  updateAudioSource(source) {
    if (visualizerRef.value) {
      visualizerRef.value.updateAudioSource(source);
    }
  }
});
</script>
