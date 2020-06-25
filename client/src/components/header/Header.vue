<template>
  <div class="nav">
    <h3 @click="goToLogin" class="header-name">Stopify</h3>
    <Button v-if="!isLogged" font-size="0.8rem" padding="8px" width="120px"></Button>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Button from '../button/Button.vue';

@Component({
  components: {
    Button,
  },
  computed: mapState('userCredentials', ['accessToken', 'getRefreshToken', 'isLogged']),
})

export default class Header extends Vue {
  isLogged!: boolean;

  async goToLogin() {
    if (router.currentRoute.name !== 'Home') {
      await router.push({ name: 'Home' });
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './../../variables/_variables.scss';

  div.nav {
    position: absolute;
    background-color: $color-sp-grey;
    height: 65px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > *{
      margin: 0 4% 0 4%;
    }

    h3 {
      background-color: $color-sp-grey;

      &.header-name:hover {
        cursor: pointer;
      }
    }
  }
</style>
