<template>
  <div class="artist-content">
    <span class="artist-number-index">{{ index + 1 }})</span>
    <div class="artist-title-wrapper">
      <img v-if="artist.image" :style="getWidthHeight" class="artist-cover" :src="artist.image.url" :alt="artist.name">
      <NoImage v-else type="track" class="artist-cover" :height="height" :width="width"/>
      <span class="artist-title">{{ artist.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Artist } from '@/types/custom';
import Loading from '@/components/loading/Loading.vue';
import NoImage from '@/components/no-image/NoImage.vue';
import { lengthNormalizer } from '@/utils/functions';

@Component({
  components: { NoImage, Loading },
})
export default class SmallArtist extends Vue {
  @Prop({ required: true }) artist!: Artist;

  @Prop({ required: true }) index!: number

  width = '50px';

  height = '50px'

  fixLength(toFixString: string, offset?: number) {
    return lengthNormalizer(toFixString, offset);
  }

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

  .artist-content {
    display: flex;
    flex-direction: row;
    align-items: center;

    .artist-number-index {
      margin-right: 2ch;
      width: 1ch;
    }

    .artist-title-wrapper {
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

      .artist-cover {
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
      .artist-title {
        width: 100%;
        text-align: left;
        &:hover {
          color: $color-sp-light-grey;
        }
      }
    }
    .artist-artists-wrapper {
      display: flex;
      flex-direction: column;
      min-width: 180px;
      max-width: 180px;

      .artist-artists {
        text-align: center;
        .artist-artist-link {
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
    .artist-content {

      .artist-title-wrapper {
        max-width: 250px;
        min-width: 250px;

        .artist-cover {
          width: 50px;
          height: 50px;
        }
        .artist-title {
          font-size: 1rem;
        }
      }
      .artist-artists-wrapper {
        display: flex;
        flex-direction: column;
        min-width: 120px;
        max-width: 120px;

        .artist-artists {
          .artist-artist-link {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
