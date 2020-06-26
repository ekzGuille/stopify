<template>
  <div class="nav">
    <h3 @click="goToLogin" class="header-name">Stopify</h3>
    <div v-if="getIsLogged" class="header-content">
      <router-link class="header-item" to="/top">
        Mi top
      </router-link>
      <router-link class="header-item" to="/me">
        Perfil
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button v-if="!getIsLogged" font-size="0.8rem" padding="8px" width="120px"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import Button from '../button/Button.vue';

@Component({
  components: {
    Button,
  },
  computed: {
    ...mapGetters('userCredentials', ['getIsLogged']),
  },
})
export default class Header extends Vue {
  async goToLogin() {
    if (router.currentRoute.name !== 'Home') {
      await router.push({ name: 'Home' });
    }
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

      &:hover {
        cursor: pointer;
      }
      a {
        text-decoration: none;
        color: $color-white;
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
