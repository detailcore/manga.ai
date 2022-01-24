<template>
  <div class="modal">
    <div class="header"> Создать жалобу <mdi-Close class="btn close" title="Закрыть" @click="setComplaint(!isOpenComplaint)" /> </div>

    <div class="main">
      <div class="point">
        <div class="title"> Пожаловаться на: </div>
        <select v-model="selected">
          <option disabled value=""> Выберите причину из вариантов </option>
          <option value="1"> Не грузится изображение </option>
          <option value="2"> Перепутаны страницы </option>
          <option value="3"> Дубликат </option>
          <option value="4"> Другое </option>
        </select>

        <textarea v-model="text" :maxlength="maxText" rows="5" placeholder="Обязательно уточните причину жалобы"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов максимум</div>
      </div>
    </div>

    <div class="footer">
      <div class="modal_btn" @click="send"> Отправить </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      text: '',
      maxText: 300,
      selected: '',
    }
  },

  computed: {
    ...mapGetters( 'post', { isOpenComplaint: 'GET_COMPLAINT_OPEN' }),

    lengthText() {
      return this.text.length
    },
    cause() {
      switch (+this.selected) {
        case 1: return 'Не грузится изображение'
        case 2: return 'Перепутаны страницы'
        case 3: return 'Дубликат'
        case 4: return 'Другое'
        default: return false
      }
    },
  },

  methods: {
    async send() {
      let user = this.$auth.loggedIn ? this.$store.state.auth.user.id : 0
      if( this.cause && this.text.length > 1 ) {
        await this.$store.dispatch('post/FETCH_COMPLAINT', {
          text: this.text.substring(0, this.maxText),
          cause: this.cause,
          link: this.$route.fullPath,
          id_user: user,
          type: 'reader',
        })
        .then(() => {
          this.setComplaint(false)
        })
      }
    },
    setComplaint(value) {
      this.$store.commit('post/SET_COMPLAINT_OPEN', value)
    },
  },
}
</script>

<style lang="scss">
  @include modal_window;
  .limit {
    font-weight: 300;
    font-size: 0.9rem;
  }
</style>