<template>
  <div class="redirect">
    <div class="login-title" v-if="getIsLogged">¡Login satisfactorio!</div>
    <div class="login-title" v-if="!getIsLogged">Ha habido un problema</div>
    <div class="login-description">Volviendo al inicio...</div>
  </div>
</template>

<script lang="ts">

import router from '@/router';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters('userCredentials', ['getIsLogged']),
  },
  methods: {
    ...mapActions('userCredentials', ['storeAccessToken', 'storeRefreshToken', 'storeIsLogged']),
  },
})
export default class Redirect extends Vue {
  storeAccessToken!: (_: string) => void;

  storeRefreshToken!: (_: string) => void;

  storeIsLogged!: (_: boolean) => void;

  getUrlAndStore(key: string, vuexSetter: Function, alias?: string) {
    const storeData = new URLSearchParams(window.location.search).get(key) || 'null';
    localStorage.removeItem(alias || key);
    localStorage.setItem(alias || key, storeData);
    vuexSetter(storeData);
  }

  mounted() {
    // TODO: Gestionar si hay algun error al logearse y que redirija al login logeado o no
    // https://blog.sqreen.com/authentication-best-practices-vue/

    this.getUrlAndStore('access_token', this.storeAccessToken);
    this.getUrlAndStore('refresh_token', this.storeRefreshToken);
    this.getUrlAndStore('login_error', (data: null | boolean) => {
      this.storeIsLogged(!!data);
    });

    setTimeout(async () => {
      if (router.currentRoute.name !== 'Home') {
        await router.push({ name: 'Home' });
      }
    }, 1000);
  }
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

        &.login-description {
          font-size: 2rem;
        }

        height: 15vmax;
      }
    }
  }

</style>
