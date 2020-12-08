<template>
  <div class="top-wrapper">
    <div class="top-chooser">
      ¿Qué quieres ver?
      <Toggle></Toggle>
      <FancyToggle></FancyToggle>
    </div>
    <div class="top-songs">
      Monstrando tus canciones más escuchadas
      <UserTopSongs></UserTopSongs>
    </div>
    <div class="top-artists">
      Mostrando tus artistas más escuchados
      <UserTopArtists></UserTopArtists>
    </div>
  </div>
</template>

<script lang="ts">

import UserTopSongs from '@/components/user-top-songs/UserTopSongs.vue';
import UserTopArtists from '@/components/user-top-artists/UserTopArtists.vue';
import Toggle from '@/components/toggle/Toggle.vue';
import FancyToggle from '@/components/toggle/FancyToggle.vue';

export default {
  name: 'TopSongs',
  components: { FancyToggle, Toggle, UserTopArtists, UserTopSongs },
  comments: {
    UserTopSongs,
    UserTopArtists,
    FancyToggle,
    Toggle
  }
};
// https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
</script>

<style lang="scss">
@import '/../styles/_variables.scss';
div.top-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - #{$header-height});
  width: 100%;
}
</style>
