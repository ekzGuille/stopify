<template>
  <div class="wrapper">
    <div class="content">👨🏻‍💻</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Me',
};
</script>

<style lang="scss" scoped>
  div.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    div.content {
      font-size: 4rem;
    }
  }
</style>
