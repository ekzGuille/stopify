<template>
  <div class="usr-top-artists-content">
    <div class="usr-top-artists-data" v-if="contentLoaded">
      <p v-for="artist of topArtists" :key="artist.id">{{ artist.name }}</p>
    </div>
    <Loading v-if="!contentLoaded"></Loading>
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

@Component({
  components: { Loading },
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

  @media (max-width: $breakpoint-tablet) {
  }
</style>
