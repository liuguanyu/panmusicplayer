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
                v-else-if="isAudioFile(record)" 
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
      
      <div class="actions">
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
  }
});

// 定义emit
const emit = defineEmits(['filesAdded']);

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
  if (!searchQuery.value) return files.value;
  
  const query = searchQuery.value.toLowerCase();
  return files.value.filter(file => 
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
  if (record.isdir) {
    navigateTo(currentPath.value + record.server_filename + '/');
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

// 添加文件到播放列表
const addToPlaylist = async (filesToAdd) => {
  if (!filesToAdd.length) return;
  
  try {
    const playlistId = props.playlistId || playlistStore.currentPlaylist?.id;
    
    if (!playlistId) {
      message.error('请先选择一个播放列表');
      return;
    }
    
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
      playlistStore.addTracksToPlaylist(playlistId, tracks);
      message.success({ content: `已添加 ${tracks.length} 首歌曲到播放列表`, key: loadingKey });
      emit('filesAdded', tracks);
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

<style scoped>
/* 可以添加一些自定义样式 */
</style>
