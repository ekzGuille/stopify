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
  };
</script>

<style lang="scss" scoped>
  // TODO: Change colors
  .toggle {
    --height: 24px;
    width: calc(var(--height) * 2);
    display: inline-block;
    background: hsl(0, 0%, 18%);
    border-radius: calc(var(--height) * 0.5);
    cursor: pointer;
    &-thumb {
      width: var(--height);
      height: var(--height);
      background: transparent;
      box-sizing: border-box;
      border: 3px solid hsl(0, 0%, 28%);
      border-radius: 50%;
      transition: 150ms transform, 100ms background;
    }
    &.toggle-checked .toggle-thumb {
      border: 0;
      background: hsl(121, 43%, 54%);
      transform: translateX(var(--height));
    }
  }
</style>
