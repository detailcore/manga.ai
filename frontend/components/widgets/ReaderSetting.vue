<template>
  <div class="modal">
    <div class="header"> Настройки чтения <mdi-Close class="btn close" title="Закрыть" @click="hide" /> </div>
    <div class="main">

      <div class="point">
        <div class="title"> Режим чтения </div>
        <div class="values">
          <div class="value" :class="{ selected: !isHorizontal }" @click="setMode('vertically')"> Вертикальный </div>
          <div class="value" :class="{ selected: isHorizontal }" @click="setMode('horizontally')"> Горизонтальный </div>
        </div>
        <div class="title"> Комментарии в читалке </div>
        <div class="values">
          <div class="value" :class="{ selected: !commentsShow }" @click="setComments('hide')"> Отключены </div>
          <div class="value" :class="{ selected: commentsShow }" @click="setComments('show')"> Включены </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( 'reader', { mode: 'GET_MODE' }),
    ...mapGetters( 'reader', { comments: 'GET_SETTING_COMMENTS' }),

    isHorizontal() {
      return this.mode === 'horizontally'
    },
    commentsShow() {
      return this.comments === 'show'
    },
  },

  methods: {
    setMode(mode) {
      localStorage.setItem('mode', mode)
      this.$store.commit('reader/SET_SETTING_MODE', mode)
    },
    setComments(value) {
      if(this.$store.state.auth.loggedIn) {
        localStorage.setItem('commentsInReader', value)
        this.$store.commit('reader/SET_SETTING_COMMENTS', value)
      } else {
        this.$notify({
          text: 'Настройка доступна после регистрации.',
          type: 'error'
        })
      }
    },
    hide() {
      this.$store.commit('reader/SET_OPEN_SETTING', false)
    }
  },
}
</script>

<style lang="scss">
@include modal_window;
</style>