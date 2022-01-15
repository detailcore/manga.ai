<template>
  <div class="modal">
    <div class="header"> Создать жалобу <mdi-Close class="btn close" title="Закрыть" /> </div>

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

        <textarea v-model="text" :maxlength="maxText" rows="5" placeholder="Введите уточняющий текст"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов максимум</div>
      </div>
    </div>

    <div class="footer">
      <div class="modal_btn" @click.prevent="send"> Отправить </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      maxText: 300,
      selected: '',
    }
  },

  computed: {
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
      if( this.cause && this.text.length > 1 ) {
        await this.$store.dispatch('post/FETCH_COMPLAINT', {
          text: this.text.substring(0, this.maxText),
          cause: this.cause,
          route: this.$route.fullPath,
          user: '',
        })
      }
      
    }
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