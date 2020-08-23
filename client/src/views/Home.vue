<template>
  <div class="home">
    <main>
      <div v-if="!isLogged" class="no-logged">
        <span>Inicia sesión para disfrutar de todas las características</span>
        <Button
          font-size="1.1rem"
          padding="12px"
          width="200px"
          bg-color="#1db954"
          @click.native="logIn()">
          Iniciar sesión
        </Button>
      </div>
      <div v-if="isLogged" class="content">
        Bienvenido
      </div>
    </main>
  </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Button,
  },
  computed: {
    ...mapState('credentials', ['isLogged']),
  },
  methods: {
    ...mapActions('credentials', ['logIn']),
  },
};
</script>

<style lang="scss">
@import '/../styles/_variables.scss';
div.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: scroll;
  height: calc(100% - #{$header-height});
  /*overflow: hidden; // TODO: Quitar dependiendo del contenido a albergar*/

    div.no-logged {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 1.8rem;
      margin: 5% 0;
    }
  }
}
</style>
