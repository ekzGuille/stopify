<template>
  <div class="usr-top-artists-content">
    Top Artists
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loading from '../loading/Loading.vue';

@Component({
  components: { Loading },
})
export default class UserTopArtists extends Vue {
  @Prop() longTerm!: boolean;
}
</script>

<style lang="scss" scoped>
  @import '../../styles/_variables.scss';

  @media (max-width: $breakpoint-tablet) {
  }
</style>
