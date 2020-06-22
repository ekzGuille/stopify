<template>
  <div class="home">
    <Header></Header>
    <main>
      <div class="content">
        <span>Inicia sesión para disfurtar de todas las características</span>
        <Login></Login>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/Header.vue';
import Login from '@/components/login/Login.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Login,
  },
};
// https://class-component.vuejs.org/guide/class-component.html
</script>

<style lang="scss" scoped>

main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;

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
