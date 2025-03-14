import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import Antd from 'ant-design-vue';
import 'uno.css';
import './style.less';
import App from './App.vue';

// 导入路由
import routes from './router';

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 创建Pinia实例
const pinia = createPinia();

// 创建应用实例
const app = createApp(App);

// 使用插件
app.use(router);
app.use(pinia);
app.use(Antd);

// 挂载应用
app.mount('#app');

// 主题设置
const setTheme = (theme) => {
  // 移除所有主题相关的类
  document.documentElement.classList.remove('dark', 'light');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.add('light');
  } else {
    // 跟随系统
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
  }
  
  // 设置数据属性用于其他组件的主题判断
  document.documentElement.setAttribute('data-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
};

// 初始化主题
const initTheme = async () => {
  try {
    // 检查是否在Electron环境中
    if (window.electronAPI && typeof window.electronAPI.getSettings === 'function') {
      const settings = await window.electronAPI.getSettings();
      setTheme(settings.theme);
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (settings.theme === 'system') {
          setTheme('system');
        }
      });
    } else {
      // 在浏览器环境中，使用默认主题
      setTheme('light');
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // 如果设置为跟随系统，则根据系统主题变化更新
        // 否则保持当前设置的主题
        const settings = { theme: 'light' }; // 在浏览器环境中默认使用亮色模式
        if (settings.theme === 'system') {
          setTheme('system');
        } else {
          setTheme('light');
        }
      });
    }
  } catch (error) {
    console.error('初始化主题失败:', error);
    setTheme('light');
  }
};

// 初始化应用
const init = async () => {
  await initTheme();
};

init().catch(error => {
  console.error('初始化应用失败:', error);
});
