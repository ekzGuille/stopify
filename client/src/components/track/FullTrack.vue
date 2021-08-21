<template>
  <div class="track-content">
    <a :href="track.url" target="_blank" class="track-title-wrapper" rel="noopener noreferrer">
      <img v-if="track.image" class="track-cover" :src="track.image.url" :alt="track.name">
      <NoImage v-else type="track"/>
      <span class="track-title">{{ fixLength(track.name) }}</span>
    </a>
    <div class="track-artists-wrapper">
      <div class="track-artists" v-for="artist in track.artists" :key="artist.id">
       <a class="track-artist-link"
          :href="artist.external_urls.spotify"
          target="_blank"
          :title="artist.name"
          rel="noopener noreferrer">{{ fixLength(artist.name, 25) }}</a>
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
export default class FullTrack extends Vue {
  @Prop({ required: true }) track!: TrackItem;

  fixLength(toFixString: string, offset?: number) {
    return lengthNormalizer(toFixString, offset);
  }
}

</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  .track-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem;

    .track-title-wrapper {
      text-decoration: none;
      margin: 2%;
      max-width: 350px;
      min-width: 350px;
      font-size: 1.1rem;
      display: flex;
      justify-content: left;
      flex-direction: row;
      align-items: center;
      word-break: break-word;
      &:hover {
        color: $color-sp-accent-green;
      }

      .track-cover {
        margin-right: 2rem;
        width: 80px;
        object-fit: cover;
        transition: transform 250ms;
        &:hover {
          transform: scale(1.08);
        }
      }
      .track-title {
        width: 100%;
        text-align: center;
      }
    }
    .track-artists-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 180px;
      max-width: 180px;

      .track-artists {
        text-align: center;
        .track-artist-link {
          font-size: 0.8rem;
          width: 100%;
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

  @media (max-width: $breakpoint-tablet) {
    .track-content {

      .track-title-wrapper {
        max-width: 200px;
        min-width: 200px;

        .track-title {
          font-size: 0.85rem;
        }
      }
      .track-artists-wrapper {
        display: flex;
        flex-direction: column;
        min-width: 120px;
        max-width: 120px;

        .track-artists {
          .track-artist-link {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
