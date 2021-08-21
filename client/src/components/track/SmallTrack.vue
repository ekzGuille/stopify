<template>
  <div class="track-content">
    <span class="track-number-index">{{ index + 1 }})</span>
    <a :href="track.url" target="_blank" class="track-title-wrapper" rel="noopener noreferrer">
      <img v-if="track.image" :style="getWidthHeight" class="track-cover" :src="track.image.url" :alt="track.name">
      <NoImage v-else class="track-cover" type="track" :height="height" :width="width"/>
      <span class="track-title">{{ track.name }}</span>
    </a>
<!--    <div class="track-artists-wrapper">-->
<!--      <div class="track-artists" v-for="artist in track.artists" :key="artist.id">-->
<!--       <a class="track-artist-link"-->
<!--          :href="artist.external_urls.spotify"-->
<!--          target="_blank"-->
<!--          :title="artist.name"-->
<!--          rel="noopener noreferrer">{{ fixLength(artist.name, 25) }}</a>-->
<!--      </div>-->
<!--    </div>-->
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
export default class SmallTrack extends Vue {
  @Prop({ required: true }) track!: TrackItem;

  @Prop({ required: true }) index!: number;

  fixLength(toFixString: string, offset?: number) {
    return lengthNormalizer(toFixString, offset);
  }

  width = '50px';

  height = '50px';

  get getWidthHeight() {
    return {
      '--width': this.width,
      '--height': this.height,
    };
  }
}

</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  .track-content {
    display: flex;
    flex-direction: row;
    align-items: center;

    .track-number-index {
      margin-right: 2ch;
      width: 1ch;
    }

    .track-title-wrapper {
      text-decoration: none;
      margin: 1.5%;
      max-width: 500px;
      min-width: 500px;
      font-size: 1rem;
      display: flex;
      justify-content: left;
      flex-direction: row;
      align-items: center;
      word-break: break-word;
      &:hover {
        color: $color-sp-accent-green;
      }

      .track-cover {
        margin-right: 1rem;
        width: var(--width);
        height: var(--height);
        min-width: var(--width);
        min-height: var(--height);
        object-fit: cover;
        transition: transform 250ms;
        &:hover {
          transform: scale(1.08);
        }
      }
      .track-title {
        width: 100%;
        text-align: left;
        &:hover {
          color: $color-sp-light-grey;
        }
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
        max-width: 250px;
        min-width: 250px;

        .track-title {
          font-size: 1rem;
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
