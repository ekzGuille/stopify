<template>
  <div class="me-wrapper">
    <UserInfo></UserInfo>
  </div>
</template>

<script lang="ts">
import UserInfo from '@/components/user-info/UserInfo.vue';

export default {
  name: 'Me',
  components: {
    UserInfo,
  },
};
</script>

<style lang="scss">
@import '/../styles/_variables.scss';
div.me-wrapper {
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: calc(100% - #{$header-height});
  width: 100%;
}

@media (max-width: $breakpoint-tablet) {
  div.me-wrapper {
    overflow: scroll;
  }
}

</style>
