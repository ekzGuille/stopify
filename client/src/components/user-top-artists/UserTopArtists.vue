<template>
  <div class="usr-top-artists-content">
    <div class="usr-top-artists-data" v-if="contentLoaded">
      <SmallArtist
        v-for="(artist, index) in topArtists"
        :key="artist.id"
        :artist="artist"
        :index="index"
      />
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
import { Artist, UserTopArtists as TopArtists } from '@/types/custom';
import { QueryTopResources } from '@/types/vuex';
import Loading from '@/components/loading/Loading.vue';
import SmallArtist from '@/components/artist/SmallArtist.vue';

@Component({
  components: { SmallArtist, Loading },
  computed: {
    ...mapGetters('user', ['getUserTopArtists']),
  },
  methods: {
    ...mapActions('user', ['queryUserTopArtist']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserTopArtists extends Vue {
  @Prop() longTerm!: boolean;

  contentLoaded = false;

  getUserTopArtists!: TopArtists;

  queryUserTopArtist!: (attrs: QueryTopResources) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  topArtists: Artist[] = [];

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
    await this.queryUserTopArtist({ longTerm: this.longTerm });
    // await wait(250);
    this.updateValues();
    this.contentLoaded = true;
  }

  updateValues() {
    this.topArtists = this.getUserTopArtists.items;
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';
  .usr-top-artists-content {
    width: 80%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: $breakpoint-tablet) {
  }
</style>
