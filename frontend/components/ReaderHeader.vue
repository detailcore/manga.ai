<template>
  <header class="region__header">
    <div class="header">
      <div class="header__home">
        <Nuxt-link to="/" class="btn"><mdi-Home title="Главная страница" /></Nuxt-link>
        <Nuxt-link to="/test" class="btn"><mdi-Bookshelf title="Каталог" /></Nuxt-link>
        <div class="info">
          <div class="name">{{ name }}</div>
          <Nuxt-link :to="alias" class="title">{{ title }}</Nuxt-link>
        </div>
      </div>

      <div class="header__control">
        <div class="btn">
          <mdi-BookmarkPlus title="Добавить закладку" v-if="true" />
          <mdi-BookmarkMinus title="Удалить закладку" v-else />
        </div>
        <span> | </span>
        <Nuxt-link to="/test" class="btn"><mdi-BookmarkMultiple title="Закладки" /></Nuxt-link>
        <div class="btn">
          <mdi-Bell title="Уведомления" />
        </div>
        <div class="btn">
          <mdi-Account title="Пользователь" />
        </div>
        <span> | </span>
        <div class="btn">
          <mdi-Cog title="Настройки" />
        </div>
        
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( 'reader', { post: 'GET_POST' }),
    ...mapGetters( 'reader', { name: 'GET_CHAPTER_NAME' }),

    alias() {
      return (this.post.alias) ? '/'+this.post.alias : '/'
    },

    title() {
      return (this.post.title_rus) ? this.post.title_rus : this.post.title_eng
    },
  },
}
</script>

<style lang="scss" scoped>
  .region__header {
    background-color: $dark_primary;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    .header {
      height: 48px;
      padding: 0 15px;
      @include flex_space_center;
      &__home {
        .name {
          font-size: 1.125rem;
        }
        .title {
          font-weight: 500;
          color: $orange_primary;
        }
      }
      &__home,
      &__control {
        @include flex_center_center;
      }
    }
  }
</style>