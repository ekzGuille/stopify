<template>
  <div class="home">
    <main>
      <div class="content">
        <span>Inicia sesión para disfurtar de todas las características</span>
        <Button></Button>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/button/Button.vue';

export default {
  name: 'Home',
  components: {
    Button,
  },
};
// https://class-component.vuejs.org/guide/class-component.html
</script>

<style lang="scss" scoped>

main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

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
