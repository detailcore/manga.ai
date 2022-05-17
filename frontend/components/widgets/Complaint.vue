<template>
  <div class="modal">
    <div class="header"> Создать жалобу <mdi-Close class="btn close" title="Закрыть" @click="close" /> </div>

    <div class="main">
      <div class="point">
        <div class="title"> Пожаловаться на: </div>
        <select v-model="selected">
          <option disabled value=""> Выберите причину из вариантов </option>
          <option v-for="(item, index) in list" :value="index" :key="index">
            {{ item }}
          </option>
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
// import { mapGetters } from 'vuex'

export default {
  props: {
    id: { type: Number, defualt: null }, // id поста, комментария, или того, на что жалуются
    page: { type: Number, defualt: null }, // страница в читалке
    id_user: { type: Number, defualt: null }, // id пользователя, которому принадлежит пост, комментарий и т.д. на который поступила жалоба
    content: { type: String, defualt: '' }, // контент комментария
    type: { type: String, defualt: 'reader' }, // тип: post, reader, comment
    action: { type: Boolean, default: false },
  },

  data() {
    return {
      text: '',
      maxText: 300,
      selected: '',
    }
  },

  computed: {
    // ...mapGetters( 'complaint', { isOpenComplaint: 'GET_COMPLAINT_OPEN' }),

    lengthText() {
      return this.text.length
    },
    id_owner() {
      return this.id_user
    },
    list() {
      if(this.type === 'comment') {
        return [
          'Спойлер',
          'Реклама / Спам',
          'Ненормативная лексика',
          'Провокации / Конфликты',
          'Оскорбление пользователей',
          'Запрещенный / непотребный контент',
          'Флуд / Оффтоп / Комментарий без смысла',
        ]
      }
      if(this.type === 'reader') {
        return [
          'Дубликат',
          'Перепутаны страницы',
          'Не грузится изображение',
          'Другое',
        ]
      }
      if(this.type === 'post') {
        return [
          'Дубликат',
          'Другое',
        ]
      }
    },
  },

  methods: {
    close() {
      this.$store.commit('complaint/SET_COMPLAINT_OPEN', { id: this.id, value: false, type: '' })
    },
    async send() {
      let id_sender = this.$auth.loggedIn ? this.$store.state.auth.user.id : 0 //* id отправителя жалобы или 0

      if(this.text.length > 1) {
        await this.$store.dispatch('complaint/FETCH_COMPLAINT', {
          text: this.text.substring(0, this.maxText),
          cause: this.list[+this.selected],
          link: this.type === 'reader' ? this.$route.fullPath + '?page=' + this.page : this.$route.fullPath,
          id_content: this.id,
          id_user: this.id_user,
          id_sender: id_sender,
          type: this.type,
          content: this.content,
        })        
        .then(() => {
          this.$store.commit('complaint/SET_COMPLAINT_OPEN', { id: this.id, value: false, type: '' })
        })
      }
    },
    setIdComplaint(value) {
      this.$store.commit('complaint/SET_ID_COMPLAINT', value)
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