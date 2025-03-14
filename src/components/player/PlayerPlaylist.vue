<template>
  <div class="bg-white/50 dark:bg-black/20 rounded-lg overflow-hidden">
    <div class="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
      <h3 class="font-medium">当前播放列表</h3>
      <div class="flex items-center">
        <a-select 
          v-model:value="playMode" 
          size="small" 
          style="width: 120px"
          @change="changePlayMode"
        >
          <a-select-option value="sequence">顺序播放</a-select-option>
          <a-select-option value="loop">单曲循环</a-select-option>
          <a-select-option value="random">随机播放</a-select-option>
        </a-select>
      </div>
    </div>
    
    <div class="h-64 overflow-y-auto">
      <a-list item-layout="horizontal" :data-source="currentPlaylist">
        <template #renderItem="{ item, index }">
          <a-list-item 
            :class="{ 'bg-primary/10': currentTrackIndex === index }"
            @click="playTrack(index)"
          >
            <a-list-item-meta>
              <template #title>
                <div class="flex items-center">
                  <sound-outlined v-if="currentTrackIndex === index && isPlaying" class="mr-2 text-primary" />
                  <span :class="{ 'text-primary': currentTrackIndex === index }">
                    {{ formatName(item.name) }}
                  </span>
                </div>
              </template>
              <template #description>
                <span>{{ item.artist || '未知艺术家' }}</span>
              </template>
            </a-list-item-meta>
            <template #extra>
              <a-button 
                type="text" 
                size="small"
                @click.stop="removeFromPlaylist(index)"
              >
                <delete-outlined />
              </a-button>
            </template>
          </a-list-item>
        </template>
      </a-list>
      
      <div v-if="!currentPlaylist.length" class="h-full flex justify-center items-center text-gray-400">
        <div class="text-center">
          <sound-outlined class="text-4xl mb-2" />
          <p>播放列表为空</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { 
  SoundOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue';
import { usePlayerStore } from '@/stores/player';
import { formatName } from '@/utils/format';

const playerStore = usePlayerStore();

// 状态
const currentPlaylist = computed(() => playerStore.playlist);
const currentTrackIndex = computed(() => {
  if (!playerStore.currentTrack || !playerStore.playlist.length) return -1;
  return playerStore.playlist.findIndex(track => track.id === playerStore.currentTrack.id);
});
const isPlaying = computed(() => playerStore.isPlaying);
const playMode = computed({
  get: () => playerStore.playMode,
  set: (value) => playerStore.setPlayMode(value)
});

// 播放控制
const playTrack = (index) => {
  if (index >= 0 && index < playerStore.playlist.length) {
    playerStore.play(playerStore.playlist[index]);
  }
};

const removeFromPlaylist = (index) => {
  if (index >= 0 && index < playerStore.playlist.length) {
    playerStore.removeFromPlaylist(playerStore.playlist[index].id);
  }
};

const changePlayMode = (value) => {
  playerStore.setPlayMode(value);
};
</script>

<!-- 使用UnoCSS替代了传统样式 -->
