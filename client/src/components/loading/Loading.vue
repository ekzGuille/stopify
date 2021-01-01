<template>
  <div class="loading"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  div.loading {
    display: inline-block;
    border: 4px solid $color-sp-background-dark;
    border-left-color: $color-sp-accent-green;
    border-radius: 50%;
    width: $spinner-size;
    height: $spinner-size;
    animation: spin 1.5s cubic-bezier(0.15, 0.51, 0.74, 0.2) infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  // https://codepen.io/ekzGuille/pen/ExPmeop
</style>
