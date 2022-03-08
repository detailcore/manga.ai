<template>
  <div class="create container">
    <div class="block__title">
      <Nuxt-link to="/" class="cancel"> {{ postTitle }} </Nuxt-link>
      <mdi-MenuRight />
      Редактировать главу
    </div>
    <div class="create__fields">

      <div class="create__fields__input">
        <span>Название</span>
        <input type="text">
      </div>
    </div>
    <div class="action">
      <div class="save">Сохранить</div>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ store, route }) {
    const idChapter = +route.params.id.replace('ch', '')
    await store.dispatch('reader/FETCH_CHAPTER', idChapter) // получить текущую главу
  },

  computed: {
    ...mapGetters( 'reader', { chapter: 'GET_CHAPTER' }),

    postTitle() {
      return this.chapter ? (this.chapter.post ? this.chapter.post.title_rus : this.chapter.post.title_eng) : ''
    },
  },

  methods: {
  },
}
</script>

<style lang="scss">
  @include creation_pages;
</style>