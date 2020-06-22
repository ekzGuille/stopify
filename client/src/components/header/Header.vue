<template>
  <div class="nav">
    hola
    <Login></Login>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '../login/Login.vue';

@Component({
  components: {
    Login,
  },
})
export default class Header extends Vue {
}

</script>

<style lang="scss">
@import './../../variables/_variables.scss';

.nav {
  background-color: $color-sp-grey;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
