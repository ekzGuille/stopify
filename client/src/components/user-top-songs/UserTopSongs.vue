<template>
  <div class="usr-top-songs-content">
    <div class="usr-top-songs-data" v-if="contentLoaded">
      Top Songs
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { wait } from '@/utils/functions';
import { TrackItem, UserSavedTracks } from '@/types/custom';
import { QueryAPI } from '@/types/vuex';
import Loading from '../loading/Loading.vue';

@Component({
  components: { Loading },
  computed: {
    ...mapGetters('user', ['getUserTopTracks']),
  },
  methods: {
    ...mapActions('user', ['queryUserTopTracks']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserTopSongs extends Vue {
  @Prop() longTerm!: boolean;

  contentLoaded = false;

  // getUserSavedTracks!: UserSavedTracks;

  queryUserSavedTracks!: (attrs: QueryAPI) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  async mounted() {
    /* if (!this.getUserSavedTracks) {
      await this.updateAccessToken();
      await this.queryUserSavedTracks({});
      // this.contentLoaded = true;
    } else {
      // this.contentLoaded = true;
    } */
    // NOTE: Es necesario el timeout?
    await wait(250);
    this.contentLoaded = true;
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  @media (max-width: $breakpoint-tablet) {
  }
</style>
