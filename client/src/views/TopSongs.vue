<template>
  <div class="wrapper">
    <div class="content">🎶💯</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TopSongs',
};
</script>

<style lang="scss" scoped>
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    div.wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        &.content {
          font-size: 4rem;
        }
        height: 15vmax;
      }
    }
  }

</style>
