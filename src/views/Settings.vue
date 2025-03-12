<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">设置</h1>
    
    <a-card class="mb-6">
      <template #title>
        <div class="flex items-center">
          <skin-outlined class="mr-2" />
          <span>外观</span>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- 主题设置 -->
        <div class="flex-between">
          <span class="text-base">主题模式</span>
          <a-select 
            v-model:value="settings.theme" 
            style="width: 120px"
            @change="updateTheme"
          >
            <a-select-option value="system">跟随系统</a-select-option>
            <a-select-option value="light">浅色模式</a-select-option>
            <a-select-option value="dark">深色模式</a-select-option>
          </a-select>
        </div>
        
        <!-- 主色调设置 -->
        <div class="flex-between">
          <span class="text-base">主色调</span>
          <div class="flex gap-2">
            <div 
              v-for="color in primaryColors" 
              :key="color.value"
              class="w-6 h-6 rounded-full cursor-pointer border"
              :style="{ backgroundColor: color.value }"
              :class="settings.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''"
              @click="updatePrimaryColor(color.value)"
            ></div>
          </div>
        </div>
      </div>
    </a-card>
    
    <a-card class="mb-6">
      <template #title>
        <div class="flex items-center">
          <customer-service-outlined class="mr-2" />
          <span>播放器</span>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- 默认播放模式 -->
        <div class="flex-between">
          <span class="text-base">默认播放模式</span>
          <a-select 
            v-model:value="settings.defaultPlayMode" 
            style="width: 120px"
            @change="updateSettings({ defaultPlayMode: $event })"
          >
            <a-select-option value="sequential">顺序播放</a-select-option>
            <a-select-option value="repeat">单曲循环</a-select-option>
            <a-select-option value="random">随机播放</a-select-option>
          </a-select>
        </div>
        
        <!-- 默认音量 -->
        <div class="flex-between">
          <span class="text-base">默认音量</span>
          <div class="flex items-center gap-2 w-48">
            <sound-outlined />
            <a-slider 
              v-model:value="settings.defaultVolume" 
              :min="0"
              :max="100"
              :step="1"
              @change="updateSettings({ defaultVolume: $event })"
              class="flex-1"
            />
            <span class="w-8 text-right">{{ settings.defaultVolume }}%</span>
          </div>
        </div>
        
        <!-- 自动播放 -->
        <div class="flex-between">
          <span class="text-base">自动播放</span>
          <a-switch 
            v-model:checked="settings.autoPlay" 
            @change="updateSettings({ autoPlay: $event })"
          />
        </div>
      </div>
    </a-card>
    
    <a-card class="mb-6">
      <template #title>
        <div class="flex items-center">
          <bar-chart-outlined class="mr-2" />
          <span>可视化</span>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- 默认可视化类型 -->
        <div class="flex-between">
          <span class="text-base">默认可视化类型</span>
          <a-select 
            v-model:value="settings.visualizer" 
            style="width: 120px"
            @change="updateSettings({ visualizer: $event })"
          >
            <a-select-option value="spectrum">频谱</a-select-option>
            <a-select-option value="waveform">波形</a-select-option>
            <a-select-option value="circular">环形</a-select-option>
            <a-select-option value="none">无</a-select-option>
          </a-select>
        </div>
      </div>
    </a-card>
    
    <a-card class="mb-6">
      <template #title>
        <div class="flex items-center">
          <file-text-outlined class="mr-2" />
          <span>歌词</span>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- 自动匹配歌词 -->
        <div class="flex-between">
          <span class="text-base">自动匹配歌词</span>
          <a-switch 
            v-model:checked="settings.autoMatchLyrics" 
            @change="updateSettings({ autoMatchLyrics: $event })"
          />
        </div>
        
        <!-- 歌词字体大小 -->
        <div class="flex-between">
          <span class="text-base">歌词字体大小</span>
          <a-select 
            v-model:value="settings.lyricsFontSize" 
            style="width: 120px"
            @change="updateSettings({ lyricsFontSize: $event })"
          >
            <a-select-option value="small">小</a-select-option>
            <a-select-option value="medium">中</a-select-option>
            <a-select-option value="large">大</a-select-option>
          </a-select>
        </div>
      </div>
    </a-card>
    
    <a-card>
      <template #title>
        <div class="flex items-center">
          <cloud-outlined class="mr-2" />
          <span>百度云盘</span>
        </div>
      </template>
      
      <div class="space-y-4">
        <!-- 登录状态 -->
        <div class="flex-between">
          <span class="text-base">登录状态</span>
          <div>
            <a-tag v-if="isLoggedIn" color="success">已登录</a-tag>
            <a-tag v-else color="error">未登录</a-tag>
          </div>
        </div>
        
        <!-- 用户信息 -->
        <div v-if="isLoggedIn" class="flex-between">
          <span class="text-base">用户名</span>
          <span>{{ userInfo.username }}</span>
        </div>
        
        <!-- 退出登录 -->
        <div v-if="isLoggedIn" class="flex-between">
          <span class="text-base">退出登录</span>
          <a-button danger @click="handleLogout">退出登录</a-button>
        </div>
        
        <!-- 登录按钮 -->
        <div v-else class="flex-between">
          <span class="text-base">登录百度云盘</span>
          <a-button type="primary" @click="handleLogin">登录</a-button>
        </div>
        
        <!-- 缓存管理 -->
        <div class="flex-between">
          <span class="text-base">缓存大小</span>
          <div class="flex items-center gap-2">
            <span>{{ cacheSize }} MB</span>
            <a-button size="small" @click="clearCache">清除缓存</a-button>
          </div>
        </div>
      </div>
    </a-card>
    
    <div class="mt-8 text-center text-gray-500">
      <p>百度云音乐播放器 v1.0.0</p>
      <p class="mt-1">基于 Electron + Vue3 开发</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { 
  SkinOutlined,
  CustomerServiceOutlined,
  BarChartOutlined,
  FileTextOutlined,
  CloudOutlined,
  SoundOutlined
} from '@ant-design/icons-vue';
import { useSettingsStore } from '@/stores/settings';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const settingsStore = useSettingsStore();
const userStore = useUserStore();

