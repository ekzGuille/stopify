<template>
  <div class="toggle" @click="$emit('clicked', checked)" :class="{ 'toggle-checked': checked }">
    <div class="toggle-thumb"></div>
  </div>
</template>

<script lang="ts">
// Credit to https://github.com/CodingGarden/twitch-bot/blob/master/client/src/components/Toggle.vue
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Toggle extends Vue {
  @Prop() checked!: boolean;
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  .toggle {
    --height: 24px;
    width: calc(var(--height) * 2);
    display: inline-block;
    background: $color-sp-grey;
    border-radius: calc(var(--height) * 0.5);
    cursor: pointer;
    &-thumb {
      width: var(--height);
      height: var(--height);
      background: transparent;
      box-sizing: border-box;
      background: $color-sp-light-grey;
      border-radius: 50%;
      transition: 150ms transform, 100ms background;
    }
    &.toggle-checked {
      background: $color-sp-light-green;
      .toggle-thumb {
        border: 0;
        background: $color-white;
        transform: translateX(var(--height));
      }
    }
  }
</style>
