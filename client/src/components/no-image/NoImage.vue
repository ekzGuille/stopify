<template>
  <div class="no-image-cover">
    <div class="no-image-song" v-if="type === 'track'">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
           stroke-width="0.5" fill="none"
           stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    </div>
    <div class="no-image-user" v-if="type === 'user'">
      <svg viewBox="0 0 24 24"
           width="24" height="24" stroke="currentColor" stroke-width="0.5"
           fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class NoImage extends Vue {
  @Prop() type!: 'track' | 'user';
}
</script>

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

.no-image-song {
  margin: 0 auto 4px;
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

.no-image-user {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: $color-sp-grey;

  svg {
    width: 7rem;
    height: 7rem;
    stroke: $color-sp-stroke-light-grey;
  }
}

@media (max-width: $breakpoint-tablet) {
  .no-image-user {
    width: 150px;
    height: 150px;

    svg {
      width: 5rem;
      height: 5rem;
    }
  }
}
</style>
