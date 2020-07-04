<template>
  <header>
    <h3 @click="goHome" class="header-name">Stopify</h3>
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
        :action="logout">
        Cerrar sesión
      </Button>
      <Button
        v-if="!isLogged"
        font-size="0.8rem"
        padding="8px"
        width="150px"
        bg-color="#1db954"
        :action="logIn">
        Iniciar sesión
      </Button>
    </div>
  </header>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import Button from '../button/Button.vue';

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

  async goHome() {
    if (router.currentRoute.name !== 'Home') {
      await router.push({ name: 'Home' });
    }
  }

  async logout() {
    this.logOut();
    await this.goHome();
    await router.go(0);
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';
  * {
    background-color: $color-sp-grey;
  }

  header {
    position: absolute;
    height: 65px;
    width: 100%;
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
        text-shadow: 0 0 5px $color-black;

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

  .button-wrapper, .header-name {
    margin: 0 4%;
  }
}
</style>
