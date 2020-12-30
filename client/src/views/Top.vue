<template>
  <div class="top-wrapper">
    <div class="top-chooser">
      <span class="top-title">¿Qué quieres ver?</span>
      <div class="toggle-rows">
        <div class="top-row">
          <span>Canciones</span>
          <FancyToggle id="type" :checked="getTypeToggle" @clicked="setTypeToggle"/>
          <span>Artistas</span>
        </div>
        <div class="top-row">
          <span>Últimos</span>
          <FancyToggle id="time" :checked="getTimeToggle" @clicked="setTimeToggle"/>
          <span>Siempre</span>
        </div>
      </div>
    </div>
    <div class="top-text">
      <span>Mostrando tus </span>
      <span v-if="typeValue"><span class="top-text-accent">artistas</span> más escuchados</span>
      <span v-if="!typeValue"><span class="top-text-accent">canciones</span> más escuchadas</span>
      <span> desde </span>
      <span v-if="timeValue" class="top-text-accent">siempre</span>
      <span v-if="!timeValue" class="top-text-accent">el último mes</span>
      <span>.</span>
    </div>
    <UserTopArtists v-if="typeValue" :long-term="timeValue" ></UserTopArtists>
    <UserTopSongs v-if="!typeValue" :long-term="timeValue" ></UserTopSongs>
  </div>
</template>

<script lang="ts">

import UserTopSongs from '@/components/user-top-songs/UserTopSongs.vue';
import UserTopArtists from '@/components/user-top-artists/UserTopArtists.vue';
import FancyToggle from '@/components/toggle/FancyToggle.vue';

export default {
  name: 'TopSongs',
  components: {
    UserTopSongs,
    UserTopArtists,
    FancyToggle,
  },
  data: () => ({
    typeValue: false, // TODO: Pasarlo al STORE
    timeValue: false, // TODO: Pasarlo al STORE
  }),
  methods: {
    setTimeToggle(value: boolean) {
      this.timeValue = value;
    },
    setTypeToggle(value: boolean) {
      this.typeValue = value;
    },
  },
  computed: {
    getTimeToggle() {
      return this.timeValue;
    },
    getTypeToggle() {
      return this.typeValue;
    },
  },
};
// https://medium.com/js-dojo/component-communication-in-vue-js-ca8b591d7efa
</script>

<style lang="scss">
@import '../styles/_variables.scss';
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
