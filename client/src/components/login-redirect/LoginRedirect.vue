<template>
  <div class="rdr-redirect">
    <div class="rdr-login-title" v-if="isLogged">¡Login satisfactorio!</div>
    <div class="rdr-login-title" v-else>No se ha podido hacer el login</div>
    <div class="rdr-login-description">Volviendo al inicio...</div>
    <Loading v-if="queryData"/>
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';
import Loading from '@/components/loading/Loading.vue';
import { UserCredentials } from '@/utils/constants';
import { VuexLocalStorage } from '@/types/vuex';
import { goTop } from '@/utils/functions/routes';
import { UserProfile } from '@/types/custom';
import { wait } from '@/utils/functions';

@Component({
  computed: {
    ...mapState('credentials', ['isLogged']),
    ...mapGetters('user', ['getUserInformation']),
  },
  methods: {
    ...mapActions('credentials', ['storeLocalData', 'updateAccessToken']),
    ...mapActions('user', ['queryUserInformation']),
  },
  components: {
    Loading,
  },
})
export default class Redirect extends Vue {
  storeLocalData!: ({
    accessToken,
    refreshToken,
    loginError,
    expiresIn,
    lastRefresh,
  }: VuexLocalStorage) => void;

  queryData = true;

  getUserInformation!: UserProfile;

  queryUserInformation!: () => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  async mounted() {
    this.storeLocalData({
      accessToken: UserCredentials.accessToken,
      refreshToken: UserCredentials.refreshToken,
      loginError: UserCredentials.loginError,
      expiresIn: UserCredentials.expiresIn,
      lastRefresh: UserCredentials.lastTokenRefresh,
    });

    if (!this.getUserInformation) {
      await this.updateAccessToken();
      await this.queryUserInformation();
      await wait(1000);
    } else {
      await wait(1500);
    }
    await goTop();
    this.queryData = false;
  }
}
</script>

<style lang="scss" scoped>
  div.rdr-redirect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    div {
      margin: 1%;
      &.rdr-login-title {
        font-size: 3rem;
      }

      &.rdr-login-description {
        font-size: 2rem;
      }
    }
  }
</style>
