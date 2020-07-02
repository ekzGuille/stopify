<template>
  <div class="redirect">
    <div class="login-title" v-if="isLogged">¡Login satisfactorio!</div>
    <div class="login-title" v-if="!isLogged">No se ha podido hacer el login</div>
    <div class="login-description">Volviendo al inicio...</div>
    <Loading></Loading>
  </div>
</template>

<script lang="ts">

import router from '@/router';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import Loading from '@/components/loading/Loading.vue';
import Constants from '@/utils/constants';
import { VuexLocalStorage } from '@/utils/types';

@Component({
  computed: {
    ...mapState('credentials', ['isLogged']),
  },
  methods: {
    ...mapActions('credentials', ['storeLocalData']),
  },
  components: {
    Loading,
  },
})
export default class Redirect extends Vue {
  storeLocalData!: (
    {
      accessToken, refreshToken, loginError, expiresIn, lastRefresh,
    }: VuexLocalStorage) => void;

  mounted() {
    // https://blog.sqreen.com/authentication-best-practices-vue/

    this.storeLocalData({
      accessToken: Constants.accessToken,
      refreshToken: Constants.refreshToken,
      loginError: Constants.loginError,
      expiresIn: Constants.expiresIn,
      lastRefresh: Constants.lastTokenRefresh,
    });

    setTimeout(async () => {
      if (router.currentRoute.name !== 'Home') {
        await router.push({ name: 'Home' });
      }
    }, 1500);
  }
}
</script>

<style lang="scss" scoped>
  div.redirect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    div {
      margin: 1%;
      &.login-title {
        font-size: 3rem;
      }

      &.login-description {
        font-size: 2rem;
      }
    }
  }
</style>
