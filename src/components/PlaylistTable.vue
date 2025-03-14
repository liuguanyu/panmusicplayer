<template>
  <div class="h-full flex flex-col" :class="{ 'dark': isDarkMode }">
    <!-- 表格工具栏 -->
    <div class="flex justify-between items-center p-2 border-b border-[var(--border-color)]">
      <div class="flex gap-2 items-center">
        <a-button 
          type="primary" 
          size="small"
          @click="playSelected"
          :disabled="!hasSelected"
        >
          <template #icon><CaretRightOutlined /></template>
          播放选中
        </a-button>
        
        <a-button 
          type="default" 
          size="small"
          @click="removeSelected"
          :disabled="!hasSelected"
        >
          <template #icon><DeleteOutlined /></template>
          移除选中
        </a-button>
      </div>
      
      <div class="flex gap-2 items-center">
        <a-input-search
          v-model:value="searchText"
          placeholder="搜索歌曲"
          size="small"
          class="w-[200px]"
          @search="onSearch"
        />
      </div>
    </div>
    
    <!-- 表格 -->
    <a-table
      :dataSource="filteredTracks"
      :columns="columns"
      :pagination="false"
      :rowSelection="rowSelection"
      :rowKey="record => record.id"
      :scroll="{ y: tableHeight }"
      size="small"
      :loading="loading"
    >
      <!-- 序号列 -->
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          <div class="flex justify-center items-center">
            <span v-if="record.id !== currentTrackId">{{ index + 1 }}</span>
            <sound-outlined v-else class="text-[var(--primary-color)] animate-pulse" />
          </div>
        </template>
        
        <!-- 标题列 -->
        <template v-if="column.dataIndex === 'title'">
          <div class="flex flex-col">
            <div class="font-medium" :class="{ 'text-[var(--primary-color)]': record.id === currentTrackId }">
              {{ formatName(record.title) || getFileNameFromPath(record.path) }}
            </div>
            <div class="text-xs opacity-70 truncate">
              {{ record.path }}
            </div>
          </div>
        </template>
        
        <!-- 时长列 -->
        <template v-if="column.dataIndex === 'duration'">
          {{ formatDuration(record.duration) }}
        </template>
        
        <!-- 操作列 -->
        <template v-if="column.dataIndex === 'actions'">
          <div class="flex justify-center gap-1">
            <a-button 
              type="text" 
              size="small"
              @click="playTrack(record)"
            >
              <template #icon><CaretRightOutlined /></template>
            </a-button>
            
            <a-dropdown :trigger="['click']">
              <a-button 
                type="text" 
                size="small"
              >
                <template #icon><EllipsisOutlined /></template>
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="removeTrack(record)">
                    <delete-outlined />
                    从列表中移除
                  </a-menu-item>
                  <a-menu-item @click="copyPath(record)">
                    <copy-outlined />
                    复制文件路径
                  </a-menu-item>
                  <a-menu-item @click="showFileInfo(record)">
                    <info-circle-outlined />
                    文件信息
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </template>
      
      <!-- 空状态 -->
      <template #emptyText>
        <div class="flex flex-col items-center justify-center p-8 gap-4">
          <inbox-outlined class="text-3xl opacity-50" />
          <p>播放列表为空</p>
          <a-button type="primary" @click="$emit('add-files')">
            添加音频文件
          </a-button>
        </div>
      </template>
    </a-table>
    
    <!-- 文件信息弹窗 -->
    <a-modal
      v-model:open="fileInfoVisible"
      title="文件信息"
      :footer="null"
      width="500px"
    >
      <div v-if="selectedFileInfo">
        <a-descriptions bordered size="small" :column="1">
          <a-descriptions-item label="文件名">
            {{ getFileNameFromPath(selectedFileInfo.path) }}
          </a-descriptions-item>
          <a-descriptions-item label="路径">
            {{ selectedFileInfo.path }}
          </a-descriptions-item>
          <a-descriptions-item label="标题">
            {{ formatName(selectedFileInfo.title) || '未知' }}
          </a-descriptions-item>
          <a-descriptions-item label="艺术家">
            {{ selectedFileInfo.artist || '未知' }}
          </a-descriptions-item>
          <a-descriptions-item label="专辑">
            {{ selectedFileInfo.album || '未知' }}
          </a-descriptions-item>
          <a-descriptions-item label="时长">
            {{ formatDuration(selectedFileInfo.duration) }}
          </a-descriptions-item>
          <a-descriptions-item label="文件大小">
            {{ formatFileSize(selectedFileInfo.size) }}
          </a-descriptions-item>
          <a-descriptions-item label="文件类型">
            {{ selectedFileInfo.type || getFileExtension(selectedFileInfo.path) }}
          </a-descriptions-item>
          <a-descriptions-item label="采样率" v-if="selectedFileInfo.sampleRate">
            {{ selectedFileInfo.sampleRate }} Hz
          </a-descriptions-item>
          <a-descriptions-item label="比特率" v-if="selectedFileInfo.bitrate">
            {{ Math.round(selectedFileInfo.bitrate / 1000) }} kbps
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { 
  CaretRightOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  SoundOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  InboxOutlined
} from '@ant-design/icons-vue';
import { useSettingsStore } from '@/stores/settings';
import { formatName } from '@/utils/format';

