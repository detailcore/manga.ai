<template>
  <div class="profile">
    <div class="profile__header user">
      <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/b1254rai.jpg)` }">
        <div class="shadow"></div>
        <div class="container user_info">
          <div class="cover__avatar" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
          <div class="user_line">
            <span class="login">User_login</span>
            <mdi-Cog class="btn settings" @click="settingsOpen" />
          </div>
        </div>
      </div>

      <div class="nav-line">
        <div class="item">Всё <span class="count">287</span></div>
        <div class="item">Читаю <span class="count">156</span></div>
        <div class="item">В планах <span class="count">45</span></div>
        <div class="item">Прочитано <span class="count">287</span></div>
        <div class="item">Отложено <span class="count">75</span></div>
        <div class="item">Брошено <span class="count">53</span></div>
        <div class="item">Не интересно <span class="count">43</span></div>
        <div class="btn"><mdi-Plus class="add_bookmark" /></div>
      </div>
    </div>

    <div class="container bookmarks">
      <widgets-card-popular
          :cover="item.cover" 
          :title="item.title" 
          :like="item.like" 
          v-for="(item, index) in dataBookmarks" :key="index" />
    </div>

    <div class="modal_window modal__user_settings" v-if="settingsShow">
      <div class="block__title">Настройки</div>
      <div class="nav__tabs">
        <span class="item" :class="{ active : !settingsPassword }" @click="settingsPassword = false">Фото</span>
        <span class="item" :class="{ active : settingsPassword }" @click="settingsPassword = true">Сменить пароля</span>
      </div>
      <div class="tab" v-if="!settingsPassword">
        <div class="block_avatar">
          <div class="title">Аватарка</div>
          <div class="download">
            <input name="myAvatar" type="file">
          </div>
        </div>
        <div class="block_background">
          <div class="title">Фон профиля</div>
          <div class="download">
            <input name="myBackground" type="file">
          </div>
        </div>
        <div class="action">
          <div class="save">Сохранить</div>
          <div class="cancel" @click="settingsShow = false">Отмена</div>
        </div>
      </div>
      <div class="tab" v-else>
        <div class="title">Текущий пароль</div>
        <input class="password" type="password" v-model.trim="changePassword.current" placeholder="Текущий пароль">
        <div class="title">Новый пароль</div>
        <input class="password" type="password" v-model.trim="changePassword.new" placeholder="Новый пароль">
        <div class="title">Повторите новый пароль</div>
        <input class="password" type="password" v-model.trim="changePassword.reNew" placeholder="Повторите новый пароль">
        <div class="action">
          <div class="save">Сохранить</div>
          <div class="cancel" @click="settingsShow = false">Отмена</div>
        </div>
      </div>
    </div>


    <div class="background__close" 
          v-if="settingsShow == true"
          @click="settingsShow = false">
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      settingsShow: false,
      settingsPassword: false,
      changePassword: {
        current: '',
        new: '',
        reNew: '',
      }
    }
  },
  computed: {
    dataBookmarks() {
      return [
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 10,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 159,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 17.5,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 150100,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 100800,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
      ]
    },
    test() {
      console.log(
        this.$store
      );
      return this.$store.state.auth.user
    },
  },

  async created() {
    await this.testUser()
  },

  methods: {
    async testUser() {
      // const test = await this.$axios.$get(`user/${this.$route.params.id}`)
      // console.log(test)
    },

    settingsOpen() {
      this.settingsShow = true
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
          border-radius: 6px 6px 0px 0px;
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
    .nav-line {
      display: flex;
      min-height: 50px;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      background-color: #252525;
      .item {
        margin: 0 6px;
        cursor: pointer;
        padding: 4px 6px;
        border-radius: 6px;
        border: thin solid rgba(255, 255, 255, 0.12);
        // border-bottom: thin solid rgba(0, 255, 34, 0.25);
        &:first-child {
          border-bottom: thin solid rgba(0, 255, 34, 0.25);
        }
        &:hover {
          border: thin solid rgba(0, 255, 34, 0.25);
        }
        .count {
          color: #919191;
          font-weight: 300;
        }
      }
      .add_bookmark {
        cursor: pointer;
      }
    }
  }
  .bookmarks {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }


//* Settings
.modal__user_settings {
  width: 320px;
  padding: 0 12px;
  background-color: #1e1e1e;
  border: thin solid rgba(255, 255, 255, 0.12);
}
.modal_window {
  top: 50%;
  left: 50%;
  z-index: 10;
  position: fixed;
  margin-right: -50%;
  border-radius: 6px;
  transform: translate(-50%, -50%);
  .block__title {
    padding-top: 10px;
  }
  .nav__tabs {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    .item {
      padding: 0;
      margin: 12px 6px;
      cursor: pointer;
      position: relative;
    }
    .item.active {
      &:before {
        left: 0;
        content: "";
        width: 100%;
        height: 3px;
        bottom: -3px;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.12);
      }
    }
  }
  .tab {
    input.password {
      width: 100%;
      color: #fff;
      height: 30px;
      padding: 0 8px;
      font-size: inherit;
      margin-bottom: 6px;
      border-radius: 6px;
      background: #1e1e1e;
      border: thin solid rgba(255, 255, 255, 0.12);
    }
    .title {
      font-size: 1.1rem;
    }
    .block_avatar,
    .block_background {
      margin-bottom: 12px;
    }
    .download {
    }
    .action {
      height: 40px;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-around;
      .save,
      .cancel {
        cursor: pointer;
        padding: 6px 8px;
        border-radius: 6px;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      .save {
        border-bottom: thin solid rgba(0, 255, 34, 0.25);
        &:hover {
          border: thin solid rgba(0, 255, 34, 0.25);
        }
      }
      .cancel {
        &:hover {
          border: thin solid rgba(255, 0, 0, 0.25);
        }
      }
    }
  }
}
}
</style>
