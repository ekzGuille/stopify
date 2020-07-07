<template>
  <div class="usr-pl-content">
    <div class="usr-pl-data" v-if="contentLoaded">
      <p class="usr-pl-title">Playlists recientes</p>
      <p>Mostrando las
        <span class="usr-pl-accent">
        {{ getUserPlaylists.limit > getUserPlaylists.total ? getUserPlaylists.total : getUserPlaylists.limit }}
        </span> playlists más recientes.
      </p>
      <p>Tienes <span class="usr-pl-accent">{{ getUserPlaylists.total }}</span> en total.</p>
      <Button
        class="usr-pl-btn-load-more"
        font-size="0.8rem"
        padding="5px"
        width="130px"
        border="none"
        color="#00D66E"
        :action="loadMore">
        Cargar más
      </Button>
      <div class="usr-pl-playlist-wrapper">
        <Playlist v-for="playlist of userPlaylists" :key="playlist.id" :playlist="playlist"></Playlist>
        <div class="usr-pl-playlist-wrapper-scroll">
        </div>
      </div>
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { Item, UserPlaylist, UserProfile } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';
import Playlist from '@/components/user-playlists/Playlist.vue';
import Button from '@/components/button/Button.vue';

@Component({
  components: { Button, Loading, Playlist },
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

  userPlaylists!: Item[];

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
    this.userPlaylists = this.getUserPlaylists.items;
  }

  loadMore() {
    console.log('Cargar más...');
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
  width: 100%;
  div.usr-pl-data {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p.usr-pl-title {
      font-size: 2rem;
    }
    p {
      span.usr-pl-accent {
        color: $color-sp-accent-green;
      }
    }
    .usr-pl-btn-load-more {
      margin: 2.5% 0 0 0;
    }
    div.usr-pl-playlist-wrapper {
      /*margin: 2% 0 0 0;*/
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      height: 70vh;
      overflow: scroll;
      overflow-x: hidden;
      justify-content: center;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  div.usr-pl-content {
    width: auto;
    div.usr-pl-data {
      width: auto;
      p.usr-pl-title {
        font-size: 1.5rem;
      }
      div.usr-pl-playlist-wrapper {
        /*margin: 2% 0 0 0;*/
        display: flex;
        flex-wrap: nowrap;
        height: auto;
        justify-content: center;
        flex-direction: column;
      }
      .usr-pl-btn-load-more {
        margin: 10% 0 0 0;
      }
    }
  }
}
</style>
