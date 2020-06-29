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
  @import '../../variables/_variables.scss';

  div.loading {
    display: inline-block;
    /*border: 4px solid rgb(230, 230, 230);*/
    border: 4px solid $color-sp-light-grey;
    border-left-color: $color-sp-accent-green;
    border-radius: 50%;
    // width: 30px;
    // height: 30px;
    width: 30px !important;
    height: 30px !important;
    animation: spin 1.5s linear infinite;
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
