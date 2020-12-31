<template>
  <div class="top-wrapper">
    <div class="top-chooser">
      <span class="top-title">¿Qué quieres ver?</span>
      <div class="toggle-rows">
        <div class="top-row">
          <span v-bind:class="{'top-unselected': getIsTopSongs}">Canciones</span>
          <FancyToggle id="type" :checked="getIsTopSongs" @clicked="setTypeToggle"/>
          <span v-bind:class="{'top-unselected': !getIsTopSongs}">Artistas</span>
        </div>
        <div class="top-row">
          <span v-bind:class="{'top-unselected': getIsTopLongTerm}">Últimos</span>
          <FancyToggle id="time" :checked="getIsTopLongTerm" @clicked="setTimeToggle"/>
          <span v-bind:class="{'top-unselected': !getIsTopLongTerm}">Siempre</span>
        </div>
      </div>
    </div>
    <div class="top-text">
      <span>Mostrando tus </span>
      <span v-if="getIsTopSongs"><span class="top-text-accent">artistas</span> más escuchados</span>
      <span v-if="!getIsTopSongs"><span class="top-text-accent">canciones</span> más escuchadas</span>
      <span> desde </span>
      <span v-if="getIsTopLongTerm" class="top-text-accent">siempre</span>
      <span v-if="!getIsTopLongTerm" class="top-text-accent">el último mes</span>
      <span>.</span>
    </div>
    <UserTopArtists v-if="getIsTopSongs" :long-term="getIsTopLongTerm"></UserTopArtists>
    <UserTopSongs v-if="!getIsTopSongs" :long-term="getIsTopLongTerm"></UserTopSongs>
  </div>
</template>

<script lang="ts">

import UserTopSongs from '@/components/user-top-songs/UserTopSongs.vue';
import UserTopArtists from '@/components/user-top-artists/UserTopArtists.vue';
import FancyToggle from '@/components/toggle/FancyToggle.vue';
import { Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import store from '@/store';

// Added Vue.extend({}) because this.isLongTerm and this.isTopSongs was giving linting error
export default Vue.extend({
  name: 'TopSongs',
  components: {
    UserTopSongs,
    UserTopArtists,
    FancyToggle,
  },
  data() {
    return {
      isLongTerm: store.getters['user/getIsTopSongs'],
      isTopSongs: store.getters['user/getIsTopLongTerm'],
    };
  },
  methods: {
    setTimeToggle(value: boolean) {
      store.commit('user/setIsTopLongTerm', value);
      this.isLongTerm = value;
    },
    setTypeToggle(value: boolean) {
      store.commit('user/setIsTopSongs', value);
      this.isTopSongs = value;
    },
  },
  computed: {
    ...mapGetters('user', ['getIsTopSongs', 'getIsTopLongTerm']),
  },
});
// https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.top-unselected {
  color: $color-sp-stroke-light-grey;
}

.top-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - #{$header-height});
  margin: 2rem 0 0 0;
  width: 100%;

.top-title {
  font-size: 1.5rem;
}

  .top-chooser {
    width: 80%;

    .toggle-rows {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .top-row {
        display: flex;
        flex-direction: row;
        margin: 2% 5%;

        span {
          margin: 0 5%;
        }
      }
    }
  }
  .top-text {
    width: 100%;
    margin: 0 0 2% 0;
    .top-text-accent {
      color: $color-sp-accent-green;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .top-wrapper {
    .top-chooser {
      width: 80%;
      .toggle-rows {
        margin: 2% 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top-row {
          display: flex;
          flex-direction: row;
          margin: 2% 5%;

          span {
            margin: 0 5%;
          }
        }
      }
    }
    .top-text {
      width: 80%;
    }
  }
}
</style>
