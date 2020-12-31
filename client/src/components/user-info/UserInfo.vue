<template>
  <div class="usr-info-content">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/css/flag-icon.min.css"
          integrity="sha256-0n6YDYIexWJmHyTKtRRHTXvoanQrXpFfpsfv0h53qvk=" crossorigin="anonymous">
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
          <NoImage
            v-if="!getUserInformation.image"
            type="user"
          ></NoImage>
          <span :class="`usr-info-flag flag-icon flag-icon-${getUserInformation.country.toLowerCase()}`"></span>
        </div>
        <p class="usr-info-open-sp-wrapper">Ver perfil completo en
          <a class="usr-info-accent"
             :href="getUserInformation.spotifyProfileUrl"
             target="_blank"
             rel="noopener noreferrer">Spotify</a>
        </p>
      </div>
      <div class="usr-info-playlist-wrapper">
        <UserPlaylists :v-if="getUserInformation && getUserInformation.id"></UserPlaylists>
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
    <div class="usr-loading-wrapper" v-if="!contentLoaded">
      <Loading></Loading>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { UserProfile } from '@/types/custom';
import Loading from '@/components/loading/Loading.vue';
import UserPlaylists from '@/components/user-playlists/UserPlaylists.vue';
import NoImage from '@/components/no-image/NoImage.vue';
import { wait } from '@/utils/functions';

@Component({
  components: { UserPlaylists, Loading, NoImage },
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

  toScrollElement: Element | undefined;

  favButton: Element | undefined;

  getUserInformation!: UserProfile;

  scroll() {
    if (!this.toScrollElement) return;
    this.toScrollElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async mounted() {
    // NOTE: Es necesario el timeout?
    // await wait(250);
    this.contentLoaded = true;

    // scroll
    this.toScrollElement = this.$el.parentElement || undefined;

    // query elements
    setTimeout(() => {
      this.favButton = this.$el.querySelector('.usr-info-playlist-scrolltop-wrapper') || undefined;
    });

    if (!this.toScrollElement) return;

    // listener
    const scrollListener = () => {
      if (!this.toScrollElement) return;
      if (!this.favButton) return;
      if (this.toScrollElement.scrollTop === 0) {
        if (this.favButton.classList.contains('show')) {
          this.favButton.classList.remove('show');
          this.favButton.classList.add('hide');
        }
      } else if (!this.favButton.classList.contains('show')) {
        this.favButton.classList.remove('hide');
        this.favButton.classList.add('show');
      }
    };

    this.toScrollElement.removeEventListener('scroll', scrollListener);
    this.toScrollElement.addEventListener('scroll', scrollListener);
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/_variables.scss';

.usr-info-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .usr-info-data {
    display: flex;
    flex-direction: row;
    width: 100%;
    .usr-info-profile-wrapper {
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

        .usr-info-followers {
          display: flex;
          flex-direction: row;
          position: absolute;
          align-items: center;
          color: $color-white;
          bottom: 0;
          width: 35px;
          left: 25%;

          span.usr-info-followers-count {
            font-size: 1rem;
            margin-right: 5px;
          }
          svg.usr-info-followers-icon {
            width: 15px;
            height: 15px;
          }
        }
        .usr-info-profile {
            width: 200px;
            border-radius: 50%;
        }
        .usr-info-flag {
          position: absolute;
          bottom: 4px;
          font-size: 1rem;
          border-radius: 0;
          right: 25%;
          width: 35px;
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

    .usr-info-playlist-wrapper {
      display: flex;
      flex-direction: column;
      width: 65%;
    }
    .usr-info-playlist-scrolltop-wrapper {
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: none;
      opacity: 0;

      .usr-info-playlist-scrolltop {
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
  .usr-loading-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: $breakpoint-tablet) {
  .usr-info-content {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;

    .usr-info-data {
      display: flex;
      flex-direction: column;
      width: auto;
      .usr-info-profile-wrapper {
        width: auto;
        .usr-info-profile-image-wrapper {
          .usr-info-followers {
            left: 20%;
          }

          .usr-info-profile {
              width: 150px;
            }
          .usr-info-flag {
              right: 20%;
            }
          }

        p.usr-info-open-sp-wrapper {
          font-size: 1.3rem;
        }
      }

      .usr-info-playlist-wrapper {
        width: auto;
      }

      .usr-info-playlist-scrolltop-wrapper.hide {
        display: none;
        opacity: 0;
      }

      .usr-info-playlist-scrolltop-wrapper.show {
        display: initial;
        opacity: 1;
      }
    }
  }
}
</style>
