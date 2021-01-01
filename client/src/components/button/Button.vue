<template>
  <button
    class="login-btn"
   :style="cssVariables">
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() fontSize!: string;

  @Prop() padding!: string;

  @Prop() width!: string;

  @Prop() bgColor!: string;

  @Prop() border!: string;

  @Prop() color!: string;

  get cssVariables() {
    return {
      '--font-size': this.fontSize,
      '--padding': this.padding,
      '--width': this.width,
      '--bg-color': this.bgColor,
      '--color': this.color,
      '--border': this.border,
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

.login-btn {
  text-transform: uppercase;
  background-color: var(--bg-color);
  font-weight: bold;
  border-radius: 500px;
  color: var(--color);
  border: var(--border);
  font-size: var(--font-size);
  padding: var(--padding);
  width: var(--width);

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: all 0.1s ease-in-out;
  }

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease-in-out;
  }

  &:focus {
    outline: 0;
  }
}

</style>
