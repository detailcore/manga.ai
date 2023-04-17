<template>
  <div class="btn__user">
    <div class="btn" @click="openUser" v-if="loggedIn" >
      <mdi-Account title="Аккаунт" />
    </div>

    <div class="btn" @click="actionLogin(!isOpenLogin)" v-if="!loggedIn" >
      <mdi-Login title="Вход" />
    </div>

    <div class="user__modal" v-if="isOpen">
      <div class="info" @click="goToProfile">
        <div class="avatar" :style="styleAvatar">N/A</div>
        <div class="login"> {{ userData.login }} </div>
      </div>
      <div class="links">
        <div class="links_line">
          <Nuxt-link class="link line" to="/create/manga">
            <div class="link_text">
              <mdi-Plus title="Добавить" /> Тайтл
            </div>
          </Nuxt-link>
          <Nuxt-link class="link line" to="/create/team">
            <div class="link_text">
              <mdi-Plus title="Добавить" /> Команду
            </div>
          </Nuxt-link>
        </div>
        <Nuxt-link class="link" to="/user/content">
          <div class="link_text">Всё моё!</div>
        </Nuxt-link>
        <Nuxt-link class="link" to="/admin" v-if="isAdmin">
          <div class="link_text" style="color:#ff6820;">Админка</div>
        </Nuxt-link>
        <Nuxt-link class="link" to="/moderation?type=manga&statuses=2" v-if="isAdmin">
          <div class="link_text">Модерация</div>
          <mdi-Pencil title="Модерация" />
        </Nuxt-link>
        <a class="link" href="#" @click.prevent="logout">
          <div class="link_text">Выход</div>
          <mdi-Logout title="Выход" />
        </a>
      </div>
    </div>

    <div class="login__modal" v-if="isOpenLogin">
      <div class="btn close" @click="close">
        <mdi-Close title="" />
      </div>
      <div class="block__title modal__title">
        Войти в аккаунт
      </div>

      <div v-show="$route.name != 'auth-callback'" class="modal__subtitle">Через социальные сети:</div>
      <WidgetsLoginSocial v-show="$route.name != 'auth-callback'" />

      <div v-show="$route.name != 'auth-callback'" class="modal__subtitle">Через почту и пароль:</div>
      <WidgetsLoginEmail />

    </div>

    <div class="background__close"
          v-if="isOpen == true ||
                isOpenLogin == true"
          @click="isOpen = false,
                  actionLogin(false)">
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isOpen: false,
      user: {},
    }
  },

  async mounted() {
    if(
        Boolean(localStorage.getItem("auth._token.laravelSanctum")) &&
        !this.loggedIn
      ) {
      await this.$auth.fetchUser()
    }
  },

  computed: {
    ...mapGetters('user', { auth: 'GET_AUTH' }),
    ...mapGetters( 'region', { isOpenLogin: 'GET_OPEN_LOGIN' }),
    isAdmin() {
      return this.userData ? (this.userData.id_role === 1) : false
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    userData() {
      if(this.$store.state.auth.user == null) return false
      const { id, name, cover, id_role } = this.$store.state.auth.user
      return {
        id: id,
        login: name,
        avatar: cover,
        id_role: id_role,
      }
    },
    styleAvatar({ $config }) {
      if(this.userData ? this.userData.avatar : false) {
        return {
          fontSize: 0,
          backgroundSize: 'cover',
          backgroundImage: `url(${this.userData ? $config.urlCoverUser + this.userData.id +'/'+ this.userData.avatar : ''})`
        }
      } else {
        return {
          backgroundColor: '#343434',
          border: 'thin solid rgba(255, 255, 255, 0.12)'
        }
      }
    }
  },

  methods: {
    goToProfile() {
      this.$router.push({
        name: 'user-id',
        params: {
          id: this.userData.id,
        }
      })
      this.close()
    },

    async logout() {
      await this.$auth.logout('laravelSanctum')
        .then(() => {
          this.isOpen = false
        })
        .catch((e) => {
          console.log('ОШИБКА ВЫХОДА')
        })
    },

    openUser() {
      this.isOpen = !this.isOpen
    },

    close() {
      this.isOpen = false
      this.actionLogin(false)
    },

    actionLogin(value) {
      this.$store.commit('region/SET_OPEN_LOGIN', value)
    },
  },
}
</script>

<style lang="scss">
  .btn__user {
    position: relative;
    .user__modal {
      @include modal;
      z-index: 11;
      right: 0;
      top: 36px;
      width: 256px;
      padding: 6px;
      display: flex;
      flex-direction: column;
      position: absolute;
      .info {
        display: flex;
        cursor: pointer;
        margin-bottom: 6px;
        flex-direction: row;
        align-items: center;
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login {
          padding-left: 8px;
          overflow: hidden;
          max-width: calc(100% - 70px);
        }
      }
      .links {
        display: flex;
        flex-direction: column;
        .links_line {
          display: flex;
          justify-content: space-between;
          .line {
            width: calc(50% - 4px);
            padding: 4px 6px;
            .link_text {
              display: flex;
              align-items: center;
            }
          }
        }
        .link {
          padding: 6px;
          margin: 4px 0;
          border-radius: 6px;
          position: relative;
          text-decoration: none;
          align-items: center;
          display: inline-flex;
          justify-content: space-between;
          border: thin solid rgb(255 255 255 / 12%);
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


  //* Авторзиация
  .login__modal {
    top: 0;
    right: 0;
    z-index: 11;
    padding: 6px;
    min-width: 300px;
    position: absolute;
    border-radius: 6px;
    background-color: #1e1e1e;
    border: thin solid rgba(255, 255, 255, 0.12);
    .close {
      top: 12px;
      right: 0;
      position: absolute;
    }
    .modal__title {
      padding: 12px;
    }
    .modal__subtitle {
      padding: auto;
    }
  }
}
</style>
