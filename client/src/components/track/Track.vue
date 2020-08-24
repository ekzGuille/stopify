<template>
  <div class="track-content">
    <a :href="track.url" target="_blank" class="track-title-wrapper" rel="noopener noreferrer">
      <img v-if="track.image" class="track-cover" :src="track.image.url" :alt="track.name">
      <NoImage
        v-if="!track.image"
        type="track"
      ></NoImage>
      <span class="track-title">{{ fixLength(track.name) }}</span>
    </a>
    <div class="track-artists-wrapper">
      <div class="track-artists" v-for="artist of track.artists" :key="artist.id">
       <a class="track-artist-link"
          :href="artist.external_urls.spotify"
          target="_blank"
          rel="noopener noreferrer">{{ artist.name }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TrackItem } from '@/types/custom';
import Loading from '@/components/loading/Loading.vue';
import NoImage from '@/components/no-image/NoImage.vue';
import { lengthNormalizer } from '@/utils/functions';

  @Component({
    components: { NoImage, Loading },
  })
export default class UserPlaylists extends Vue {
    @Prop({ required: true }) track!: TrackItem;

    fixLength(toFixString: string) {
      return lengthNormalizer(toFixString);
    }
}

</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  div.track-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2rem;

    a.track-title-wrapper {
      text-decoration: none;
      margin: 2%;
      max-width: 300px;
      min-width: 300px;
      font-size: 1.1rem;
      display: flex;
      justify-content: left;
      flex-direction: row;
      align-items: center;
      word-break: break-word;
      &:hover {
        color: $color-sp-accent-green;
      }

      img.track-cover {
        margin-right: 2rem;
        width: auto;
        height: 80px;
        object-fit: cover;
      }
      .track-title {
        justify-content: left;
      }
    }
    .track-artists-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 120px;
      max-width: 120px;

      .track-artists {
        .track-artist-link {
          font-size: 0.8rem;
          display: flex;
          justify-content: left;
          text-decoration: none;
          margin: 0 2%;
          color: $color-sp-stroke-light-grey;
          &:hover {
            color: $color-white;
          }
        }
      }
    }
  }
</style>
