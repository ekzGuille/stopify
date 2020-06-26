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

<style lang="scss" scoped>
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    div.not-found {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        &.error-title {
          font-size: 3rem;
        }
        &.error-descriptcion {
          font-size: 2rem;
        }
        height: 15vmax;
      }
    }
  }

</style>
