<template>
  <div class="usr-top-artists-content">
    <div class="usr-top-artists-data" v-if="contentLoaded">
      Top Artists
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { wait } from '@/utils/functions';
import { UserSavedTracks } from '@/types/custom';
import { QueryAPI } from '@/types/vuex';
import Loading from '../loading/Loading.vue';

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

  // getUserTopArtists!: UserSavedTracks;

  queryUserSavedTracks!: (attrs: QueryAPI) => Promise<void>;

  updateAccessToken!: () => Promise<void>;

  async mounted() {
    /* if (!this.getUserTopArtists) {
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
