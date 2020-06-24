<template>
  <div class="nav">
    <h3>Stopify</h3>
    <LoginButton font-size="0.8rem" padding="8px" width="120px"></LoginButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginButton from '../login-button/LoginButton.vue';

@Component({
  components: {
    LoginButton,
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
  }
}
</style>
