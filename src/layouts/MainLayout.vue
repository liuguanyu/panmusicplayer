<template>
  <a-layout class="h-screen dark:bg-dark">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="overflow-auto h-screen dark:bg-dark"
      :theme="theme === 'dark' ? 'dark' : 'light'"
      :class="{'dark:bg-[#141414]': theme === 'dark'}"
    >
      <div class="h-16 p-4 flex items-center overflow-hidden">
        <img src="@/assets/music-logo.svg" alt="百度云音乐" class="h-8 w-8 mr-2" />
        <h1 v-if="!collapsed" class="text-lg m-0 whitespace-nowrap dark:text-white">百度云音乐</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="theme === 'dark' ? 'dark' : 'light'"
        mode="inline"
        class="dark:bg-[#141414]"
      >
        <a-menu-item v-for="route in menuRoutes" :key="route.name" @click="() => navigateTo(route.path)">
          <template #icon>
            <component :is="route.meta.icon" />
          </template>
          <span>{{ route.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="bg-white dark:bg-[#141414] px-4 flex items-center justify-between shadow-sm sticky top-0 z-9">
    <div class="flex items-center">
      <menu-unfold-outlined
        v-if="collapsed"
        class="text-lg cursor-pointer transition-colors duration-300 mr-4 hover:text-primary dark:text-white"
        @click="() => (collapsed = !collapsed)"
      />
      <menu-fold-outlined
        v-else
        class="text-lg cursor-pointer transition-colors duration-300 mr-4 hover:text-primary dark:text-white"
        @click="() => (collapsed = !collapsed)"
      />
      <div class="ml-2">
        <a-breadcrumb class="dark:text-white">
          <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" class="dark:text-white">
            {{ item.title }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div>
      <a-dropdown>
        <a class="flex items-center cursor-pointer hover:text-primary dark:text-white">
          <a-avatar :size="32" class="mr-2" :src="userInfo?.avatarUrl">
            {{ userInfo?.username?.charAt(0) || 'U' }}
          </a-avatar>
          <span v-if="userInfo?.username" class="dark:text-white">{{ userInfo.username }}</span>
          <span v-else class="dark:text-white">未登录</span>
          <a-button size="small" class="ml-2" @click="handleRefreshUserInfo">刷新</a-button>
        </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="settings" @click="navigateTo('settings')">
                  <setting-outlined class="mr-2" />
                  <span>设置</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="handleLogout">
                  <logout-outlined class="mr-2" />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容区 -->
      <a-layout-content 
        class="p-6 overflow-auto transition-all duration-200 min-h-[calc(100vh-144px)] bg-white dark:bg-[#141414]"
      >
        <router-view v-slot="{ Component }">
          <transition 
            enter-active-class="transition-opacity duration-300 ease-in"
            leave-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>

      <!-- 播放器 -->
      <audio-player v-if="playerStore.currentTrack" />
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { usePlayerStore } from '@/stores/player';
import { useSettingsStore } from '@/stores/settings';
import { ConfigProvider } from 'ant-design-vue';
const { darkAlgorithm, defaultAlgorithm } = ConfigProvider;
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
import AudioPlayer from '@/components/player/AudioPlayer.vue';

// 路由
const route = useRoute();
const router = useRouter();

// Store
const userStore = useUserStore();
const playerStore = usePlayerStore();
const settingsStore = useSettingsStore();

// 从Store获取状态
const { userInfo, isLoggedIn } = storeToRefs(userStore);
const { theme } = storeToRefs(settingsStore);

// 侧边栏折叠状态
const collapsed = ref(false);

// 选中的菜单项
const selectedKeys = ref([route.name]);

// 监听路由变化，更新选中的菜单项
watch(() => route.name, (newName) => {
  selectedKeys.value = [newName];
});

// 获取菜单路由
const menuRoutes = computed(() => {
  return router.options.routes
    .find(r => r.name === 'Layout')
    ?.children.filter(r => !r.meta?.hideInMenu) || [];
});

// 面包屑
const breadcrumbItems = computed(() => {
  const items = [];
  const currentRoute = route;
  
  if (currentRoute.matched.length) {
    currentRoute.matched.forEach(r => {
      if (r.meta?.title) {
        items.push({
          title: r.meta.title,
          path: r.path
        });
      }
    });
  }
  
  return items;
});

// 导航方法
const navigateTo = (path) => {
  router.push(path);
};

// 退出登录
const handleLogout = async () => {
  try {
    await userStore.logout();
    router.push('login');
  } catch (error) {
    console.error('退出登录失败:', error);
  }
};

// 刷新用户信息
const handleRefreshUserInfo = async () => {
  try {
    console.log('手动刷新用户信息');
    await userStore.fetchUserInfo();
    console.log('刷新后的用户信息:', userInfo.value);
  } catch (error) {
    console.error('刷新用户信息失败:', error);
  }
};

// 检查登录状态
onMounted(async () => {
  try {
    // 检查是否已登录
    const isLoggedIn = await userStore.checkLoginStatus();
    console.log('登录状态:', isLoggedIn);
    console.log('用户信息:', userInfo.value);
    
    if (!isLoggedIn && route.path !== '/login') {
      router.push('login');
    }
    
    // 如果已登录但没有用户信息，尝试手动获取
    if (isLoggedIn && !userInfo.value) {
      console.log('尝试手动获取用户信息');
      await userStore.fetchUserInfo();
      console.log('手动获取后的用户信息:', userInfo.value);
    }
  } catch (error) {
    console.error('检查登录状态失败:', error);
  }
});
</script>
