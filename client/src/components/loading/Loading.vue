<template>
  <div class="loading"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

  @Component
export default class Search extends Vue {

}

</script>

<style lang="scss">
  .loading {
    display: inline-block;
    border: 4px solid rgb(230, 230, 230);
    border-left-color: #7983ff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: donut-spin 1.2s linear infinite;
  }

  @keyframes donut-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  // https://codepen.io/ekzGuille/pen/ExPmeop

</style>
