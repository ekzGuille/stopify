<template>
  <div class="login-btn" :style="cssVariables">Iniciar sesión</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  computed: {
    cssVariables() {
      return {
        '--font-size': this.$props.fontSize,
        '--padding': this.$props.padding,
        '--width': this.$props.width,
      };
    },
  },
})
export default class LoginButton extends Vue {
  @Prop({ default: '1.1rem' }) fontSize!: string;

  @Prop({ default: '12px' }) padding!: string;

  @Prop({ default: '180px' }) width!: string;
}
</script>

<style lang="scss" scoped>
@import './../../variables/_variables.scss';

.login-btn {
  text-transform: uppercase;
  background-color: $color-sp-light-green;
  font-weight: bold;
  border-radius: 500px;
  font-size: var(--font-size);
  padding: var(--padding);
  width: var(--width);
}

.login-btn:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.1s ease-in-out;
}
</style>
