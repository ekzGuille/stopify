<template>
  <div class="home-wrapper">
    <main>
      <div v-if="!isLogged" class="home-no-logged">
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
      <div v-if="isLogged" class="home-logged">
        <UserSavedSongs></UserSavedSongs>
      </div>
    </main>
  </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
import UserSavedSongs from '@/components/user-saved-songs/UserSavedSongs.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Button,
    UserSavedSongs,
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
.home-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: scroll;
  height: calc(100% - #{$header-height});
  /*overflow: hidden; // TODO: Quitar dependiendo del contenido a albergar*/

    .home-no-logged {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 1.8rem;
      margin: 5% 0;
    }
  }
  .home-logged {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
