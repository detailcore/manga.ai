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
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( 'reader', { mode: 'GET_MODE' }),

    isHorizontal() {
      return this.mode === 'horizontally'
    }
  },

  methods: {
    setMode(mode) {
      localStorage.setItem('mode', mode)
      this.$store.commit('reader/SET_MODE', mode)
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