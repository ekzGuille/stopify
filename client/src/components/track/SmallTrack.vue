<template>
  <div class="track-content">
    <span class="track-number-index">{{ index + 1 }})</span>
    <a :href="track.url" target="_blank" rel="noopener noreferrer">
      <img v-if="track.image" :style="getWidthHeight" class="track-cover" :src="track.image.url" :alt="track.name">
      <NoImage v-else class="track-cover" type="track" :height="height" :width="width"/>
    </a>
    <div class="track-title-wrapper">
      <a :href="track.url" target="_blank" class="track-title" rel="noopener noreferrer">
        {{ track.name }}
      </a>
      <div class="track-artists-wrapper">
        <span class="track-artists" v-for="(artist, i) in track.artists" :key="artist.id">
         <a class="track-artist-link"
            :href="artist.external_urls.spotify"
            target="_blank"
            :title="artist.name"
            rel="noopener noreferrer">{{ fixLength(artist.name, 25) }}</a>
          <span class="track-artists-separator" v-if="i !== track.artists.length - 1">,</span>
        </span>
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
    width: 100%;
    display: flex;
    margin: 0.8%;
    flex-direction: row;
    align-items: center;

    .track-number-index {
      margin-right: 2ch;
      width: 1ch;
    }
    .track-title-wrapper {
      margin: 1.5%;
      width: 100%;
      font-size: 1rem;
      text-align: left;
      &:hover {
        color: $color-sp-accent-green;
      }
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
      font-size: 1.1rem;
      text-decoration: none;
      width: 100%;
      display: block;
      text-align: left;
      &:hover {
        color: $color-sp-light-grey;
      }
    }
    .track-artists-wrapper {
      display: inline;
      width: 100%;
      .track-artists {
        text-align: center;
        .track-artist-link {
          display: inline;
          font-size: 0.8rem;
          width: 100%;
          text-decoration: none;
          color: $color-sp-stroke-light-grey;
          &:hover {
            color: $color-white;
          }
        }
        &-separator {
          margin-right: 1%;
        }
      }
    }
  }

  @media (max-width: $breakpoint-tablet) {
    .track-title {
      font-size: 1rem;
    }
  }
</style>
