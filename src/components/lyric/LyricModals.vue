<template>
  <div class="lyric-modals">
    <!-- 歌词同步偏移调整对话框 -->
    <a-modal
      v-model:open="syncOffsetModalVisible"
      title="调整歌词同步"
      @ok="saveSyncOffset"
      okText="保存"
      cancelText="取消"
    >
      <div class="sync-offset-form">
        <p>调整歌词同步偏移量（毫秒）：</p>
        <a-input-number
          v-model:value="tempSyncOffset"
          :min="-10000"
          :max="10000"
          :step="100"
        />
        <p class="sync-offset-hint">
          正值：歌词提前显示，负值：歌词延后显示
        </p>
      </div>
    </a-modal>
    
    <!-- 歌词编辑对话框 -->
    <a-modal
      v-model:open="lyricEditModalVisible"
      title="编辑歌词"
      width="80%"
      @ok="saveLyricEdits"
      okText="保存"
      cancelText="取消"
    >
      <div class="lyric-edit-container">
        <a-textarea
          v-model:value="editableLyricText"
          :rows="20"
          placeholder="在此编辑歌词..."
        />
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { message } from 'ant-design-vue';

// 定义 props
const props = defineProps({
  syncOffset: {
    type: Number,
    default: 0
  },
  lyricsText: {
    type: String,
    default: ''
  }
});

// 定义事件
const emit = defineEmits([
  'update:syncOffset',
  'update:lyricsText',
  'save-sync-offset',
  'save-lyric-edits'
]);

// 响应式状态
const syncOffsetModalVisible = ref(false);
const tempSyncOffset = ref(props.syncOffset);
const lyricEditModalVisible = ref(false);
const editableLyricText = ref(props.lyricsText);

// 监听 props 变化
watch(() => props.syncOffset, (newValue) => {
  tempSyncOffset.value = newValue;
});

watch(() => props.lyricsText, (newValue) => {
  editableLyricText.value = newValue;
});

// 方法
function openSyncOffsetModal() {
  tempSyncOffset.value = props.syncOffset;
  syncOffsetModalVisible.value = true;
}

function saveSyncOffset() {
  emit('update:syncOffset', tempSyncOffset.value);
  emit('save-sync-offset', tempSyncOffset.value);
  syncOffsetModalVisible.value = false;
  message.success('同步偏移已保存');
}

function openLyricEditModal() {
  editableLyricText.value = props.lyricsText;
  lyricEditModalVisible.value = true;
}

function saveLyricEdits() {
  emit('update:lyricsText', editableLyricText.value);
  emit('save-lyric-edits', editableLyricText.value);
  lyricEditModalVisible.value = false;
  message.success('歌词已更新');
}

// 导出方法供父组件调用
defineExpose({
  openSyncOffsetModal,
  openLyricEditModal
});
</script>

<style lang="less" scoped>
.sync-offset-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  p {
    margin-bottom: 16px;
  }
  
  .sync-offset-hint {
    margin-top: 12px;
    font-size: 12px;
    color: var(--inactive-color);
  }
}

.lyric-edit-container {
  width: 100%;
}
</style>
