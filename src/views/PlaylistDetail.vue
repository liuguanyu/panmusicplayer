<template>
  <div class="p-4">
    <a-spin :spinning="loading">
      <!-- 播放列表头部信息 -->
      <div class="flex gap-6 mb-6">
        <div class="w-48 h-48 flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <unordered-list-outlined class="text-6xl text-gray-400" />
        </div>
        
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-bold">{{ 
                typeof playlist?.name === 'string' && playlist?.name.startsWith('{') ? 
                  JSON.parse(playlist?.name).name : 
                  (typeof playlist?.name === 'object' ? 
                    playlist?.name.name : 
                    (playlist?.name || '加载中...')) 
              }}</h1>
              <a-button type="text" size="small" @click="handleEdit" v-if="playlist">
                <template #icon><edit-outlined /></template>
              </a-button>
            </div>
            
            <p class="text-gray-500 mt-2">{{ playlist?.description || '暂无描述' }}</p>
            
            <div class="mt-4 text-sm text-gray-400">
              <p>{{ playlist?.tracks?.length || 0 }}首歌曲</p>
              <p>创建于 {{ formatDate(playlist?.createdAt) }}</p>
            </div>
          </div>
          
          <div class="flex gap-3">
            <a-button type="primary" @click="handlePlayAll" :disabled="!playlist?.tracks?.length">
              <play-circle-outlined />
              播放全部
            </a-button>
            <a-button @click="handleAddTracks">
              <plus-outlined />
              添加歌曲
            </a-button>
          </div>
        </div>
      </div>
      
      <!-- 歌曲列表 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div v-if="!playlist?.tracks?.length" class="flex justify-center items-center h-60">
          <a-empty description="暂无歌曲">
            <template #description>
              <span>
                播放列表中暂无歌曲，
                <a @click="handleAddTracks">添加歌曲</a>
              </span>
            </template>
          </a-empty>
        </div>
        
        <a-table
          v-else
          :dataSource="playlist.tracks"
          :columns="columns"
          :pagination="false"
          :rowKey="record => record.id"
          :rowClassName="(record) => record.id === currentTrackId ? 'bg-primary/10' : ''"
        >
          <!-- 序号列 -->
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.dataIndex === 'index'">
              <div class="w-8 h-8 flex justify-center items-center">
                <span v-if="record.id !== currentTrackId">{{ index + 1 }}</span>
                <sound-outlined v-else class="text-primary animate-pulse" />
              </div>
            </template>
            
            <!-- 歌曲名称列 -->
            <template v-if="column.dataIndex === 'name'">
              <div class="flex items-center">
                <div class="flex-1 truncate">
                  <div :class="record.id === currentTrackId ? 'text-primary font-medium' : ''">
                    {{ record.name }}
                  </div>
                  <div class="text-xs text-gray-400 truncate">
                    {{ record.artist || '未知艺术家' }}
                  </div>
                </div>
              </div>
            </template>
            
            <!-- 时长列 -->
            <template v-if="column.dataIndex === 'duration'">
              {{ formatDuration(record.duration) }}
            </template>
            
            <!-- 操作列 -->
            <template v-if="column.dataIndex === 'actions'">
              <div class="flex gap-2">
                <a-button type="text" size="small" @click.stop="handlePlay(record)">
                  <template #icon><play-circle-outlined /></template>
                </a-button>
                <a-button type="text" size="small" @click.stop="handleRemoveTrack(record)">
                  <template #icon><delete-outlined /></template>
                </a-button>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </a-spin>
    
    <!-- 编辑播放列表对话框 -->
    <a-modal
      v-model:open="modalVisible"
      title="编辑播放列表"
      @ok="handleModalOk"
      :confirmLoading="modalLoading"
    >
      <a-form :model="formState" layout="vertical">
        <a-form-item label="播放列表名称" required>
          <a-input v-model:value="formState.name" placeholder="请输入播放列表名称" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model:value="formState.description" placeholder="请输入描述（可选）" :rows="3" />
        </a-form-item>
      </a-form>
    </a-modal>
    
    <!-- 云盘文件浏览器对话框 -->
    <a-modal
      v-model:open="showFileExplorer"
      title="浏览百度云盘文件"
      width="80%"
      :footer="null"
    >
      <FileExplorer 
        :playlistId="playlistId" 
        @files-added="handleFilesAdded"
        showAddToPlaylistButton
      />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated, h, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { 
  UnorderedListOutlined, 
  PlayCircleOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SoundOutlined,
  FolderOpenOutlined,
  CloudOutlined
} from '@ant-design/icons-vue';
import FileExplorer from '@/components/FileExplorer.vue';
import { usePlaylistStore } from '@/stores/playlist';
import { usePlayerStore } from '@/stores/player';

const route = useRoute();
const router = useRouter();
const playlistStore = usePlaylistStore();
const playerStore = usePlayerStore();

// 状态
const playlistId = computed(() => route.params.id);
const playlist = ref(null);
const loading = ref(false);
const modalVisible = ref(false);
const modalLoading = ref(false);

// 当前播放歌曲ID
const currentTrackId = computed(() => playerStore.currentTrack?.id);

// 表单状态
const formState = reactive({
  name: '',
  description: ''
});

// 表格列定义
const columns = [
  {
    title: '',
    dataIndex: 'index',
    width: 60,
  },
  {
    title: '歌曲',
    dataIndex: 'name',
  },
  {
    title: '时长',
    dataIndex: 'duration',
    width: 120,
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 120,
  }
];

