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

<style lang="scss" scoped>
@import '/../styles/_variables.scss';
div.me-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  height: calc(100% - #{$header-height});
  width: 100%;
}
</style>
