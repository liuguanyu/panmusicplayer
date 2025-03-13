<template>
  <div class="h-full flex flex-col">
    <!-- 路径导航 -->
    <div class="path-navigator bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-4 flex items-center overflow-x-auto">
      <a-button 
        type="text" 
        @click="navigateTo('/')"
        class="flex-shrink-0"
      >
        <template #icon><home-outlined /></template>
        根目录
      </a-button>
      
      <right-outlined class="mx-1 text-gray-400 flex-shrink-0" />
      
      <template v-for="(segment, index) in pathSegments" :key="index">
        <a-button 
          type="text" 
          @click="navigateTo(segment.path)"
          class="flex-shrink-0"
        >
          {{ segment.name }}
        </a-button>
        <right-outlined 
          v-if="index < pathSegments.length - 1" 
          class="mx-1 text-gray-400 flex-shrink-0" 
        />
      </template>
    </div>
    
    <!-- 文件操作工具栏 -->
    <div class="flex justify-between items-center mb-4">
      <div class="left-actions">
        <a-button-group>
          <a-button @click="refresh">
            <template #icon><reload-outlined /></template>
            刷新
          </a-button>
          <a-button @click="navigateUp" :disabled="currentPath === '/'">
            <template #icon><arrow-up-outlined /></template>
            上级目录
          </a-button>
        </a-button-group>
      </div>
      
      <div class="right-actions">
        <a-input-search
          v-model:value="searchQuery"
          placeholder="搜索文件"
          class="w-[200px]"
          @search="handleSearch"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input-search>
      </div>
    </div>
    
    <!-- 文件列表 -->
    <div class="flex-1 overflow-auto">
      <!-- 加载状态 -->
      <div v-if="loading" class="py-20 flex justify-center">
        <a-spin tip="加载中..." />
      </div>
      
      <!-- 空状态 -->
      <a-empty v-else-if="filteredFiles.length === 0" description="没有文件" />
      
      <!-- 文件列表 -->
      <a-table
        v-else
        :dataSource="filteredFiles"
        :columns="columns"
        :pagination="false"
        :rowSelection="{ selectedRowKeys: selectedKeys, onChange: onSelectionChange }"
        :rowKey="record => record.fs_id"
        size="middle"
        @row-click="handleRowClick"
        :customRow="customRowEvents"
        :class="tableRowClass"
      >
        <!-- 名称列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <div class="flex items-center">
              <!-- 图标 -->
              <folder-outlined v-if="record.isdir" class="mr-2 text-yellow-500" />
              <file-outlined v-else-if="!isAudioFile(record)" class="mr-2 text-gray-400" />
              <customer-service-outlined v-else class="mr-2 text-primary" />
              
              <!-- 文件名 -->
              <span :class="{ 'text-primary': isAudioFile(record) }">{{ record.server_filename }}</span>
            </div>
          </template>
          
          <!-- 大小列 -->
          <template v-else-if="column.dataIndex === 'size'">
            <span v-if="record.isdir">-</span>
            <span v-else>{{ formatFileSize(record.size) }}</span>
          </template>
          
          <!-- 修改时间列 -->
          <template v-else-if="column.dataIndex === 'time'">
            {{ formatTime(record.server_mtime) }}
          </template>
          
          <!-- 操作列 -->
          <template v-else-if="column.dataIndex === 'action'">
            <div class="flex gap-2">
              <a-button 
                v-if="record.isdir" 
                type="text" 
                size="small"
                @click.stop="navigateTo(currentPath + record.server_filename + '/')"
              >
                打开
              </a-button>
              
              <a-button 
                v-else-if="isAudioFile(record) && props.showAddToPlaylistButton" 
                type="text" 
                size="small"
                @click.stop="addToPlaylist([record])"
              >
                添加到播放列表
              </a-button>
              
              <a-button 
                v-else 
                type="text" 
                size="small"
                disabled
              >
                不支持的文件
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    
    <!-- 底部操作栏 -->
    <div class="mt-4 flex justify-between items-center">
      <div class="selection-info">
        已选择 {{ selectedKeys.length }} 个文件
      </div>
      
      <div class="actions" v-if="props.showAddToPlaylistButton">
        <a-button 
          type="primary" 
          :disabled="!hasSelectedAudioFiles"
          @click="addSelectedToPlaylist"
        >
          <template #icon><plus-outlined /></template>
          添加到播放列表
        </a-button>
      </div>
    </div>
    
    <!-- 播放列表选择/创建模态框 -->
    <a-modal
      v-model:open="showPlaylistModal"
      :title="playlistModalMode === 'select' ? '选择播放列表' : '创建新播放列表'"
      @ok="handlePlaylistModalOk"
      @cancel="handlePlaylistModalCancel"
      :okText="playlistModalMode === 'select' ? '确定' : '创建'"
      cancelText="取消"
      :maskClosable="false"
    >
      <template v-if="playlistModalMode === 'select'">
        <div class="mb-4">
          <p class="mb-2">请选择要添加到的播放列表：</p>
          <a-radio-group v-model:value="selectedPlaylistId" class="w-full">
            <div class="flex flex-col gap-2">
              <a-radio 
                v-for="playlist in playlistStore.playlists" 
                :key="playlist.id" 
                :value="playlist.id"
                class="w-full p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {{ playlist.name }}
              </a-radio>
            </div>
          </a-radio-group>
        </div>
        <div class="flex justify-end">
          <a-button type="link" @click="switchToCreateMode">
            创建新播放列表
          </a-button>
        </div>
      </template>
      
      <template v-else>
        <a-form layout="vertical">
          <a-form-item label="播放列表名称" required>
            <a-input v-model:value="newPlaylistName" placeholder="请输入播放列表名称" />
          </a-form-item>
          <a-form-item label="描述">
            <a-textarea v-model:value="newPlaylistDescription" placeholder="请输入描述（可选）" :rows="3" />
          </a-form-item>
        </a-form>
        <div class="flex justify-end">
          <a-button type="link" @click="switchToSelectMode">
            选择已有播放列表
          </a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { 
  HomeOutlined, 
  RightOutlined, 
  ReloadOutlined, 
  ArrowUpOutlined,
  SearchOutlined,
  FolderOutlined,
  FileOutlined,
  CustomerServiceOutlined,
  PlusOutlined
} from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/user';
import { usePlaylistStore } from '@/stores/playlist';
import { useSettingsStore } from '@/stores/settings';