// 定义props
const props = defineProps({
  tracks: {
    type: Array,
    default: () => []
  },
  currentTrackId: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: 400
  }
});

// 定义emit
const emit = defineEmits([
  'play', 
  'remove', 
  'add-files',
  'selection-change'
]);

// 获取设置
const settingsStore = useSettingsStore();
const isDarkMode = computed(() => settingsStore.isDarkMode);

// 状态
const selectedRowKeys = ref([]);
const searchText = ref('');
const fileInfoVisible = ref(false);
const selectedFileInfo = ref(null);

// 表格高度
const tableHeight = computed(() => props.height - 50); // 减去工具栏高度

// 表格列定义
const columns = [
  {
    title: '#',
    dataIndex: 'index',
    width: 50,
    align: 'center'
  },
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true
  },
  {
    title: '艺术家',
    dataIndex: 'artist',
    width: 150,
    ellipsis: true
  },
  {
    title: '专辑',
    dataIndex: 'album',
    width: 150,
    ellipsis: true
  },
  {
    title: '时长',
    dataIndex: 'duration',
    width: 80,
    align: 'right'
  },
  {
    title: '操作',
    dataIndex: 'actions',
    width: 80,
    align: 'center'
  }
];

// 表格选择配置
const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys) => {
    selectedRowKeys.value = keys;
    emit('selection-change', keys);
  }
};

// 计算属性
const hasSelected = computed(() => selectedRowKeys.value.length > 0);

// 过滤后的曲目列表
const filteredTracks = computed(() => {
  if (!searchText.value) {
    return props.tracks;
  }
  
  const search = searchText.value.toLowerCase();
  return props.tracks.filter(track => {
    return (
      (track.title && track.title.toLowerCase().includes(search)) ||
      (track.artist && track.artist.toLowerCase().includes(search)) ||
      (track.album && track.album.toLowerCase().includes(search)) ||
      getFileNameFromPath(track.path).toLowerCase().includes(search)
    );
  });
});

// 从路径中获取文件名
const getFileNameFromPath = (path) => {
  if (!path) return '未知文件';
  return path.split('/').pop() || path.split('\\').pop() || path;
};

// 获取文件扩展名
const getFileExtension = (path) => {
  if (!path) return '';
  const fileName = getFileNameFromPath(path);
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : '';
};

// 格式化时长
const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) {
    return '--:--';
  }
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes)) {
    return '未知';
  }
  
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
};

// 搜索
const onSearch = () => {
  // 搜索已经通过计算属性实现
};

// 播放选中曲目
const playSelected = () => {
  if (selectedRowKeys.value.length === 0) return;
  
  // 找到第一个选中的曲目
  const trackToPlay = props.tracks.find(track => track.id === selectedRowKeys.value[0]);
  if (trackToPlay) {
    playTrack(trackToPlay);
  }
};

// 移除选中曲目
const removeSelected = () => {
  if (selectedRowKeys.value.length === 0) return;
  
  emit('remove', selectedRowKeys.value);
  selectedRowKeys.value = [];
};

// 播放曲目
const playTrack = (track) => {
  emit('play', track);
};

// 移除曲目
const removeTrack = (track) => {
  emit('remove', [track.id]);
};

// 复制文件路径
const copyPath = (track) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(track.path)
      .then(() => {
        message.success('文件路径已复制到剪贴板');
      })
      .catch(() => {
        message.error('复制失败');
      });
  } else {
    // 兼容方案
    const textarea = document.createElement('textarea');
    textarea.value = track.path;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      message.success('文件路径已复制到剪贴板');
    } catch (err) {
      message.error('复制失败');
    }
    
    document.body.removeChild(textarea);
  }
};

// 显示文件信息
const showFileInfo = (track) => {
  selectedFileInfo.value = track;
  fileInfoVisible.value = true;
};

// 监听当前曲目变化，自动滚动到当前播放的曲目
watch(() => props.currentTrackId, (newId) => {
  if (!newId) return;
  
  nextTick(() => {
    // 找到当前播放的曲目元素
    const currentRow = document.querySelector(`tr[data-row-key="${newId}"]`);
    if (currentRow) {
      currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// 生命周期钩子
onMounted(() => {
  // 初始化
});
</script>
