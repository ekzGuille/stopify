<template>
  <NotFoundRoute/>
</template>

<script lang="ts">

import NotFoundRoute from '@/components/not-found-route/NotFoundRoute.vue';

export default {
  name: 'NotFound',
  components: {
    NotFoundRoute,
  },
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
      &.error-description {
        font-size: 2rem;
      }
    }
  }
</style>
