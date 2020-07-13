<template>
  <div class="playlist-content">
    <a :href="playlist.url" target="_blank" class="playlist-pl-title">
      <img v-if="playlist.image" class="playlist-cover" :src="playlist.image.url" :alt="playlist.name">
      <div class="playlist-no-cover" v-if="!playlist.image">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
             stroke-width="0.5" fill="none"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
      {{ playlist.name }}
    </a>
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
      }
      .playlist-no-cover  {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 180px;
        background: $color-sp-grey;

        svg {
          width: 4rem;
          height: 4rem;
          stroke: $color-sp-stroke-light-grey;
        }
      }
    }
  }
</style>
