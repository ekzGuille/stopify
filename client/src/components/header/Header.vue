<template>
  <header>
    <h3 @click="clickHome()" class="header-name">Stopify</h3>
    <div v-if="isLogged" class="header-content">
      <router-link class="header-item" to="/top">
        Mi top
      </router-link>
      <router-link class="header-item" to="/me">
        Perfil
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button
        v-if="isLogged"
        font-size="0.8rem"
        padding="8px"
        width="150px"
        border="2px solid #fff"
        @click.native="logout()">
        Cerrar sesión
      </Button>
      <Button
        v-else
        font-size="0.8rem"
        padding="8px"
        width="150px"
        bg-color="#1db954"
        @click.native="logIn()">
        Iniciar sesión
      </Button>
    </div>
  </header>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import { goHome } from '@/utils/functions/routes';
import Button from '@/components/button/Button.vue';

@Component({
  components: {
    Button,
  },
  computed: {
    ...mapState('credentials', ['isLogged']),
  },
  methods: {
    ...mapActions('credentials', ['logOut', 'logIn']),
  },
})
export default class Header extends Vue {
  logOut!: () => void;

  async logout() {
    this.logOut();
    await goHome();
    await router.go(0);
  }

  clickHome() {
    goHome();
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

header {
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-sp-grey;

  * {
    margin: 0 1%;
  }

  .header-content {
    margin: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    a {
      text-decoration: none;
      color: $color-white;
      text-shadow: 0 0 5px $color-black;

      &:hover {
        cursor: pointer;
      }
    }
    .router-link-exact-active {
      font-weight: bold;
      color: $color-sp-accent-green;
    }
  }

  .header-name {
    &:hover {
      cursor: pointer;
    }
  }

  .button-wrapper, .header-name {
    margin: 0 4%;
  }
}
</style>
