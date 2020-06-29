<template>
  <div class="redirect">
    <div class="login-title" v-if="getIsLogged">¡Login satisfactorio!</div>
    <div class="login-title" v-if="!getIsLogged">Ha habido un problema</div>
    <div class="login-description">Volviendo al inicio...</div>
    <Loading></Loading>
  </div>
</template>

<script lang="ts">

import router from '@/router';
import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import Loading from '@/components/loading/Loading.vue';
import Constants from '@/utils/constants';

@Component({
  computed: {
    ...mapGetters('credentials', ['getIsLogged']),
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
    { accessToken, refreshToken, loginError }:
    { accessToken?: string; refreshToken?: string; loginError?: string }
  ) => void;

  mounted() {
    // TODO: Gestionar si hay algun error al logearse y que redirija al login logeado o no
    // https://blog.sqreen.com/authentication-best-practices-vue/

    this.storeLocalData({
      accessToken: Constants.accessToken,
      refreshToken: Constants.refreshToken,
      loginError: Constants.loginError,
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
