<template>
  <div class="usr-saved-songs-content">
    <div class="usr-saved-songs-data" v-if="contentLoaded">
      <p class="usr-saved-songs-title">Estas son tus canciones guardadas</p>
      <p>Mostrando las
        <span class="usr-saved-songs-accent">
        {{ loadedSavedTracksAmount }}
        </span> canciones más recientes.
      </p>
      <p>Tienes <span class="usr-saved-songs-accent">{{ getUserSavedTracks.total }}</span> en total.</p>
      <div class="usr-saved-songs-load-more-wrapper">
        <!--
        <Button
          v-bind:class="{ 'usr-saved-songs-btn-load-more': loadingMore || this.maxPlaylist() }"
          font-size="0.8rem"
          padding="5px"
          width="130px"
          border="none"
          color="#00D66E"
          @click.native="loadMore()">
          {{ this.maxPlaylist() ? 'No tienes más para mostrar' : 'Cargar más' }}
        </Button>
         -->
        <Loading v-if="loadingMore"></Loading>
      </div>
      <div class="usr-saved-songs-wrapper">
        <!-- wip -->
        <SongTrack v-for="track of userSavedTracks" :key="track.id" :track="track"></SongTrack>
      </div>
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { TrackItem, UserSavedTracks } from '@/types/custom';
import Loading from '@/components/loading/Loading.vue';
import Button from '@/components/button/Button.vue';
import { QueryAPI } from '@/types/vuex';
import SongTrack from '@/components/track/SongTrack.vue';
import { wait } from '@/utils/functions';

@Component({
  components: { Button, Loading, SongTrack },
  computed: {
    ...mapGetters('user', ['getUserSavedTracks']),
  },
  methods: {
    ...mapActions('user', ['queryUserSavedTracks']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserSavedSongs extends Vue {
  contentLoaded = false;

  loadingMore = false;

  loadedSavedTracksAmount!: number;

  userSavedTracks!: TrackItem[];

  getUserSavedTracks!: UserSavedTracks;

  queryUserSavedTracks!: (attrs: QueryAPI) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  async mounted() {
    if (!this.getUserSavedTracks) {
      await this.updateAccessToken();
      await this.queryUserSavedTracks({});
      // this.contentLoaded = true;
    } else {
      // this.contentLoaded = true;
    }
    // NOTE: Es necesario el timeout?
    await wait(250);
    this.contentLoaded = true;
    this.updateValues();
  }

  async loadMore() {
    if (!this.loadingMore && !this.maxPlaylist()) {
      this.loadingMore = true;
      const queryOffset = this.getUserSavedTracks.limit + this.getUserSavedTracks.offset;
      await this.queryUserSavedTracks({ queryOffset });
      this.updateValues();
      this.loadingMore = false;
    }
  }

  updateValues() {
    this.loadedSavedTracksAmount = this.calculatePlaylistCount();
    this.userSavedTracks = this.getUserSavedTracks.items;
  }

  calculatePlaylistCount() {
    return this.maxPlaylist() ? this.getUserSavedTracks.total
      : (this.getUserSavedTracks.limit + this.getUserSavedTracks.offset);
  }

  maxPlaylist() { return (this.getUserSavedTracks.limit + this.getUserSavedTracks.offset) >= this.getUserSavedTracks.total; }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';
  .usr-saved-songs-content {
    margin: 2rem 0 0 0;
    display: flex;
    justify-content: center;
    width: 90%;
    .usr-saved-songs-data {

    }

    .usr-saved-songs-wrapper {
      width: 100%;
    }
  }

  @media (max-width: $breakpoint-tablet) {
  }
</style>
