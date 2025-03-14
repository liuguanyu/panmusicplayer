<script setup>
import { computed, watch, onMounted } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

// 计算当前主题
const isDarkMode = computed(() => {
  if (settingsStore.theme === 'dark') {
    return true;
  } else if (settingsStore.theme === 'light') {
    return false;
  } else {
    // 跟随系统
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
});

// Ant Design Vue 主题配置
const theme = computed(() => ({
  algorithm: isDarkMode.value ? ConfigProvider.darkAlgorithm : ConfigProvider.defaultAlgorithm,
  token: {
    colorPrimary: isDarkMode.value ? '#177ddc' : '#1890ff',
    colorSuccess: isDarkMode.value ? '#49aa19' : '#52c41a',
    colorWarning: isDarkMode.value ? '#d89614' : '#faad14',
    colorError: isDarkMode.value ? '#d32029' : '#f5222d',
    colorTextBase: isDarkMode.value ? '#ffffff' : '#000000',
    colorBgBase: isDarkMode.value ? '#141414' : '#ffffff',
    borderRadius: 4
  }
}));

// 监听暗色模式变化，添加或移除 .dark 类
const updateDarkModeClass = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 初始化和监听主题变化
onMounted(() => {
  updateDarkModeClass(isDarkMode.value);
});

watch(isDarkMode, (newValue) => {
  updateDarkModeClass(newValue);
});
</script>

<template>
  <config-provider :theme="theme">
    <router-view />
  </config-provider>
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>