// 设置状态
const settings = computed(() => settingsStore.settings);

// 用户状态
const isLoggedIn = computed(() => userStore.isLoggedIn);
const userInfo = computed(() => userStore.userInfo);

// 缓存大小（模拟数据）
const cacheSize = ref(0);

// 主色调选项
const primaryColors = [
  { name: '蓝色', value: '#1890ff' },
  { name: '绿色', value: '#52c41a' },
  { name: '红色', value: '#f5222d' },
  { name: '橙色', value: '#fa8c16' },
  { name: '紫色', value: '#722ed1' },
  { name: '青色', value: '#13c2c2' }
];

// 更新主题
const updateTheme = (theme) => {
  settingsStore.updateSettings({ theme });
  applyTheme(theme);
};

// 更新主色调
const updatePrimaryColor = (color) => {
  settingsStore.updateSettings({ primaryColor: color });
  document.documentElement.style.setProperty('--primary-color', color);
};

// 应用主题
const applyTheme = (theme) => {
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 更新设置
const updateSettings = (newSettings) => {
  settingsStore.updateSettings(newSettings);
};

// 登录
const handleLogin = () => {
  router.push('/login');
};

// 退出登录
const handleLogout = () => {
  Modal.confirm({
    title: '确认退出登录',
    content: '退出登录后需要重新扫码登录百度云盘',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await userStore.logout();
        message.success('已退出登录');
      } catch (error) {
        console.error('退出登录失败:', error);
        message.error('退出登录失败');
      }
    }
  });
};

// 清除缓存
const clearCache = async () => {
  try {
    // 实际应用中应该调用 Electron API 清除缓存
    await new Promise(resolve => setTimeout(resolve, 1000));
    cacheSize.value = 0;
    message.success('缓存已清除');
  } catch (error) {
    console.error('清除缓存失败:', error);
    message.error('清除缓存失败');
  }
};

// 获取缓存大小
const getCacheSize = async () => {
  try {
    // 实际应用中应该调用 Electron API 获取缓存大小
    // 这里使用模拟数据
    cacheSize.value = Math.floor(Math.random() * 100);
  } catch (error) {
    console.error('获取缓存大小失败:', error);
  }
};

// 生命周期钩子
onMounted(() => {
  getCacheSize();
});
</script>

<style scoped>
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
