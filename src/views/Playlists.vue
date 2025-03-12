<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">我的播放列表</h1>
      <a-button type="primary" @click="showCreateModal">
        <plus-outlined />
        创建播放列表
      </a-button>
    </div>

    <a-spin :spinning="loading">
      <div v-if="playlists.length === 0" class="flex justify-center items-center h-60">
        <a-empty description="暂无播放列表" />
      </div>
      
      <a-row :gutter="[16, 16]" v-else>
        <a-col v-for="playlist in playlists" :key="playlist.id" :xs="24" :sm="12" :md="8" :lg="6">
          <a-card 
            hoverable 
            class="h-full"
            @click="navigateToDetail(playlist.id)"
          >
            <template #cover>
              <div class="h-40 flex justify-center items-center bg-gray-100 dark:bg-gray-800 relative">
                <unordered-list-outlined class="text-4xl text-gray-400" />
                <div class="absolute bottom-2 right-2 text-sm bg-black/50 text-white px-2 py-1 rounded">
                  {{ playlist.tracks?.length || 0 }}首歌曲
                </div>
              </div>
            </template>
            <a-card-meta :title="playlist.name">
              <template #description>
                <p class="truncate text-gray-500">{{ playlist.description || '暂无描述' }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-gray-400">
                    创建于 {{ formatDate(playlist.createdAt) }}
                  </span>
                  <div class="flex gap-2">
                    <a-button type="text" size="small" @click.stop="handleEdit(playlist)">
                      <template #icon><edit-outlined /></template>
                    </a-button>
                    <a-button type="text" size="small" @click.stop="handleDelete(playlist)">
                      <template #icon><delete-outlined /></template>
                    </a-button>
                  </div>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>

    <!-- 创建/编辑播放列表对话框 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="isEditing ? '编辑播放列表' : '创建播放列表'"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { 
  PlusOutlined, 
  UnorderedListOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons-vue';
import { usePlaylistStore } from '@/stores/playlist';

const router = useRouter();
const playlistStore = usePlaylistStore();

// 状态
const playlists = ref([]);
const loading = ref(false);
const modalVisible = ref(false);
const modalLoading = ref(false);
const isEditing = ref(false);
const currentPlaylistId = ref(null);

// 表单状态
const formState = reactive({
  name: '',
  description: ''
});

// 获取播放列表
const fetchPlaylists = async () => {
  loading.value = true;
  try {
    await playlistStore.fetchPlaylists();
    playlists.value = playlistStore.playlists;
  } catch (error) {
    console.error('获取播放列表失败:', error);
    message.error('获取播放列表失败');
  } finally {
    loading.value = false;
  }
};

// 导航到播放列表详情
const navigateToDetail = (id) => {
  router.push(`/playlist/${id}`);
};

// 显示创建对话框
const showCreateModal = () => {
  isEditing.value = false;
  formState.name = '';
  formState.description = '';
  modalVisible.value = true;
};

// 处理编辑
const handleEdit = (playlist) => {
  isEditing.value = true;
  currentPlaylistId.value = playlist.id;
  formState.name = playlist.name;
  formState.description = playlist.description || '';
  modalVisible.value = true;
};

// 处理删除
const handleDelete = (playlist) => {
  const { id, name } = playlist;
  
  // 确认删除
  message.confirm(`确定要删除播放列表 "${name}" 吗？`, {
    title: '删除确认',
    okText: '删除',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      try {
        await playlistStore.deletePlaylist(id);
        message.success('删除成功');
        await fetchPlaylists();
      } catch (error) {
        console.error('删除播放列表失败:', error);
        message.error('删除播放列表失败');
      }
    }
  });
};

// 处理对话框确认
const handleModalOk = async () => {
  // 表单验证
  if (!formState.name) {
    message.error('请输入播放列表名称');
    return;
  }
  
  modalLoading.value = true;
  
  try {
    if (isEditing.value) {
      // 编辑现有播放列表
      await playlistStore.updatePlaylist(currentPlaylistId.value, {
        name: formState.name,
        description: formState.description
      });
      message.success('更新成功');
    } else {
      // 创建新播放列表
      await playlistStore.createPlaylist(formState.name, formState.description);
      message.success('创建成功');
    }
    
    // 刷新列表
    await fetchPlaylists();
    modalVisible.value = false;
  } catch (error) {
    console.error('操作失败:', error);
    message.error(isEditing.value ? '更新播放列表失败' : '创建播放列表失败');
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

// 生命周期钩子
onMounted(() => {
  fetchPlaylists();
});
</script>
