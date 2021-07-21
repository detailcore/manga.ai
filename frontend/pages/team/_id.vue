<template>
  <div class="profile">
    <div class="profile__header team">
      <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/b1254rai.jpg)` }">
        <div class="shadow"></div>
        <div class="container user_info">
          <div class="cover__avatar" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
          <div class="user_line">
            <span class="login">Team_name</span>
            <mdi-Cog class="btn settings" @click="settingsOpen" />
          </div>
        </div>
      </div>
    </div>

    <div class="container content_team">
      <div class="contacts">
        <div class="inner">
          <div class="block__title">Контакты</div>
          <div class="links">
            <a href="https://vk.com/" target="_blank" rel="noopener nofollow noreferrer" class="btn"><mdi-Vk title="Vk" /></a>
            <a href="https://vk.com/" target="_blank" rel="noopener nofollow noreferrer" class="btn"><mdi-Earth title="Сайт" /></a>
          </div>
          <div class="block__title">Состав</div>
          <div class="people_team">
            <Nuxt-link class="people" to="/user/260">
              <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
              <div class="info">
                <span class="login">User_login_1</span>
                <span class="role">Админ_команды</span>
              </div>
            </Nuxt-link>
            <Nuxt-link class="people" to="/user/261">
              <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
              <div class="info">
                <span class="login">User_login_2</span>
                
                <span class="role">Аплодер</span>
              </div>
            </Nuxt-link>
          </div>
        </div>
      </div>
      <div class="content_team__inner">
        <!-- <div class="nav-line">
          <div class="item">Информация</div>
          <div class="item">Обновления</div>
        </div> -->
        <div class="description">
          <div class="block__title">Описание</div>
          <div class="description__text">
            {{ descTeam }}
          </div>
          <div class="stat">
            <div class="item">
              <div class="count">701459</div>
              <div class="item__text">лукасов</div>
            </div>
            <div class="item">
              <div class="count">34</div>
              <div class="item__text">тайтлов</div>
            </div>
            <div class="item">
              <div class="count">9846</div>
              <div class="item__text">глав</div>
            </div>
          </div>
        </div>
        <div class="posts">
          <widgets-card-popular
            :cover="item.cover" 
            :title="item.title" 
            :like="item.like" 
            v-for="(item, index) in dataBookmarks" :key="index" />
        </div>
      </div>
    </div>

    <div class="modal_window modal__user_settings" v-if="settingsShow">
      <div class="block__title">Настройки</div>
      <div class="nav__tabs">
        <span class="item" :class="{ active : !tabTwo }" @click="tabTwo = false">Фото</span>
        <span class="item" :class="{ active : tabTwo }" @click="tabTwo = true">Описание</span>
      </div>
      <div class="tab" v-if="!tabTwo">
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
        <div class="title">Введите описание команды</div>
        <textarea v-model="descTeam" :maxlength="maxText" class="add_desc_team" placeholder="Введите описание вашей команды"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
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
      descTeam: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad eveniet ullam at, est obcaecati dolor dolorem quae totam fugiat. Quibusdam repudiandae beatae exercitationem veniam maiores modi nostrum alias facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad eveniet ullam at, est obcaecati dolor dolorem quae totam fugiat. Quibusdam repudiandae beatae exercitationem veniam maiores modi nostrum alias facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ad e...',
      maxText: 512,
      settingsShow: false,
      tabTwo: false,
      changePassword: {
        current: '',
        new: '',
        reNew: '',
      }
    }
  },
  computed: {
    lengthText() {
      return this.descTeam.length
    },
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
  },
  methods: {
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
  &__header.team {
    .cover {
      height: 330px;
      position: relative;
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
        height: 100%;
        display: flex;
        position: relative;
        align-items: flex-end;
        .cover__avatar {
          width: 200px;
          height: 200px;
          border-radius: 6px;
          margin-bottom: -50px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
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
  .content_team {
    display: flex;
    .contacts {
      min-width: 200px;
      margin-top: 50px;
      .inner {
        top: 0;
        position: sticky;
        .links {
          display: flex;
        }
      }

      .people_team {
        display: flex;
        flex-direction: column;
        .people {
          display: flex;
          padding: 4px;
          margin-bottom: 8px;
          align-items: center;
          flex-direction: row;
          position: relative;
          &:hover {
            border-radius: 6px;
            text-decoration: none;
            &:before {
              opacity: 0.1;
            }
          }
          &:before {
            @include before;
          }
          .cover {
            min-width: 36px;
            min-height: 36px;
            margin-right: 12px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
          }
          .info {
            display: flex;
            overflow: hidden;
            flex-direction: column;
            .login {
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
            .role {
              color: #919191;
              font-weight: 300;
              font-size: 0.9rem;
              text-transform: uppercase;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    &__inner {
      .block__title {
        padding: 4px 8px;
        background-color: #252525;
      }
      .description {
        display: flex;
        margin: 12px 6px;
        border-radius: 6px;
        flex-direction: column;
        border: thin solid rgba(255, 255, 255, 0.12);
        .block__title {
        }
        &__text {
          padding: 4px 8px;
          line-height: 1.5rem;
        }
        .stat {
          display: flex;
          justify-content: space-evenly;
          .item {
            .count {
              text-align: center;
            }
            &__text {
              color: #919191;
              font-weight: 300;
              text-align: center;
            }
          }
        }
      }

      .posts {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
    // .nav-line {
    //   display: flex;
    //   min-height: 50px;
    //   align-items: center;
    //   flex-direction: row;
    //   justify-content: flex-start;
    //   background-color: #252525;
    //   .item {
    //     margin: 0 6px;
    //     cursor: pointer;
    //     padding: 4px 6px;
    //     border-radius: 6px;
    //     border: thin solid rgba(255, 255, 255, 0.12);
    //     // border-bottom: thin solid rgba(0, 255, 34, 0.25);
    //     &:first-child {
    //       border-bottom: thin solid rgba(0, 255, 34, 0.25);
    //     }
    //     &:hover {
    //       border: thin solid rgba(0, 255, 34, 0.25);
    //     }
    //   }
    // }
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
    .add_desc_team {
      width: 100%;
      color: #fff;
      background: #1e1e1e;
      padding: 8px 12px;
      font-size: inherit;
      border-radius: 6px;
      min-height: 335px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.01);
      &:hover,
      &:focus {
        outline: none;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      &:focus {
        box-shadow: inset 0 0 2px 0px #fff;
      }
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
