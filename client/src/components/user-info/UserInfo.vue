<template>
  <div class="usr-info-content">
    <div class="usr-info-data" v-if="contentLoaded">
      <div class="usr-info-profile-wrapper">
        <p>Hola {{ getUserInformation.display_name }}
        </p>
        <div class="usr-info-profile-image-wrapper">
          <div class="usr-info-followers">
            <span class="usr-info-followers-count">{{ getUserInformation.followersCount }}</span>
            <svg  class="usr-info-followers-icon" viewBox="0 0 24 24" width="24"
                  height="24" stroke="currentColor"
                  stroke-width="2" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87">
              </path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75">
              </path>
            </svg>
          </div>
          <img class="usr-info-profile" v-if="getUserInformation.image" :src="getUserInformation.image" alt="profile">
          <div class="usr-info-profile-backup" v-if="!getUserInformation.image">
            <svg viewBox="0 0 24 24"
                 width="24" height="24" stroke="currentColor" stroke-width="1"
                 fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <img
            class="usr-info-flag"
            :src="`https://www.countryflags.io/${getUserInformation.country}/flat/64.png`"
            :alt="getUserInformation.country">
        </div>
        <p class="usr-info-open-sp-wrapper">Ver perfil completo en
          <a class="usr-info-accent" :href="getUserInformation.spotifyProfileUrl" target="_blank">Spotify</a>
        </p>
      </div>
      <div class="usr-info-playlist-wrapper">
        <p class="usr-info-playlist-title">Playlists recientes</p>
        <UserPlaylists :v-if="getUserInformation && getUserInformation.id"
                       :userId="getUserInformation.id"></UserPlaylists>
      </div>
      <div class="usr-info-playlist-scrolltop-wrapper">
        <div class="usr-info-playlist-scrolltop" @click="scroll">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
               fill="none"  stroke-linecap="round" stroke-linejoin="round" >
            <line x1="12" y1="19" x2="12" y2="5">
            </line>
            <polyline points="5 12 12 5 19 12">
            </polyline>
          </svg>
        </div>
      </div>
    </div>
    <Loading v-if="!contentLoaded"></Loading>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { UserProfile } from '@/types/spotify';
import Loading from '@/components/loading/Loading.vue';
import UserPlaylists from '@/components/user-playlists/UserPlaylists.vue';

@Component({
  components: { UserPlaylists, Loading },
  computed: {
    ...mapGetters('user', ['getUserInformation']),
  },
  methods: {
    ...mapActions('user', ['queryUserInformation']),
    ...mapActions('credentials', ['updateAccessToken']),
  },
})
export default class UserInfo extends Vue {
  contentLoaded = false;

  header: Element | undefined;

  getUserInformation!: UserProfile;

  queryUserInformation!: () => UserProfile;

  updateAccessToken!: () => UserProfile;

  scroll() {
    this.$el.scrollIntoView({ behavior: 'smooth' });
  }

  async mounted() {
    if (!this.getUserInformation) {
      await this.updateAccessToken();
      await this.queryUserInformation();
      this.contentLoaded = true;
    } else {
      this.contentLoaded = true;
    }

    // Scrolling behaviour
    this.header = document.querySelector('header') || undefined;
    const toScrollElement = this.$el.parentElement;
    if (!toScrollElement) return;
    toScrollElement.addEventListener('scroll', () => {
      if (!this.header) return;
      if (toScrollElement.scrollTop < this.header.clientHeight) {
        this.header.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

div.usr-info-content {
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  div.usr-info-data {
    display: flex;
    flex-direction: row;
    width: 100%;
    div.usr-info-profile-wrapper {
      display: flex;
      flex-direction: column;
      width: 35%;
      p {
        font-size: 1.5rem;
        margin-bottom: 4%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .usr-info-profile-image-wrapper {
        position: relative;

        div.usr-info-profile-backup {
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: $color-sp-grey;

          svg {
            width: 8rem;
            height: 8rem;
            stroke: $color-sp-stroke-light-grey;
          }
        }

        div.usr-info-followers {
          display: flex;
          flex-direction: row;
          position: absolute;
          align-items: center;
          color: $color-white;
          bottom: 0;
          width: 35px;
          left: 25%;

          span.usr-info-followers-count,
          svg.usr-info-followers-icon {
          }
          span.usr-info-followers-count {
            font-size: 1rem;
            margin-right: 5px;
          }
          svg.usr-info-followers-icon {
            width: 15px;
            height: 15px;
          }
        }
        img {
          &.usr-info-profile {
            width: 200px;
            border-radius: 50%;
          }
          &.usr-info-flag {
            position: absolute;
            bottom: 0;
            border-radius: 0;
            right: 25%;
            width: 35px;
          }
        }
      }
      p.usr-info-open-sp-wrapper {
        margin: 4% 2%;
        font-size: 1.5rem;
        display: block;
        text-decoration: none;
        a {
          text-decoration: none;
          &.usr-info-accent {
            color: $color-sp-accent-green;
          }
        }
      }
    }
    div.usr-info-playlist-wrapper {
      display: flex;
      flex-direction: column;
      width: 65%;
      p.usr-info-playlist-title {
        font-size: 2rem;
      }
    }
    div.usr-info-playlist-scrolltop-wrapper {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: none;
      div.usr-info-playlist-scrolltop {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-radius: 50%;
        height: 50px;
        width: 50px;
        background: $color-sp-light-green;
        &:hover {
          cursor: pointer;
        }
        &:active {
          transform: scale(0.95);
          transition: all 0.1s ease-in-out;
        }
      }
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  div.usr-info-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    margin-top: 5%;

    div.usr-info-data {
      display: flex;
      flex-direction: column;
      width: auto;
      div.usr-info-profile-wrapper {
        width: auto;
        .usr-info-profile-image-wrapper {
          div.usr-info-profile-backup {
            width: 150px;
            height: 150px;
            svg {
              width: 6rem;
              height: 6rem;
            }
          }

          div.usr-info-followers {
            left: 20%;
          }

          img {
            &.usr-info-profile {
              width: 150px;
            }
            &.usr-info-flag {
              right: 20%;
            }
          }
        }
        p.usr-info-open-sp-wrapper {
          font-size: 1.3rem;
        }
      }
      div.usr-info-playlist-wrapper {
        width: auto;
        p.usr-info-playlist-title {
          font-size: 1.5rem;
        }
      }
      div.usr-info-playlist-scrolltop-wrapper {
        display: initial;
      }
    }
  }
}
</style>
