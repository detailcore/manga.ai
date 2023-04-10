<template>
  <div class="conteiner">
    <div class="block__title">Почти закночили, нажмите "Продолжить" и потом "Вход" для завершения</div>
    <p><b>Обратите внимание</b>, при каждом новом входе через соц. сети, в аккаунт, <u>пароль изменяется автоматически</u>, поэтому рекомендуем сохранить пароль в браузере, и в будущем выполнять вход через почту и пароль.</p>

    <div class="submit" @click="modal(true)">Продолжить</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('user/SET_AUTH_LOG', this.$route.query.email)
    this.$store.commit('user/SET_AUTH_PASS', this.$route.query.password)
  },

  methods: {
    modal(value) {
      this.$store.commit('region/SET_OPEN_LOGIN', value)
    },
  },
}
</script>

<style lang="scss" scoped>
  .conteiner {
    max-width: 560px;
    padding: 0 12px;
    margin: 0 auto;
    display: flex;
    text-align: center;
    flex-direction: column;
    min-height: calc(100vh - 165px);
    align-items: center;
    justify-content: center;
    p {
      margin: 12px 0;
      color: #b5b5b5;
      font-size: 0.95rem;
      b {
        color: #ff6820;
      }
    }
  }
  .submit {
    width: 100%;
    padding: 6px;
    color: #fff;
    background-color: #121212;
    cursor: pointer;
    margin-top: 4px;
    border-radius: 6px;
    border: thin solid rgba(255, 255, 255, 0.12);
    border-bottom: thin solid rgba(0, 255, 34, 0.25);
    &:hover {
      opacity: .9;
      background-color: #303030;
    }
  }
</style>
