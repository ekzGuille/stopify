<template>
  <div id="app">
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->

    <Header></Header>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
  },
  methods: {
    ...mapActions('userCredentials', ['storeIsLogged']),
  },
};
</script>

<style lang="scss">
@import './variables/_variables.scss';

@font-face {
  font-family: "CircularStd-Medium";
  src: url("./assets/fonts/CircularStd-Medium.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/CircularStd-Medium.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
    url("./assets/fonts/CircularStd-Medium.otf") format("opentype"), /* Open Type Font */
    url("./assets/fonts/CircularStd-Medium.svg") format("svg"), /* Legacy iOS */
    url("./assets/fonts/CircularStd-Medium.ttf") format("truetype"), /* Safari, Android, iOS */
    url("./assets/fonts/CircularStd-Medium.woff") format("woff"), /* Modern Browsers */
    url("./assets/fonts/CircularStd-Medium.woff2") format("woff2"); /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
}

* {
  background-color: $color-sp-background-dark;
  color: $color-white;
  font-family: CircularStd-Medium, Helvetica Neue, Helvetica,
  Arial, Hiragino Kaku Gothic Pro, Meiryo,MS Gothic, sans-serif;
  margin: 0;
  padding: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-vue-dark;
  width: 100vw;
  height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $color-vue-dark;

    &.router-link-exact-active {
      color: $color-vue-green;
    }
  }
}
</style>
