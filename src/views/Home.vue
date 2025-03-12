<template>
  <div class="p-4">
    <a-row :gutter="[16, 16]">
      <a-col :span="24">
        <a-card class="mb-6">
          <template #cover>
            <div class="h-40 bg-gradient-to-br from-blue-600 to-blue-400 flex flex-col items-center justify-center text-white text-center p-6">
              <h1 class="text-2xl mb-2 text-white">欢迎使用百度云音乐播放器</h1>
              <p class="text-base m-0">在这里，您可以播放百度云盘中的音频文件</p>
            </div>
          </template>
          <a-card-meta>
            <template #description>
              <div class="flex gap-4 mt-4">
                <a-button type="primary" @click="navigateTo('/playlists')">
                  <unordered-list-outlined />
                  查看播放列表
                </a-button>
                <a-button @click="handleBrowseFiles">
                  <folder-outlined />
                  浏览云盘文件
                </a-button>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>

    <!-- 最近播放 -->
    <a-row :gutter="[16, 16]" class="mb-8">
      <a-col :span="24">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg m-0">最近播放</h2>
          <a-button type="link" @click="navigateTo('/playlists')">查看全部</a-button>
        </div>
      </a-col>
      
      <a-col v-if="recentTracks.length === 0" :span="24">
        <a-empty description="暂无最近播放记录" />
      </a-col>
      
      <a-col v-for="track in recentTracks" :key="track.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <a-card hoverable class="h-full" @click="playTrack(track)">
          <template #cover>
            <div class="h-36 flex items-center justify-center bg-gray-100 dark:bg-gray-700 relative">
              <customer-service-outlined class="text-5xl text-gray-500 dark:text-gray-400" />
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <play-circle-outlined class="text-5xl text-white" />
              </div>
            </div>
          </template>
          <a-card-meta :title="track.name" :description="track.artist || '未知艺术家'" />
        </a-card>
      </a-col>
    </a-row>

    <!-- 我的播放列表 -->
    <a-row :gutter="[16, 16]" class="mb-8">
      <a-col :span="24">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg m-0">我的播放列表</h2>
          <a-button type="link" @click="navigateTo('/playlists')">查看全部</a-button>
        </div>
      </a-col>
      
      <a-col v-if="playlists.length === 0" :span="24">
        <a-empty description="暂无播放列表">
          <template #description>
            <span>
              暂无播放列表，
              <a @click="handleCreatePlaylist" class="cursor-pointer">创建一个</a>
            </span>
          </template>
        </a-empty>
      </a-col>
      
      <a-col v-for="playlist in playlists" :key="playlist.id" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <a-card hoverable class="h-full" @click="navigateTo(`/playlist/${playlist.id}`)">
          <template #cover>
            <div class="h-36 flex items-center justify-center bg-gray-100 dark:bg-gray-700 relative">
              <unordered-list-outlined class="text-5xl text-gray-500 dark:text-gray-400" />
            </div>
          </template>
          <a-card-meta :title="playlist.name" :description="`${playlist.trackCount || 0}首歌曲`" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { useRouter } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { 
  UnorderedListOutlined, 
  FolderOutlined, 
  CustomerServiceOutlined,
  PlayCircleOutlined
} from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';
import { usePlaylistStore } from '@/stores/playlist';

const router = useRouter();
const playerStore = usePlayerStore();
const playlistStore = usePlaylistStore();

// 状态
const recentTracks = ref([]);
const playlists = ref([]);
const isLoading = ref(false);

// 导航方法
const navigateTo = (path) => {
  router.push(path);
};

// 播放歌曲
const playTrack = async (track) => {
  try {
    await playerStore.play(track);
  } catch (error) {
    console.error('播放失败:', error);
    message.error('播放失败，请重试');
  }
};

// 浏览云盘文件
const handleBrowseFiles = async () => {
  try {
    const files = await window.electronAPI.browseCloudFiles();
    if (files && files.length > 0) {
      // 添加到播放列表并播放
      await playerStore.setPlaylist(files, true);
      message.success('已添加到播放列表');
    }
  } catch (error) {
    console.error('浏览文件失败:', error);
    message.error('浏览文件失败，请重试');
  }
};

// 创建播放列表
const handleCreatePlaylist = () => {
  // 使用普通的Vue模板语法替代JSX
  Modal.confirm({
    title: '创建播放列表',
    content: h('div', {}, [
      h('a-form', { layout: 'vertical' }, [
        h('a-form-item', { label: '播放列表名称', required: true }, [
          h('a-input', {
            value: playlistName.value,
            'onUpdate:value': val => playlistName.value = val,
            placeholder: '请输入播放列表名称'
          })
        ]),
        h('a-form-item', { label: '描述' }, [
          h('a-textarea', {
            value: playlistDescription.value,
            'onUpdate:value': val => playlistDescription.value = val,
            placeholder: '请输入描述（可选）',
            rows: 3
          })
        ])
      ])
    ]),
    onOk: async () => {
      if (!playlistName.value) {
        message.error('请输入播放列表名称');
        return Promise.reject();
      }
      
      try {
        await playlistStore.createPlaylist(playlistName.value, playlistDescription.value);
        message.success('创建成功');
        await fetchPlaylists();
        return Promise.resolve();
      } catch (error) {
        console.error('创建播放列表失败:', error);
        message.error('创建播放列表失败，请重试');
        return Promise.reject();
      }
    },
  });
};

// 获取最近播放
const fetchRecentTracks = async () => {
  try {
    const result = await window.electronAPI.getRecentTracks();
    recentTracks.value = result.slice(0, 6); // 只显示前6个
  } catch (error) {
    console.error('获取最近播放失败:', error);
  }
};

// 获取播放列表
const fetchPlaylists = async () => {
  isLoading.value = true;
  
  try {
    await playlistStore.fetchPlaylists();
    playlists.value = playlistStore.playlists.slice(0, 6); // 只显示前6个
  } catch (error) {
    console.error('获取播放列表失败:', error);
  } finally {
    isLoading.value = false;
  }
};

// 生命周期钩子
onMounted(async () => {
  await Promise.all([
    fetchRecentTracks(),
    fetchPlaylists()
  ]);
});

// 创建播放列表的状态
const playlistName = ref('');
const playlistDescription = ref('');
</script>
