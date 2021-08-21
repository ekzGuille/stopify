<template>
  <div class="usr-top-songs-content">
    <div class="usr-top-songs-data" v-if="contentLoaded">
      <SmallTrack
        v-for="(track, index) in topTracks"
        :key="track.id"
        :track="track"
        :index="index"/>
    </div>
    <Loading v-else/>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { wait } from '@/utils/functions';
import { TrackItem, UserTopTracks } from '@/types/custom';
import { QueryTopResources } from '@/types/vuex';
import Loading from '@/components/loading/Loading.vue';
import SmallTrack from '@/components/track/SmallTrack.vue';

@Component({
  components: { SmallTrack, Loading },
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

  getUserTopTracks!: UserTopTracks;

  topTracks: TrackItem[] = [];

  queryUserTopTracks!: (attrs: QueryTopResources) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  @Watch('longTerm')
  async onTermChange() {
    await this.queryData();
  }

  async mounted() {
    await this.queryData();
  }

  async queryData() {
    this.contentLoaded = false;
    await this.updateAccessToken();
    await this.queryUserTopTracks({ longTerm: this.longTerm });
    // await wait(250);
    this.updateValues();
    this.contentLoaded = true;
  }

  updateValues() {
    this.topTracks = this.getUserTopTracks.items;
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  .usr-top-songs-content {
    .usr-top-songs-data {
      margin-top: 0.5rem;
    }
  }

  @media (max-width: $breakpoint-tablet) {
    .usr-top-songs-content {
      .usr-top-songs-data {
        margin-top: 1rem;
      }
    }
  }
</style>
