<template>
  <div class="audio-player">
    <div class="audio-player-container">
      <div class="player-controls">
        <player-controls />
      </div>
      <div class="player-info">
        <player-cover />
      </div>
      <div class="player-playlist">
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

<style lang="less" scoped>
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: var(--player-background);
  border-top: 1px solid var(--border-color);
  z-index: 100;
  
  &-container {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 16px;
  }
  
  .player-controls {
    flex: 1;
    min-width: 300px;
  }
  
  .player-info {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  
  .player-playlist {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
