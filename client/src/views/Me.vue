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
  div.me-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*height: 100%;*/
    width: 100%;
  }
</style>
