<template>
  <input :checked="checked" type="checkbox" id="switch" @click="$emit('clicked', checked)" /><label for="switch">Toggle</label>
</template>

<script lang="ts">
  // Credit to: https://codepen.io/mburnette/pen/LxNxNg
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class FancyToggle extends Vue {
    @Prop() checked!: boolean;
  };
</script>

<style lang="scss" scoped>
  // TODO: Change colors
  input[type=checkbox] {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 200px;
    height: 100px;
    background: grey;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  input:checked + label {
    background: #bada55;
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 130px;
  }
</style>
