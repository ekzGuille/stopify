<template>
  <div class="login-btn">Login</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
@import './../../variables/_variables.scss';

.login-btn {
  text-transform: uppercase;
  background-color: $color-sp-light-green;
  font-weight: bold;
  border-radius: 500px;
  // TODO: parametrizar estas propiedades por props
  font-size: 1.1rem;
  padding: 12px;
  width: 110px;
}

.login-btn:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.1s ease-in-out;
}
</style>
