<template>
  <div class="playlist-content">
    <div class="playlist-data">
      <img class="playlist-cover" :src="playList.image.url" :alt="playList.name">
      <p class="playlist-pl-title">{{ playList.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';

@Component({
  components: { Loading },
})
export default class UserPlaylists extends Vue {
  @Prop({ required: true }) playList!: Item;
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  div.playlist-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div.playlist-data {
      margin: 2rem;
      display: flex;
      flex-direction: column;
      img.playlist-cover {
        width: 200px;
      }
    }
  }
</style>
