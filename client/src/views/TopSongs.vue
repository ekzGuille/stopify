<template>
  <div class="top-songs-wrapper">
    🎶💯
  </div>
</template>

<script lang="ts">
export default {
  name: 'TopSongs',
};
</script>

<style lang="scss">
@import '/../styles/_variables.scss';
div.top-songs-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - #{$header-height});
  width: 100%;
}
</style>
