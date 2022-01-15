<template>
  <div class="btn__user">
    <div class="btn" @click="openUser" v-if="0" >
      <mdi-Account title="Аккаунт" />
    </div>

    <div class="btn" @click="openLogin" v-if="1" >
      <mdi-Login title="Вход" />
    </div>

    <div class="user__modal" v-if="isOpen">
      <div class="info">
        <div class="avatar" :style="styleAvatar">N/A</div>
        <Nuxt-link to="test" class="login"> {{ userData.login }} </Nuxt-link>
      </div>
      <div class="links">
        <Nuxt-link to="test" class="link">
          <div class="link_text">Выход</div>
          <mdi-Logout title="Выход" />
        </Nuxt-link>
        <Nuxt-link to="test" class="link">
          <div class="link_text">Выход</div>
          <mdi-Logout title="Выход" />
        </Nuxt-link>
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
        <div class="item" @click="isOpenRegistry = true"> Регистрация </div>
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
      <div class="modal__social">
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
      </div>
      <div class="modal__input">
        <input type="text" v-model.trim="reg.login" placeholder="Логин">
        <input type="email" v-model.trim="reg.email" placeholder="Почта">
        <input type="password" v-model.trim="reg.password" placeholder="Пароль">
        <input type="password" v-model.trim="reg.repassword" placeholder="Еще раз пароль">
      </div>

      <div class="modal__recovery_text">
        Регистрируясь, вы соглашаетесь с нашими <Nuxt-link to="#">Правилами и устоями</Nuxt-link>.
      </div>
      
      <div class="modal__btn">
        <div class="item"> Зарегистрироваться </div>
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
  </div>
</template>

<script>
import { csrf } from '~/services/api'

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
        login: '',
        email: '',
        password: '',
        repassword: '',
      },
      recoveryMail: '',
    }
  },

  computed: {
    userData() {
      return {
        login: 'User_ligin',
        avatar: '/_nuxt/assets/images/mid_cover.jpg',
      }
    },
    styleAvatar() {
      if(this.userData.avatar) {
        return {
          fontSize: 0,
          backgroundImage: 'url('+this.userData.avatar+')'
        }
      } else {
        return {
          backgroundColor: '#343434',
          border: 'thin solid rgba(255, 255, 255, 0.12)'
        }
      }
    }
  },

  // mounted() {
  //   this.$axios.$get('/sanctum/csrf-cookie');
  // },

  methods: {
    async login() {
      // let qwe = await csrf()
      // console.log(qwe)

      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.auth.login,
          password: this.auth.password,
        },
      })
      .then((result) => {
        console.log(
          'result => ', result,
        )
        this.auth.login = ''  //обнуление введунных данных
        this.auth.password = '' //обнуление введунных данных
        this.isOpenLogin = false
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
      right: 0;
      top: 36px;
      width: 256px;
      padding: 6px;
      display: flex;
      flex-direction: column;

      .info {
        display: flex;
        margin-bottom: 6px;
        flex-direction: row;
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
          display: flex;
          align-items: center;
          padding-left: 10px;
          width: calc(100% - 70px);
        }
      }
      .links {
        display: flex;
        flex-direction: column;
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
          .link_text {
          }
        }
      }
    }


  //* Авторзиация
  .login__modal {
    top: 0;
    right: 0;
    z-index: 2;
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
