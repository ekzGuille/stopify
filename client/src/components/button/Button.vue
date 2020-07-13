<template>
  <div
    class="login-btn"
   :style="cssVariables"
    @click="action">
    <slot/>
  </div>
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

  @Prop() action!: Function;

  get cssVariables() {
    return {
      '--font-size': this.$props.fontSize,
      '--padding': this.$props.padding,
      '--width': this.$props.width,
      '--bg-color': this.$props.bgColor,
      '--color': this.color,
      '--border': this.$props.border,
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
}

.login-btn:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.1s ease-in-out;
}

.login-btn:active {
  transform: scale(0.98);
  transition: all 0.1s ease-in-out;
}
</style>
