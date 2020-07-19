<template>
<div class="not-found">
  <div class="error-title">Ooops😳</div>
  <div class="error-descriptcion">aquí no hay nada...</div>
</div>
</template>

<script lang="ts">
export default {
  name: 'NotFound',
};
</script>

<style lang="scss">
  div.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    div {
      margin: 1%;
      &.error-title {
        font-size: 3rem;
      }
      &.error-descriptcion {
        font-size: 2rem;
      }
    }
  }
</style>
