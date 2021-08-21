<template>
  <div class="not-found">
    <div class="error-title">Ooops😳</div>
    <div class="error-description">aquí no hay nada...</div>
    <Button
      font-size="1.1rem"
      padding="12px"
      width="200px"
      bg-color="#1db954"
      @click.native="goHome()">
      Volver al home
    </Button>
  </div>
</template>

<script lang="ts">
import Button from '@/components/button/Button.vue';
import { goHome as redirectHome } from '@/utils/functions/routes';

export default {
  name: 'not-found-route',
  components: {
    Button,
  },
  methods: {
    goHome() {
      return redirectHome();
    },
  },
};
</script>

<style lang="scss" scoped>
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
