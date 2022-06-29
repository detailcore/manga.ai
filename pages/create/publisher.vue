<template>
  <div class="create container">
    <div class="block__title">Добавление издателя</div>
    <div class="create__fields">

      <div class="create__fields__input">
        <span>Название</span>
        <input type="text" v-model.trim="publisher.name_eng">
        <span>Название на русском</span>
        <input type="text" v-model.trim="publisher.name_rus">
        <span>Известен так же под именем</span>
        <input type="text" v-model.trim="publisher.name_alt" placeholder="альтернативные имена, разделять символом '/'">
        <span>Описание</span>
        <textarea v-model="publisher.description" :maxlength="maxText"></textarea>
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
import { createPublisher } from '~/services/api'

export default {
  data() {
    return {
      disabled: false,
      maxText: 1024,
      publisher: {
        name_eng: '',
        name_rus: '',
        name_alt: '',
        description: '',
      }
    }
  },

  computed: {
    lengthText() {
      return this.publisher.description.length
    },
  },

  methods: {
    async send() {
      this.disabled = true
      if(this.publisher.name_eng || this.publisher.name_rus) {
        let response = await createPublisher(this.publisher) // создаём

        if(response.status === 'ok') {
          this.$notify({
            text: response.msg,
            type: 'success',
            duration: 5000,
          })
          this.publisher = {
            name_eng: '',
            name_rus: '',
            name_alt: '',
            description: '',
          }
        }
      } else {
        this.$notify({
          text: 'Одно из названий обязательно к заполнению!',
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
