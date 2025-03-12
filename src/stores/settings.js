import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  // 状态
  const theme = ref('system'); // system, light, dark
  const visualizerType = ref('bars'); // bars, wave, circle
  const visualizerColor = ref('#1890ff');
  const autoMatchLyrics = ref(true);
  const defaultVolume = ref(0.7);
  const defaultPlayMode = ref('sequence'); // sequence, loop, random
  const showNotifications = ref(true);
  const autoPlayNext = ref(true);
  const savePlayHistory = ref(true);
  const maxPlayHistoryItems = ref(100);
  const downloadPath = ref('');
  const fileNameTemplate = ref('{artist} - {title}');
  const audioQuality = ref('high'); // low, medium, high

  // 初始化设置
  const initSettings = async () => {
    try {
      const settings = await window.electronAPI.getSettings();
      
      // 更新状态
      theme.value = settings.theme || 'system';
      visualizerType.value = settings.visualizerType || 'bars';
      visualizerColor.value = settings.visualizerColor || '#1890ff';
      autoMatchLyrics.value = settings.autoMatchLyrics !== undefined ? settings.autoMatchLyrics : true;
      defaultVolume.value = settings.defaultVolume || 0.7;
      defaultPlayMode.value = settings.defaultPlayMode || 'sequence';
      showNotifications.value = settings.showNotifications !== undefined ? settings.showNotifications : true;
      autoPlayNext.value = settings.autoPlayNext !== undefined ? settings.autoPlayNext : true;
      savePlayHistory.value = settings.savePlayHistory !== undefined ? settings.savePlayHistory : true;
      maxPlayHistoryItems.value = settings.maxPlayHistoryItems || 100;
      downloadPath.value = settings.downloadPath || '';
      fileNameTemplate.value = settings.fileNameTemplate || '{artist} - {title}';
      audioQuality.value = settings.audioQuality || 'high';
    } catch (error) {
      console.error('初始化设置失败:', error);
    }
  };

  // 保存设置
  const saveSettings = async () => {
    try {
      await window.electronAPI.saveSettings({
        theme: theme.value,
        visualizerType: visualizerType.value,
        visualizerColor: visualizerColor.value,
        autoMatchLyrics: autoMatchLyrics.value,
        defaultVolume: defaultVolume.value,
        defaultPlayMode: defaultPlayMode.value,
        showNotifications: showNotifications.value,
        autoPlayNext: autoPlayNext.value,
        savePlayHistory: savePlayHistory.value,
        maxPlayHistoryItems: maxPlayHistoryItems.value,
        downloadPath: downloadPath.value,
        fileNameTemplate: fileNameTemplate.value,
        audioQuality: audioQuality.value
      });
    } catch (error) {
      console.error('保存设置失败:', error);
      throw error;
    }
  };

  // 设置主题
  const setTheme = async (newTheme) => {
    theme.value = newTheme;
    await saveSettings();
    
    // 应用主题
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // 跟随系统
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  };

  // 设置可视化类型
  const setVisualizerType = async (type) => {
    visualizerType.value = type;
    await saveSettings();
  };

  // 设置可视化颜色
  const setVisualizerColor = async (color) => {
    visualizerColor.value = color;
    await saveSettings();
  };

  // 设置是否自动匹配歌词
  const setAutoMatchLyrics = async (value) => {
    autoMatchLyrics.value = value;
    await saveSettings();
  };

  // 设置默认音量
  const setDefaultVolume = async (value) => {
    defaultVolume.value = value;
    await saveSettings();
  };

  // 设置默认播放模式
  const setDefaultPlayMode = async (mode) => {
    defaultPlayMode.value = mode;
    await saveSettings();
  };

  // 设置是否显示通知
  const setShowNotifications = async (value) => {
    showNotifications.value = value;
    await saveSettings();
  };

  // 设置是否自动播放下一首
  const setAutoPlayNext = async (value) => {
    autoPlayNext.value = value;
    await saveSettings();
  };

  // 设置是否保存播放历史
  const setSavePlayHistory = async (value) => {
    savePlayHistory.value = value;
    await saveSettings();
  };

  // 设置最大播放历史记录数
  const setMaxPlayHistoryItems = async (value) => {
    maxPlayHistoryItems.value = value;
    await saveSettings();
  };

  // 设置下载路径
  const setDownloadPath = async (path) => {
    downloadPath.value = path;
    await saveSettings();
  };

  // 设置文件名模板
  const setFileNameTemplate = async (template) => {
    fileNameTemplate.value = template;
    await saveSettings();
  };

  // 设置音频质量
  const setAudioQuality = async (quality) => {
    audioQuality.value = quality;
    await saveSettings();
  };

  // 选择下载路径
  const selectDownloadPath = async () => {
    try {
      const path = await window.electronAPI.selectDirectory();
      if (path) {
        await setDownloadPath(path);
      }
    } catch (error) {
      console.error('选择下载路径失败:', error);
      throw error;
    }
  };

  // 重置设置
  const resetSettings = async () => {
    theme.value = 'system';
    visualizerType.value = 'bars';
    visualizerColor.value = '#1890ff';
    autoMatchLyrics.value = true;
    defaultVolume.value = 0.7;
    defaultPlayMode.value = 'sequence';
    showNotifications.value = true;
    autoPlayNext.value = true;
    savePlayHistory.value = true;
    maxPlayHistoryItems.value = 100;
    downloadPath.value = '';
    fileNameTemplate.value = '{artist} - {title}';
    audioQuality.value = 'high';
    
    await saveSettings();
  };

  return {
    theme,
    visualizerType,
    visualizerColor,
    autoMatchLyrics,
    defaultVolume,
    defaultPlayMode,
    showNotifications,
    autoPlayNext,
    savePlayHistory,
    maxPlayHistoryItems,
    downloadPath,
    fileNameTemplate,
    audioQuality,
    initSettings,
    saveSettings,
    setTheme,
    setVisualizerType,
    setVisualizerColor,
    setAutoMatchLyrics,
    setDefaultVolume,
    setDefaultPlayMode,
    setShowNotifications,
    setAutoPlayNext,
    setSavePlayHistory,
    setMaxPlayHistoryItems,
    setDownloadPath,
    setFileNameTemplate,
    setAudioQuality,
    selectDownloadPath,
    resetSettings
  };
});
