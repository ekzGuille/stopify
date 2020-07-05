<template>
  <div class="usr-pl-content">
    <div class="usr-pl-data" v-if="contentLoaded">
      <p>Mostrando las <span class="usr-pl-accent">{{ getUserPlaylists.limit }}</span> playlists más recientes.</p>
      <p>Tienes <span class="usr-pl-accent">{{ getUserPlaylists.total }}</span> totales.</p>
      <div class="usr-pl-playlist-wrapper">
        <Playlist v-for="playlist of getUserPlaylists.items" :key="playlist.id" :play-list="playlist"></Playlist>
      </div>
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { UserPlaylist, UserProfile } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';
import Playlist from '@/components/user-playlists/Playlist.vue';

@Component({
  components: { Loading, Playlist },
  computed: {
    ...mapGetters('user', ['getUserPlaylists']),
  },
  methods: {
    ...mapActions('user', ['queryUserPlaylists']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserPlaylists extends Vue {
  @Prop({ required: true }) userId!: string;

  contentLoaded = false;

  getUserPlaylists!: UserPlaylist;

  queryUserPlaylists!: (userId: string) => UserProfile;

  updateAccessToken!: () => UserProfile;

  async mounted() {
    if (!this.getUserPlaylists) {
      await this.updateAccessToken();
      await this.queryUserPlaylists(this.userId);
      this.contentLoaded = true;
    } else {
      this.contentLoaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  div.usr-pl-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      span.usr-pl-accent {
        color: $color-sp-accent-green;
      }
    }
    div.usr-pl-playlist-wrapper {
      display: flex;
      /*flex-direction: row;*/
      flex-direction: column;
    }
  }
</style>
