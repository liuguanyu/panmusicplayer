<template>
  <div class="fixed bottom-0 left-0 right-0 h-20 bg-player-background border-t border-border-color z-100">
    <div class="flex h-full items-center px-4">
      <div class="flex-1 min-w-300px">
        <player-controls />
      </div>
      <div class="flex-1 flex justify-center">
        <player-cover />
      </div>
      <div class="flex-1 flex justify-end">
        <player-playlist />
      </div>
    </div>
  </div>
</template>

<script setup>
import PlayerControls from '@/components/player/PlayerControls.vue';
import PlayerCover from '@/components/player/PlayerCover.vue';
import PlayerPlaylist from '@/components/player/PlayerPlaylist.vue';
</script>

<!-- 使用UnoCSS替代了传统样式 -->
