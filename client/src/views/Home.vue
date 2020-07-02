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
          :action="logIn">
          Iniciar sesión
        </Button>
      </div>
      <div v-if="isLogged" class="content">
        <UserInfo></UserInfo>
        <h2>WIP</h2>
          <img src="https://media.giphy.com/media/4oHyOIBIt57ag/giphy.gif" alt="wip"
             srcset="https://media.giphy.com/media/4oHyOIBIt57ag/giphy.gif">
      </div>
    </main>
  </div>
</template>

<script>
import Button from '@/components/button/Button.vue';
import { mapState, mapActions } from 'vuex';
import UserInfo from '@/components/user-info/UserInfo.vue';

export default {
  name: 'Home',
  components: {
    UserInfo,
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

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

    div.content {
      //TODO: Borrrar
      img {
        margin: 5%;
        width: 80%;
      }
    }

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
