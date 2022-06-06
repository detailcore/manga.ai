<template>
  <div class="profile">
    <div class="profile__header user">
      <div class="cover" :style="{ backgroundImage: `url(${coverBg})` }">
        <div class="shadow"></div>
        <div class="container user_info">
          <div class="cover__avatar" :style="{ backgroundImage: `url(${cover})` }"></div>
          <div class="user_line">
            <span class="login"> {{ user.name }} </span>
            <div v-if="isOwner">
              <mdi-Cog class="btn settings" @click="showSetting" v-if="tabBookmark" />
              <mdi-BookmarkMultiple class="btn settings" @click="showBookmark" v-if="tabSetting" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <LazyUserBookmark v-show="tabBookmark" :tabBookmark="tabBookmark" />

    <LazyUserSetting v-if="tabSetting"  :settingsShow="tabSetting" />
    
  </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Пользователь ' + this.user.name + ', страница профиля на MangaClub.',
    }
  },

  data() {
    return {
      tabSetting: false,
      tabBookmark: true,
    }
  },

  computed: {
    ...mapGetters( 'user', { user: 'GET_USER' }),

    cover({ $config }) {
      return this.user.cover ? $config.urlCoverUser + this.user.id +'/'+ this.user.cover : ''
    },
    coverBg({ $config }) {
      return this.user.cover_bg ? $config.urlCoverUser + this.user.id +'/'+ this.user.cover_bg : ''
    },
    isOwner() {
      return this.user ? (+this.user.id === +this.$store.state.auth.user.id) : false
    },
  },

  async mounted() {
    await this.$store.dispatch('user/FETCH_USER', +this.$route.params.id)
  },

  methods: {
    showSetting() {
      this.tabSetting = true
      this.tabBookmark = false
    },
    showBookmark() {
      this.tabBookmark = true
      this.tabSetting = false
    },
  },
};
</script>


<style lang="scss">
.profile {
  position: relative;
  min-height: 100vh;
  min-height: calc(100vh - 165px);
  &__header.user {
    .cover {
      position: relative;
      height: 330px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
      .shadow {
        background: linear-gradient(180deg,rgba(6,13,34,0) 40%,rgba(6,13,34,.6));
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
      .user_info {
        display: flex;
        align-items: flex-end;
        height: 100%;
        position: relative;
        .cover__avatar {
          width: 160px;
          height: 160px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 4px 4px 0px 0px;
        }
        .user_line {
          height: 60px;
          display: flex;
          margin-left: 16px;
          align-items: center;
          flex-direction: row;
          .login {
            font-weight: 600;
            font-size: 1.6rem;
          }
          .settings {
            cursor: pointer;
            margin-left: 8px;
          }
        }
      }
    }
  }
  .nav-line {
    display: flex;
    flex-wrap: wrap;
    min-height: 50px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    background-color: #252525;
    .item {
      margin: 4px 6px;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
      border: thin solid rgba(255, 255, 255, 0.12);
      // border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
      }
      .count {
        color: #919191;
        font-weight: 300;
      }
    }
    .item.active {
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
    }
    .add_bookmark {
      cursor: pointer;
    }
  }
  .action {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 12px 0 24px 0;
    .save {
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
      }
    }
    .cancel {
      border-bottom: thin solid rgba(255, 34, 0, 0.25);
      &:hover {
        border: thin solid rgba(255, 34, 0, 0.25);
      }
    }
    .save,
    .cancel {
      cursor: pointer;
      padding: 4px 6px;
      position: relative;
      border-radius: 4px;
      &:hover {
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
    }
  }
}
</style>
