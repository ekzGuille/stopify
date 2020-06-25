<template>
  <div class="redirect">
    <div class="login-title" v-if="isLogged">¡Login satisfactorio!</div>
    <div class="login-title" v-else>Ha habido un problema</div>
    <div class="login-description">Volviendo al inicio...</div>
  </div>
</template>

<script lang="ts">

import router from '@/router';
import { Vue, Component } from 'vue-property-decorator';
import {
  mapState, mapActions, mapGetters, mapMutations,
} from 'vuex';

@Component({
  computed: mapState('userCredentials', ['accessToken', 'refreshToken', 'isLogged']),
  methods: mapMutations('userCredentials', ['setAccessToken', 'setRefreshToken', 'setLogged']),
})
export default class Redirect extends Vue {
  accessToken!: string;

  refreshToken!: string;

  isLogged!: boolean;

  setAccessToken!: (_: string) => void;

  setRefreshToken!: (_: string) => void;

  setLogged!: (_: boolean) => void;

  getUrlAndStore(key: string, expectedType: 'boolean' | 'string', vuexSetter: Function) {
    let storeData;
    if (expectedType === 'string') {
      storeData = new URLSearchParams(window.location.search).get(key);
    } else if (expectedType === 'boolean') {
      storeData = !new URLSearchParams(window.location.search).get(key);
    }
    localStorage.removeItem(key);
    if (storeData) {
      localStorage.setItem(key, storeData.toString());
      vuexSetter(storeData);
    }
  }

  mounted() {
    // TODO: Gestionar si hay algun error al logearse y que redirija al login logeado o no
    // https://blog.sqreen.com/authentication-best-practices-vue/

    this.getUrlAndStore('access_token', 'string', this.setAccessToken);
    this.getUrlAndStore('refresh_token', 'string', this.setRefreshToken);
    this.getUrlAndStore('login_error', 'boolean', this.setLogged);

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
