<template>
  <div class="content">
    <div class="data" v-if="contentLoaded">
      <p>Hola {{ getUserInformation.display_name }}

      </p>
      <div class="profile-image-wrapper">
        <img class="profile" v-if="getUserInformation.image" :src="getUserInformation.image" alt="profile">
        <img
          class="flag"
          :src="`https://www.countryflags.io/${getUserInformation.country}/flat/64.png`"
          :alt="getUserInformation.country">
      </div>
      <p class="open-sp-wrapper">Ver en
        <a :href="getUserInformation.spotifyProfileUrl" target="_blank" class="spotify">Spotify</a>
      </p>
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

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

div.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .data {
    p {
      font-size: 1.5rem;
      margin-bottom: 4%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .profile-image-wrapper {
      position: relative;
      img {
        &.profile {
          border-radius: 50%;
        }
        &.flag {
          width: 30px;
          background: transparent;
          position: absolute;
          bottom: 0;
          /*right: 0;*/
          right: calc(20%);
          border-radius: 0;
        }
      }
    }
    p.open-sp-wrapper {
      margin-top: 4%;
      font-size: 1.5rem;
      display: block;
      text-decoration: none;
      a {
        text-decoration: none;
        &.spotify {
          color: $color-sp-accent-green;
        }
      }
    }
  }
}
</style>