// 定义props
const props = defineProps({
  initialPath: {
    type: String,
    default: '/'
  },
  playlistId: {
    type: String,
    default: ''
  },
  showAddToPlaylistButton: {
    type: Boolean,
    default: false
  }
});

// 定义emit
const emit = defineEmits(['files-added']);

// 获取store
const userStore = useUserStore();
const playlistStore = usePlaylistStore();
const settingsStore = useSettingsStore();

// 状态
const loading = ref(false);
const currentPath = ref(props.initialPath);
const files = ref([]);
const selectedKeys = ref([]);
const searchQuery = ref('');
const showPlaylistModal = ref(false);
const newPlaylistName = ref('');
const newPlaylistDescription = ref('');
const filesToAddToPlaylist = ref([]);
const playlistModalMode = ref('select'); // 'select' 或 'create'
const selectedPlaylistId = ref('');

// 支持的音频格式
const audioExtensions = ['mp3', 'wav', 'flac', 'ogg', 'm4a', 'ra'];

// 表格行样式
const tableRowClass = computed(() => {
  return {
    'cursor-pointer': true,
    'hover:bg-black/[0.02] dark:hover:bg-white/[0.05]': true
  };
});

// 表格列定义
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
    width: 120
  },
  {
    title: '修改时间',
    dataIndex: 'time',
    key: 'time',
    width: 180
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120
  }
];

// 计算路径段
const pathSegments = computed(() => {
  if (currentPath.value === '/') return [];
  
  const segments = currentPath.value.split('/').filter(Boolean);
  return segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/') + '/';
    return { name: segment, path };
  });
});

// 过滤文件列表
const filteredFiles = computed(() => {
  // 首先过滤掉不支持的文件（非文件夹且非音频文件）
  const supportedFiles = files.value.filter(file => 
    file.isdir || isAudioFile(file)
  );
  
  // 然后应用搜索过滤
  if (!searchQuery.value) return supportedFiles;
  
  const query = searchQuery.value.toLowerCase();
  return supportedFiles.filter(file => 
    file.server_filename.toLowerCase().includes(query)
  );
});

// 是否有选中的音频文件
const hasSelectedAudioFiles = computed(() => {
  return selectedKeys.value.some(key => {
    const file = files.value.find(f => f.fs_id === key);
    return file && !file.isdir && isAudioFile(file);
  });
});

// 监听路径变化
watch(currentPath, () => {
  loadFiles();
});

