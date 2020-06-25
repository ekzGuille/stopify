<template>
  <div class="nav">
    <h3 @click="goToLogin" class="header-name">Stopify</h3>
    <Button font-size="0.8rem" padding="8px" width="120px"></Button>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import Button from '../button/Button.vue';

@Component({
  components: {
    Button,
  },
  methods: {
    async goToLogin() {
      if (router.currentRoute.name !== 'Home') {
        await router.push({ name: 'Home' });
      }
    },
  },
})

export default class Header extends Vue {
}

</script>

<style lang="scss">
  @import './../../variables/_variables.scss';

  div.nav {
    position: absolute;
    background-color: $color-sp-grey;
    height: 65px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      background-color: $color-sp-grey;

      &.header-name:hover {
        cursor: pointer;
      }
    }
  }
</style>
