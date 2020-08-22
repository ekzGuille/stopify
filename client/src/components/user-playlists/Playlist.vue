<template>
  <div class="playlist-content">
    <a :href="playlist.url" target="_blank" class="playlist-pl-title">
      <img v-if="playlist.image" class="playlist-cover" :src="playlist.image.url" :alt="playlist.name">
      <NoImage
        v-if="!playlist.image"
        type="song"
      ></NoImage>
      {{ playlist.name }}
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Item } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';
import NoImage from '@/components/no-image/NoImage.vue';

@Component({
  components: { NoImage, Loading },
})
export default class UserPlaylists extends Vue {
  @Prop({ required: true }) playlist!: Item;
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  div.playlist-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;

    a.playlist-pl-title {
      text-decoration: none;
      margin-top: 4%;
      width: 180px;
      word-break: break-word;
      &:hover {
        color: $color-sp-accent-green;
      }

      img.playlist-cover {
        width: 180px;
        height: 180px;
        object-fit: cover;
      }
    }
  }
</style>