// 组件挂载时加载文件
onMounted(() => {
  loadFiles();
});

// 加载文件列表
const loadFiles = async () => {
  if (!userStore.isLoggedIn) {
    message.error('请先登录百度云盘');
    return;
  }
  
  loading.value = true;
  selectedKeys.value = [];
  
  try {
    // 调用百度云盘API获取文件列表
    const response = await window.electronAPI.baiduPan.getFileList(currentPath.value, {
      // 可以添加一些选项，如排序方式、页码等
    });
    
    if (!response.success) {
      throw new Error(response.error || '获取文件列表失败');
    }
    
    files.value = response.data.list || [];
  } catch (error) {
    console.error('加载文件列表失败:', error);
    message.error('加载文件列表失败');
  } finally {
    loading.value = false;
  }
};

// 判断是否为音频文件
const isAudioFile = (file) => {
  if (file.isdir) return false;
  
  const filename = file.server_filename.toLowerCase();
  return audioExtensions.some(ext => filename.endsWith('.' + ext));
};

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

// 导航到指定路径
const navigateTo = (path) => {
  currentPath.value = path;
};

// 导航到上级目录
const navigateUp = () => {
  if (currentPath.value === '/') return;
  
  const segments = currentPath.value.split('/').filter(Boolean);
  segments.pop();
  currentPath.value = segments.length ? '/' + segments.join('/') + '/' : '/';
};

// 刷新当前目录
const refresh = () => {
  loadFiles();
};

// 处理搜索
const handleSearch = () => {
  // 搜索已经通过计算属性 filteredFiles 实现
};

// 处理行点击
const handleRowClick = (record) => {
  // 单击不再自动打开文件夹，只选中行
};

// 自定义行事件
const customRowEvents = (record) => {
  return {
    onClick: () => {
      // 单击事件已由 @row-click 处理
    },
    onDblclick: () => {
      // 双击事件处理
      if (record.isdir) {
        // 双击文件夹打开
        navigateTo(currentPath.value + record.server_filename + '/');
      } else if (isAudioFile(record)) {
        // 双击音频文件选中
        const index = selectedKeys.value.indexOf(record.fs_id);
        if (index === -1) {
          // 如果未选中，则选中
          selectedKeys.value = [record.fs_id];
        }
      }
    }
  };
};

// 处理行双击 (保留此函数以兼容可能的其他调用)
const handleRowDblClick = (record) => {
  if (record.isdir) {
    // 双击文件夹打开
    navigateTo(currentPath.value + record.server_filename + '/');
  } else if (isAudioFile(record)) {
    // 双击音频文件选中
    const index = selectedKeys.value.indexOf(record.fs_id);
    if (index === -1) {
      // 如果未选中，则选中
      selectedKeys.value = [record.fs_id];
    }
  }
};

// 处理选择变化
const onSelectionChange = (keys) => {
  selectedKeys.value = keys;
};

// 添加选中文件到播放列表
const addSelectedToPlaylist = () => {
  const selectedFiles = files.value.filter(file => 
    selectedKeys.value.includes(file.fs_id) && !file.isdir && isAudioFile(file)
  );
  
  addToPlaylist(selectedFiles);
};

// 切换到创建模式
const switchToCreateMode = () => {
  playlistModalMode.value = 'create';
  newPlaylistName.value = '';
  newPlaylistDescription.value = '';
};

// 切换到选择模式
const switchToSelectMode = () => {
  playlistModalMode.value = 'select';
  if (playlistStore.playlists.length > 0) {
    selectedPlaylistId.value = playlistStore.playlists[0].id;
  }
};

// 处理播放列表模态框确认
const handlePlaylistModalOk = async () => {
  if (playlistModalMode.value === 'select') {
    if (!selectedPlaylistId.value) {
      message.error('请选择一个播放列表');
      return;
    }
    
    // 使用选中的播放列表ID添加文件
    await processAddToPlaylist(selectedPlaylistId.value, filesToAddToPlaylist.value);
    showPlaylistModal.value = false;
  } else {
    // 创建新播放列表
    if (!newPlaylistName.value.trim()) {
      message.error('请输入播放列表名称');
      return;
    }
    
    try {
      // 创建新播放列表
      const newPlaylist = await playlistStore.createPlaylist(
        newPlaylistName.value.trim(),
        newPlaylistDescription.value.trim()
      );
      
      // 使用新创建的播放列表ID添加文件
      await processAddToPlaylist(newPlaylist.id, filesToAddToPlaylist.value);
      showPlaylistModal.value = false;
    } catch (error) {
      console.error('创建播放列表失败:', error);
      message.error('创建播放列表失败');
    }
  }
};

