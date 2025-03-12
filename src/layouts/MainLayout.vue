<template>
  <a-layout class="main-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="main-sider"
      :theme="theme"
    >
      <div class="logo">
        <img src="@/assets/vue.svg" alt="百度云音乐" />
        <h1 v-if="!collapsed">百度云音乐</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="theme"
        mode="inline"
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
      <a-layout-header class="main-header">
        <div class="header-left">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="breadcrumb">
            <a-breadcrumb>
              <a-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index">
                {{ item.title }}
              </a-breadcrumb-item>
            </a-breadcrumb>
          </div>
        </div>
        <div class="header-right">
          <a-dropdown>
            <a class="user-dropdown">
              <a-avatar :size="32" class="mr-2">{{ userInfo?.nickname?.charAt(0) || 'U' }}</a-avatar>
              <span>{{ userInfo?.nickname || '未登录' }}</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="settings" @click="navigateTo('/settings')">
                  <setting-outlined />
                  <span>设置</span>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" @click="handleLogout">
                  <logout-outlined />
                  <span>退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容区 -->
      <a-layout-content class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
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
const { userInfo } = storeToRefs(userStore);
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
    router.push('/login');
  } catch (error) {
    console.error('退出登录失败:', error);
  }
};

// 检查登录状态
onMounted(async () => {
  try {
    // 检查是否已登录
    const isLoggedIn = await userStore.checkLoginStatus();
    if (!isLoggedIn && route.path !== '/login') {
      router.push('/login');
    }
  } catch (error) {
    console.error('检查登录状态失败:', error);
  }
});
</script>

<style lang="less" scoped>
.main-layout {
  height: 100vh;
}

.main-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;

  .logo {
    height: 64px;
    padding: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
    
    img {
      height: 32px;
      width: 32px;
      margin-right: 8px;
    }
    
    h1 {
      color: var(--text-color);
      font-size: 18px;
      margin: 0;
      white-space: nowrap;
    }
  }
}

.main-header {
  background: var(--background-color);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 9;
  
  .header-left {
    display: flex;
    align-items: center;
    
    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
      margin-right: 16px;
      
      &:hover {
        color: var(--primary-color);
      }
    }
    
    .breadcrumb {
      margin-left: 8px;
    }
  }
  
  .header-right {
    .user-dropdown {
      display: flex;
      align-items: center;
      cursor: pointer;
      
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.main-content {
  margin-left: 200px;
  padding: 24px;
  min-height: calc(100vh - 64px - 80px); // 减去header和player的高度
  overflow: auto;
  transition: margin 0.2s;
}

.main-layout :deep(.ant-layout-sider-collapsed) + .ant-layout .main-content {
  margin-left: 80px;
}
</style>
