<template>
  <div class="fancy-toggle" :style="cssVariables">
    <input
      :checked="getChecked"
      type="checkbox"
      :id="id"
      @click="emitClick"/>
    <label :for="id">Toggle</label>
  </div>
</template>

<script lang="ts">
// Credit to: https://codepen.io/mburnette/pen/LxNxNg
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class FancyToggle extends Vue {
  @Prop() checked!: boolean;

  @Prop() id!: string;

  @Prop({ default: '24px' }) size!: string;

  @Prop({ default: '2px' }) spacing!: string;

  get cssVariables() {
    return {
      '--size': this.size,
      '--spacing': this.spacing,
    };
  }

  get getChecked() {
    return this.checked;
  }

  emitClick() {
    this.$emit('clicked', !this.getChecked);
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  .fancy-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: calc(var(--size) * 2);
    height: var(--size);
    background: $color-sp-light-green;
    // background: $color-blue; // TODO Revisar
    // background: $color-sp-grey;
    display: block;
    border-radius: var(--size);
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: var(--spacing);
      left: var(--spacing);
      width: calc(var(--size) - calc(var(--spacing) * 2));
      height: calc(var(--size) - calc(var(--spacing) * 2));
      // background: $color-sp-light-grey;
      background: $color-white;
      border-radius: calc(var(--size) - calc(var(--spacing) * 2));
      transition: 0.3s;
    }
    &:active:after {
      width: var(--size);
    }
  }

  input:checked + label {
    background: $color-sp-light-green;

    &:after {
      background: $color-white;
      left: calc(100% - var(--spacing));
      transform: translateX(-100%);
    }
  }

</style>
