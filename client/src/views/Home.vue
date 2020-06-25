<template>
  <div class="home">
    <main>
      <div v-if="isLogged" class="content">
        <h2>WIP</h2>
          <img src="https://media.giphy.com/media/4oHyOIBIt57ag/giphy.gif" alt="wip"
             srcset="https://media.giphy.com/media/4oHyOIBIt57ag/giphy.gif">
      </div>
      <div v-if="!isLogged" class="no-logged">
        <span>Inicia sesión para disfurtar de todas las características</span>
        <Button></Button>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/button/Button.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Button,
  },
  methods: {
    ...mapMutations('userCredentials', ['setLogged']),
    getUser() {
      // console.log('getting user...');
    },
  },
  computed: mapState('userCredentials', ['isLogged']),
  mounted() {
    this.getUser();
    // console.log(`Usuario loggeado: ${this.isLogged}`);
  },
};
// https://class-component.vuejs.org/guide/class-component.html
</script>

<style lang="scss" scoped>

main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

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
