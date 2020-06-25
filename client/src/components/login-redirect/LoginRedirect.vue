<template>
  <div class="redirect">
    <div class="login-title">¡Login satisfactorio!</div>
    <div class="login-descriptcion">Volviendo al inicio...</div>
  </div>
</template>

<script lang="ts">

import router from '@/router';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  mounted() {
    setTimeout(async () => {
      if (router.currentRoute.name !== 'Home') {
        await router.push({ name: 'Home' });
      }
    }, 1000);
  },
})
export default class Redirect extends Vue {
// TODO: Obtener el token y almacenarlo
}
</script>

<style lang="scss" scoped>
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    div.redirect {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        &.login-title {
          font-size: 3rem;
        }
        &.login-descriptcion {
          font-size: 2rem;
        }
        height: 8vmax;
      }
    }
  }

</style>
