<template>
  <div class="home">
    <main>
      <div class="content">
        <span>Inicia sesión para disfurtar de todas las características</span>
        <LoginButton></LoginButton>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginButton from '@/components/login-button/LoginButton.vue';

export default {
  name: 'Home',
  components: {
    LoginButton,
  },
};
// https://class-component.vuejs.org/guide/class-component.html
</script>

<style lang="scss" scoped>

main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 92vh;

  div.content {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 1.8rem;
      margin: 5% 0;
    }
  }
}
</style>
