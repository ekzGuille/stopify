<template>
  <div class="usr-pl-content">
    <div class="usr-pl-data" v-if="contentLoaded">
      <p class="usr-pl-title">Playlists recientes</p>
      <p>Mostrando las
        <span class="usr-pl-accent">
        {{ loadedPlaylistAmount }}
        </span> playlists más recientes.
      </p>
      <p>Tienes <span class="usr-pl-accent">{{ getUserPlaylists.total }}</span> en total.</p>
      <div class="usr-pl-load-more-wrapper">
        <Button
          v-bind:class="{ 'usr-pl-btn-load-more': loadingMore || this.maxPlaylist() }"
          font-size="0.8rem"
          padding="5px"
          width="130px"
          border="none"
          color="#00D66E"
          @click.native="loadMore()">
          Cargar más
        </Button>
        <Loading v-if="loadingMore"></Loading>
      </div>
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
import { Item, UserPlaylist } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';
import Playlist from '@/components/user-playlists/Playlist.vue';
import Button from '@/components/button/Button.vue';
import { QueryPlaylistAttributes } from '@/types/vuex';

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

  loadingMore = false;

  loadedPlaylistAmount!: number;

  userPlaylists!: Item[];

  getUserPlaylists!: UserPlaylist;

  queryUserPlaylists!: (attrs: QueryPlaylistAttributes) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  async mounted() {
    if (!this.getUserPlaylists) {
      await this.updateAccessToken();
      await this.queryUserPlaylists({ userId: this.userId });
      this.contentLoaded = true;
    } else {
      this.contentLoaded = true;
    }
    this.updateValues();
  }

  async loadMore() {
    if (!this.loadingMore && !this.maxPlaylist()) {
      this.loadingMore = true;
      const queryOffset = this.getUserPlaylists.limit + this.getUserPlaylists.offset;
      await this.queryUserPlaylists({ userId: this.userId, queryOffset });
      this.updateValues();
      this.loadingMore = false;
    }
  }

  updateValues() {
    this.loadedPlaylistAmount = this.calculatePlaylistCount();
    this.userPlaylists = this.getUserPlaylists.items;
  }

  calculatePlaylistCount() {
    return this.maxPlaylist() ? this.getUserPlaylists.total : (this.getUserPlaylists.limit + this.getUserPlaylists.offset);
  }

  maxPlaylist() { return (this.getUserPlaylists.limit + this.getUserPlaylists.offset) >= this.getUserPlaylists.total; }
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

    .usr-pl-load-more-wrapper {
      position: relative;
      height: $spinner-size * 2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 2.5% 0 0 0;

      .usr-pl-btn-load-more {
        color: rgba(0, 214, 110, 0.5);
        cursor: default;

        &:hover {
          transform: scale(1);
        }

        &:active {
          transform: scale(1);
        }
      }

      .loading {
        position: absolute;
      }
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

      .usr-pl-load-more-wrapper {
        margin: 4% 0 0 0;
      }
    }
  }
}
</style>