// 处理播放列表模态框取消
const handlePlaylistModalCancel = () => {
  showPlaylistModal.value = false;
  filesToAddToPlaylist.value = [];
};

// 添加文件到播放列表
const addToPlaylist = async (filesToAdd) => {
  if (!filesToAdd.length) return;
  
  try {
    const playlistId = props.playlistId || playlistStore.currentPlaylist?.id;
    
    if (!playlistId) {
      // 没有选中播放列表，显示播放列表选择/创建模态框
      filesToAddToPlaylist.value = filesToAdd;
      
      // 显示提示信息
      message.info('请选择一个播放列表或创建新的播放列表');
      
      // 初始化模态框状态
      if (playlistStore.playlists.length > 0) {
        playlistModalMode.value = 'select';
        selectedPlaylistId.value = playlistStore.playlists[0].id;
      } else {
        playlistModalMode.value = 'create';
        newPlaylistName.value = '';
        newPlaylistDescription.value = '';
      }
      
      showPlaylistModal.value = true;
      return;
    }
    
    // 有选中的播放列表，直接添加
    await processAddToPlaylist(playlistId, filesToAdd);
  } catch (error) {
    console.error('添加到播放列表失败:', error);
    message.error('添加到播放列表失败');
  }
};

// 处理添加文件到播放列表的核心逻辑
const processAddToPlaylist = async (playlistId, filesToAdd) => {
  if (!filesToAdd.length || !playlistId) return;
  
  try {
    // 显示加载状态
    const loadingKey = `adding_${Date.now()}`;
    message.loading({ content: '正在添加到播放列表...', key: loadingKey, duration: 0 });
    
    // 处理每个文件
    const tracks = [];
    for (const file of filesToAdd) {
      try {
        // 获取文件下载链接
        const downloadResponse = await window.electronAPI.baiduPan.getFileDownloadLink(file.fs_id);
        
        if (!downloadResponse.success) {
          console.error('获取下载链接失败:', downloadResponse.error);
          continue;
        }
        
        // 尝试获取歌词文件
        let lrcContent = '';
        try {
          const lrcResponse = await window.electronAPI.baiduPan.getLyricFile(file.server_filename);
          if (lrcResponse.success && lrcResponse.data) {
            const lrcContentResponse = await window.electronAPI.baiduPan.getLyricContent(lrcResponse.data.fs_id);
            if (lrcContentResponse.success) {
              lrcContent = lrcContentResponse.data;
            }
          }
        } catch (lrcError) {
          console.warn('获取歌词失败:', lrcError);
          // 获取歌词失败不影响添加歌曲
        }
        
        // 创建音轨对象
        tracks.push({
          id: file.fs_id,
          title: file.server_filename.replace(/\.[^/.]+$/, ''), // 移除扩展名
          artist: '', // 可以尝试从文件名解析
          album: '',
          duration: 0, // 实际播放时会更新
          path: downloadResponse.data, // 文件的下载链接
          cover: '', // 可以尝试获取专辑封面
          lrc: lrcContent,
          source: 'baiducloud',
          sourceData: {
            fs_id: file.fs_id,
            path: currentPath.value + file.server_filename
          }
        });
      } catch (fileError) {
        console.error(`处理文件 ${file.server_filename} 失败:`, fileError);
      }
    }
    
    // 添加到播放列表
    if (tracks.length > 0) {
      // 先添加歌曲到播放列表
      const updatedPlaylist = await playlistStore.addTracksToPlaylist(playlistId, tracks);
      
      // 添加成功后刷新所有播放列表数据，确保首页和详情页数据同步
      await playlistStore.fetchPlaylists();
      
      // 如果需要，刷新当前播放列表详情
      if (playlistId) {
        await playlistStore.fetchPlaylistDetail(playlistId);
      }
      
      message.success({ content: `已添加 ${tracks.length} 首歌曲到播放列表`, key: loadingKey });
      emit('files-added', tracks);
    } else {
      message.error({ content: '没有成功添加任何歌曲', key: loadingKey });
    }
    
    // 清除选择
    selectedKeys.value = [];
  } catch (error) {
    console.error('添加到播放列表失败:', error);
    message.error('添加到播放列表失败');
  }
};
</script>
