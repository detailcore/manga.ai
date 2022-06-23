<template>
  <div class="btn__user">
    <div class="btn" @click="openUser" v-if="loggedIn" >
      <mdi-Account title="Аккаунт" />
    </div>

    <div class="btn" @click="openLogin" v-if="!loggedIn" >
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
      <!-- <div class="modal__social">
        <div class="item">
          <mdi-At title="Mail.ru" />
          Mail.ru
        </div>
        <div class="item">
          <mdi-Vk title="Vk" />
          Вконтакте
        </div>
        <div class="item">
          <mdi-Google title="Google" />
          Google
        </div>
        <div class="item">
          <mdi-YCombinator title="Yandex" />
          Яндекс
        </div>
      </div> -->
      <div class="modal__input">
        <input type="text" v-model.trim="auth.login" placeholder="E-mail">
        <input type="password" v-model.trim="auth.password" placeholder="Пароль">
      </div>
      <div class="modal__btn">
        <div class="item" @click.prevent="login"> Вход </div>
      </div>
      <div class="modal__recovery">
        <div class="item" @click="isOpenRecovery = true, isOpenLogin = false"> Забыл пароль? </div>
        <div class="item" @click="isOpenRegistry = true, isOpenLogin = false"> Регистрация </div>
      </div>
    </div>


    <div class="login__modal" v-if="isOpenRecovery">
      <div class="btn close" @click="close">
        <mdi-Close title="" />
      </div>
      <div class="block__title modal__title">
        Восстановление
      </div>
      <div class="modal__recovery_text">
        Чтобы восстановить пароль, укажите почту, на которую зарегестрирован Ваш аккаунт
      </div>
      <div class="modal__input">
        <input type="text" v-model.trim="recoveryMail" placeholder="E-mail">
      </div>
      <div class="modal__btn">
        <div class="item"> Восстановить </div>
      </div>
    </div>


    <div class="login__modal" v-if="isOpenRegistry">
      <div class="btn close" @click="close">
        <mdi-Close title="" />
      </div>
      <div class="block__title modal__title">
        Регистрация
      </div>
      <!-- <div class="modal__social">
        <div class="item">
          <mdi-At title="Mail.ru" />
          Mail.ru
        </div>
        <div class="item">
          <mdi-Vk title="Vk" />
          Вконтакте
        </div>
        <div class="item">
          <mdi-Google title="Google" />
          Google
        </div>
        <div class="item">
          <mdi-YCombinator title="Yandex" />
          Яндекс
        </div>
      </div> -->
      <div class="modal__input">
        <input type="text" v-model.trim="reg.name" placeholder="Ваш ник">
        <input type="email" v-model.trim="reg.email" placeholder="Почта">
        <input type="password" v-model.trim="reg.password" placeholder="Пароль">
        <input type="password" v-model.trim="reg.password_confirmation" placeholder="Еще раз пароль">
      </div>

      <div class="modal__recovery_text">
        Регистрируясь, вы соглашаетесь с нашими <Nuxt-link to="#">Правилами и устоями</Nuxt-link>.
      </div>

      <div class="modal__btn">
        <div class="item" @click.prevent="registration"> Зарегистрироваться </div>
      </div>
    </div>


    <div class="background__close"
          v-if="isOpen == true ||
                isOpenLogin == true ||
                isOpenRecovery == true ||
                isOpenRegistry == true"
          @click="isOpen = false,
                  isOpenLogin = false,
                  isOpenRecovery = false,
                  isOpenRegistry = false">
    </div>

    <notifications />
  </div>
</template>

<script>
import { register, findUserAndSetRole } from '~/services/api'

export default {
  data() {
    return {
      isOpen: false,
      isOpenLogin:false,
      isOpenRecovery: false,
      isOpenRegistry: false,
      user: {},
      auth: {
        login: '',
        password: ''
      },
      reg: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      recoveryMail: '',
    }
  },

  computed: {
    isAdmin() {
      return this.userData ? (this.userData.id_role === 1) : false
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    userData() {
      // return this.$store.state.auth.user
      let { id, name, cover, id_role } = this.$store.state.auth.user
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
    async login() {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.auth.login,
          password: this.auth.password,
          remember: true,
        },
      })
      .then(() => {
        this.$notify({
          text: `Вход выполнен успешно!`,
          type: 'success',
          duration: 1500
        })
      })
      .then(() => {
        this.auth.login = ''  //обнуление введунных данных
        this.auth.password = '' //обнуление введунных данных
        this.isOpenLogin = false
      })
      .catch((e) => {
        console.log('ОШИБКА ВХОДА')
        this.$notify({
          title: `E-mail или пароль введены неверно!`,
          text: `Проверьте правильность ввода почты или пароля!`,
          type: 'error',
          duration: 5000
        })
      })
    },

    async registration() {
      await register( this.reg )
        .then(async (res) => {
          this.isOpenLogin = false
          this.isOpenRegistry = false
          if(res.status === 201) {
            await findUserAndSetRole({ name: this.reg.name, email: this.reg.email, }) // Найти пользователя и установить ему роль
          }
        })
        .catch((e) => {
          console.log('ОШИБКА РЕГИСТРАЦИИ')
        })
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

    openLogin() {
      this.isOpenLogin = !this.isOpenLogin
    },

    openUser() {
      this.isOpen = !this.isOpen
    },

    close() {
      this.isOpen = false
      this.isOpenLogin = false
      this.isOpenRecovery = false
      this.isOpenRegistry = false
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
    .modal__social {
      display: flex;
      .item {
        width: 25%;
        padding: 0;
        display: flex;
        cursor: pointer;
        margin: 12px 8px;
        align-items: center;
        flex-direction: column;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .modal__recovery_text {
      padding: 2px;
      margin: 12px 0;
    }
    .modal__input {
      input {
        width: 100%;
        color: #fff;
        height: 36px;
        margin: 4px 0;
        padding: 0 8px;
        font-size: inherit;
        border-radius: 6px;
        background: #1e1e1e;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
    }
    .modal__btn {
      cursor: pointer;
      margin-top: 16px;
      border-radius: 6px;
      border: thin solid rgba(255, 255, 255, 0.12);
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
      }
      .item {
        padding: 6px;
        text-align: center;
      }
    }
    .modal__recovery {
      display: flex;
      flex-direction: row;
      margin: 16px 0 6px 0;
      justify-content: space-around;
      .item {
        padding: 0;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
