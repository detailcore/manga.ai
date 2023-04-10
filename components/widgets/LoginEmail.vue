<template>
  <div>
    <div class="modal__input">
      <input type="email" id="email" name="email" v-model="email" placeholder="Почта">
      <input type="password" id="password" name="password" v-model="password" placeholder="Пароль">
    </div>
    <div class="modal__btn">
      <div class="item" @click.prevent="login">Вход</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    email: {
      get () {
        return this.$store.state.user.auth.login
      },
      set (e) {
        this.$store.commit('user/SET_AUTH_LOG', e)
      }
    },
    password: {
      get () {
        return this.$store.state.user.auth.password
      },
      set (e) {
        this.$store.commit('user/SET_AUTH_PASS', e)
      }
    }
  },

  methods: {
    async login() {
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.$store.state.user.auth.login,
          password: this.$store.state.user.auth.password,
          remember: true,
        },
      })
      .then(() => {
        this.$notify({
          text: `Вход выполнен успешно!`,
          type: 'success',
          duration: 1500
        })
        if(this.$route.name == 'auth-callback') {
          this.$router.push('/')
          this.$store.commit('region/SET_OPEN_LOGIN', false)
        } else {
          location.reload() // обязательно, т.к. разный контент на главной странице
        }
      })
      .catch((e) => {
        this.$notify({
          title: `E-mail или пароль введены неверно!`,
          text: `Проверьте правильность ввода почты или пароля! Либо войдите ч/з соц. сети.`,
          type: 'error',
          duration: 5000
        })
      })
    },
  },
}
</script>


<style lang="scss">
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
</style>