// 获取播放列表详情
const fetchPlaylistDetail = async () => {
  if (!playlistId.value) return;
  
  loading.value = true;
  try {
    const result = await playlistStore.fetchPlaylistDetail(playlistId.value);
    if (!result) {
      message.error('播放列表不存在');
      router.push('/playlists');
      return;
    }
    playlist.value = result;
  } catch (error) {
    console.error('获取播放列表详情失败:', error);
    message.error('获取播放列表详情失败');
  } finally {
    loading.value = false;
  }
};

// 播放全部
const handlePlayAll = () => {
  if (!playlist.value?.tracks?.length) return;
  
  playerStore.loadPlaylist(playlist.value.tracks, true);
  message.success('开始播放');
};

// 播放单曲
const handlePlay = (track) => {
  playerStore.play(track);
};

// 云盘文件浏览器状态
const showFileExplorer = ref(false);

// 添加歌曲
const handleAddTracks = () => {
  // 使用下拉菜单提供选项
  const menu = {
    onClick: async ({ key }) => {
      if (key === 'local') {
        await addLocalTracks();
      } else if (key === 'cloud') {
        await addCloudTracks();
      }
    },
    items: [
      {
        key: 'local',
        label: '从本地添加',
        icon: () => h(FolderOpenOutlined)
      },
      {
        key: 'cloud',
        label: '从百度云盘添加',
        icon: () => h(CloudOutlined)
      }
    ]
  };
  
  // 显示下拉菜单
  message.info({
    content: h('div', {}, [
      h('div', { class: 'mb-2' }, '请选择添加方式'),
      h('a-menu', {
        ...menu,
        style: 'border: 1px solid #eee; border-radius: 4px;'
      })
    ]),
    duration: 0,
    key: 'add_tracks_menu'
  });
};

// 从本地添加歌曲
const addLocalTracks = async () => {
  message.destroy('add_tracks_menu');
  
  try {
    const files = await window.electronAPI.selectFiles();
    if (!files || files.length === 0) return;
    
    // 处理文件，添加到播放列表
    const tracks = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 10),
      name: file.split('/').pop().split('.')[0],
      path: file,
      duration: 0, // 实际应用中应该获取真实时长
      artist: '未知艺术家',
      addedAt: Date.now()
    }));
    
    await playlistStore.addTracksToPlaylist(playlistId.value, tracks);
    message.success(`已添加 ${tracks.length} 首歌曲`);
    // 先刷新当前播放列表详情
    await fetchPlaylistDetail();
    // 然后刷新所有播放列表数据，确保首页数据同步
    await playlistStore.fetchPlaylists();
  } catch (error) {
    console.error('添加歌曲失败:', error);
    message.error('添加歌曲失败');
  }
};

// 从云盘添加歌曲
const addCloudTracks = async () => {
  message.destroy('add_tracks_menu');
  
  try {
    // 先验证用户是否已登录
    const isLoggedIn = await window.electronAPI.baiduPan.verifyToken();
    if (!isLoggedIn) {
      message.warning('您尚未登录百度云盘，请先在设置中登录');
      router.push('/settings');
      return;
    }
    
    // 显示文件浏览器模态框
    showFileExplorer.value = true;
  } catch (error) {
    console.error('浏览云盘文件失败:', error);
    message.error('浏览云盘文件失败，请重试');
  }
};

// 处理文件添加到播放列表
const handleFilesAdded = async (tracks) => {
  if (tracks && tracks.length > 0) {
    showFileExplorer.value = false;
    message.success(`已添加 ${tracks.length} 首歌曲`);
    // 先刷新当前播放列表详情
    await fetchPlaylistDetail();
    // 然后刷新所有播放列表数据，确保首页数据同步
    await playlistStore.fetchPlaylists();
  }
};

// 移除歌曲
const handleRemoveTrack = async (track) => {
  try {
    await playlistStore.removeTracksFromPlaylist(playlistId.value, [track.id]);
    message.success('已移除歌曲');
    // 先刷新当前播放列表详情
    await fetchPlaylistDetail();
    // 然后刷新所有播放列表数据，确保首页数据同步
    await playlistStore.fetchPlaylists();
  } catch (error) {
    console.error('移除歌曲失败:', error);
    message.error('移除歌曲失败');
  }
};

// 编辑播放列表
const handleEdit = () => {
  formState.name = playlist.value.name;
  formState.description = playlist.value.description || '';
  modalVisible.value = true;
};

// 处理对话框确认
const handleModalOk = async () => {
  if (!formState.name) {
    message.error('请输入播放列表名称');
    return;
  }
  
  modalLoading.value = true;
  
  try {
    await playlistStore.updatePlaylist(playlistId.value, {
      name: formState.name,
      description: formState.description
    });
    
    message.success('更新成功');
    // 先刷新当前播放列表详情
    await fetchPlaylistDetail();
    // 然后刷新所有播放列表数据，确保首页数据同步
    await playlistStore.fetchPlaylists();
    modalVisible.value = false;
  } catch (error) {
    console.error('更新播放列表失败:', error);
    message.error('更新播放列表失败');
  } finally {
    modalLoading.value = false;
  }
};

// 格式化日期
const formatDate = (timestamp) => {
  if (!timestamp) return '未知时间';
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

// 格式化时长
const formatDuration = (seconds) => {
  if (!seconds) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 生命周期钩子
onMounted(() => {
  fetchPlaylistDetail();
});

// 当组件被激活时（从缓存中恢复），重新获取数据
onActivated(() => {
  fetchPlaylistDetail();
});

// 监听路由参数变化，当 playlistId 变化时重新获取播放列表详情
watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    fetchPlaylistDetail();
  }
}, { immediate: true });

// 监听 playlistStore.playlists 的变化，确保数据同步
watch(() => playlistStore.playlists, () => {
  // 当播放列表数据变化时，重新获取当前播放列表详情
  if (playlistId.value) {
    fetchPlaylistDetail();
  }
}, { deep: true });
</script>
