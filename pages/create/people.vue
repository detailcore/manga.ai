<template>
  <div class="create container">
    <div class="block__title">Добавление персоны (автора/художника)</div>
    <div class="create__fields">

      <div class="create__fields__input">
        <div class="note">
          <p>Имя иероглифами или иное написание имени указываются в поле <b>"Известен так же под именем"</b></p>
          <p>Если вы не нашли имя на английском, то его можно конвертировать в <a href="http://www.romajidesu.com/translator" rel="nofollow noreferrer" target="_blank">Ромадзи(ссылка)</a> или перевести на Английский с помощью переводчика</p>
        </div>
      </div>

      <div class="create__fields__input">
        <span>Имя на английском (без иероглифов) *</span>
        <input type="text" v-model.trim="people.name_eng">
        <span>Имя на русском </span>
        <input type="text" v-model.trim="people.name_rus">
        <span>Известен так же под именем</span>
        <input type="text" v-model.trim="people.name_alt" placeholder="альтернативные имена, разделять символом '/'">
        <span>Описание</span>
        <textarea v-model="people.description" :maxlength="maxText"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
      </div>
    </div>
    <div class="action">
      <button class="save" @click.prevent="send()" :disabled="disabled">Сохранить</button>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

    <notifications />

  </div>
</template>

<script>
import { createPeople } from '~/services/api'

export default {
  data() {
    return {
      disabled: false,
      maxText: 1024,
      people: {
        name_eng: '',
        name_rus: '',
        name_alt: '',
        description: '',
      }
    }
  },

  computed: {
    lengthText() {
      return this.people.description.length
    },
  },

  methods: {
    async send() {
      this.disabled = true
      if(this.people.name_eng) {
        let response = await createPeople(this.people) // создаём

        if(response.status === 'ok') {
          this.$notify({
            text: response.msg,
            type: 'success',
            duration: 5000,
          })
          this.people = {
            name_eng: '',
            name_rus: '',
            name_alt: '',
            description: '',
          }
        }
      } else {
        this.$notify({
          text: 'Поля со звёздочкой "*" обязательны для заполнения',
          type: 'error',
        })
      }
      this.disabled = false
    },
  },
};
</script>

<style lang="scss">
  @include action_save;
  @include creation_pages;
</style>
