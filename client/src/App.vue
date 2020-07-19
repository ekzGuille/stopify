<template>
  <div id="app">
    <!--    TODO: Remove-->
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

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({
    vh: 0,
  }),
  mounted() {
    // HACK: Fixes mobile resizing when hiding navigation bar
    this.vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${this.vh}px`);

    /**
     * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
     */
    const resizeEvent = () => {
      const vh = window.innerHeight * 0.01;
      this.vh = vh;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.removeEventListener('resize', resizeEvent);
    window.addEventListener('resize', resizeEvent);
  },
};
</script>

<style lang="scss">
@import 'styles/_variables.scss';

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
  font-family: CircularStd-Medium, Helvetica Neue, Helvetica,
  Arial, Hiragino Kaku Gothic Pro, Meiryo,MS Gothic, sans-serif;
  color: $color-white;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  -moz-user-select: none;
  -webkit-user-select: none;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  background-color: $color-sp-background-dark;
  overflow: hidden;
  /*position: fixed;*/
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-vue-dark;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: $color-sp-light-green;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: $color-sp-accent-green;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
