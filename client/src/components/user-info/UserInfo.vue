<template>
  <div class="content">
    <div class="data" v-if="contentLoaded">
      <p>Bienvenido {{ getUserInformation.display_name }}</p>
      <img v-if="getUserInformation.image" :src="getUserInformation.image" alt="profile">
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { UserProfile } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';

@Component({
  components: { Loading },
  computed: {
    ...mapGetters('user', ['getUserInformation']),
  },
  methods: {
    ...mapActions('user', ['queryUserInformation']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserInfo extends Vue {
  contentLoaded = false;

  getUserInformation!: UserProfile;

  queryUserInformation!: () => UserProfile;

  updateAccessToken!: () => UserProfile;

  async mounted() {
    if (!this.getUserInformation) {
      // await this.updateAccessToken();
      await this.queryUserInformation();
      this.contentLoaded = true;
    } else {
      this.contentLoaded = true;
    }
  }
}
</script>

<style lang="scss">
div.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .data {
    p {
      font-size: 1.5rem;
      margin-bottom: 4%;
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
