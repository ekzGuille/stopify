<template>
  <div class="top-wrapper">
    <div class="top-chooser">
      <span class="top-title">¿Qué quieres ver?</span>
      <div class="toggle-rows">
        <div class="top-row">
          <span class="normal-text" v-bind:class="{'top-unselected': getIsTopSongs}">Artistas</span>
          <FancyToggle id="type" :checked="getIsTopSongs" @clicked="setTypeToggle"/>
          <span class="normal-text" v-bind:class="{'top-unselected': !getIsTopSongs}">Canciones</span>
        </div>
        <div class="top-row">
          <span class="normal-text" v-bind:class="{'top-unselected': getIsTopLongTerm}">Últimos</span>
          <FancyToggle id="time" :checked="getIsTopLongTerm" @clicked="setTimeToggle"/>
          <span class="normal-text" v-bind:class="{'top-unselected': !getIsTopLongTerm}">Siempre</span>
        </div>
      </div>
    </div>
    <div class="top-text">
      <span class="normal-text">Mostrando tus 10 </span>
      <span class="normal-text" v-if="!getIsTopSongs"><span class="top-text-accent">artistas</span> más escuchados</span>
      <span class="normal-text" v-else><span class="top-text-accent">canciones</span> más escuchadas</span>
      <span class="normal-text"> desde </span>
      <span v-if="getIsTopLongTerm" class="top-text-accent normal-text">siempre</span>
      <span v-else class="top-text-accent normal-text">el último mes</span>
      <span class="normal-text">.</span>
    </div>
    <div class="top-content">
      <UserTopSongs v-if="getIsTopSongs" :long-term="getIsTopLongTerm"></UserTopSongs>
      <UserTopArtists v-else :long-term="getIsTopLongTerm"></UserTopArtists>
    </div>
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
  overflow: scroll;

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
        align-items: center;
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

  .top-content {
    margin: 0 0 2.5rem 0;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: $breakpoint-tablet) {
  .top-wrapper {
    margin: 1rem 0 0 0;
    .top-title {
      font-size: 1.2rem;
    }
    .top-chooser {
      width: 80%;
      .toggle-rows {
        margin: 2% 0;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
    .top-text {
      width: 80%;
    }
  }
}
</style>
