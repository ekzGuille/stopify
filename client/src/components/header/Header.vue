<template>
  <div class="nav">
    <h3 @click="goHome" class="header-name">Stopify</h3>
    <div v-if="getIsLogged" class="header-content">
      <router-link class="header-item" to="/top">
        Mi top
      </router-link>
      <router-link class="header-item" to="/me">
        Perfil
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button
        v-if="getIsLogged"
        font-size="0.8rem"
        padding="8px"
        width="120px"
        border="2px solid #fff"
        text-value="Cerrar sesión"
        :action="makeLogout"
      ></Button>
      <Button
        v-if="!getIsLogged"
        font-size="0.8rem"
        padding="8px" width="120px"
        bg-color="#1db954"
        text-value="Iniciar sesión"
        :action="makeLogin"
      ></Button>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { login } from '@/api';
import Button from '../button/Button.vue';

@Component({
  components: {
    Button,
  },
  computed: {
    ...mapGetters('userCredentials', ['getIsLogged']),
  },
  methods: {
    ...mapActions('userCredentials', ['logOut']),
  },
})
export default class Header extends Vue {
  logOut!: () => void;

  async goHome() {
    if (router.currentRoute.name !== 'Home') {
      await router.push({ name: 'Home' });
    }
  }

  makeLogin() {
    login();
  }

  makeLogout() {
    this.logOut();
  }
}

</script>

<style lang="scss" scoped>
  @import './../../variables/_variables.scss';
  * {
    background-color: $color-sp-grey;
  }

  div.nav {
    position: absolute;
    height: 65px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
        text-shadow: 0px 0px 5px $color-black;

        &:hover {
          cursor: pointer;
        }
      }
      a.router-link-exact-active {
        font-weight: bold;
        color: $color-sp-accent-green;
      }
    }

    h3.header-name {
      &:hover {
        cursor: pointer;
      }
    }

  .button-wrapper {
    min-width: 130px;
  }

  .button-wrapper, .header-name {
    margin: 0 4%;
  }
}

</style>
