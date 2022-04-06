<template>
  <header class="region__header">
    <div class="header">
      <div class="header__home">
        <Nuxt-link to="/" class="btn"><mdi-Home title="Главная страница" /></Nuxt-link>
        <div class="info">
          <div class="name">{{ name }}</div>
          <Nuxt-link :to="alias" class="title">{{ title }}</Nuxt-link>
        </div>
      </div>

      
      <div class="btn-line">
        <button @click="prevChapter">
          <mdi-MenuLeft title="Предыдущая глава" />
        </button>
        <WidgetsSelectChapter />
        <button @click="nextChapter">
          <mdi-MenuRight title="Слудующая глава" />
        </button>
      </div>

      <div class="header__control">
        <ListBookmark v-if="1" :id_chapter="idChapter" :id_post="idPost" />
        <!-- <span class="divider"> | </span> -->
        <!-- <div class="btn">
          <mdi-Bell title="Уведомления" />
        </div> -->
        <div class="btn" @click="openHideSetting">
          <mdi-Cog title="Настройки" />
        </div>
        <!-- <span class="divider"> | </span> -->
        <Region-User />
        <!-- <div class="btn">
          <mdi-Account title="Пользователь" />
        </div> -->
        
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( 'reader', { post: 'GET_POST' }),
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { name: 'GET_CHAPTER_NAME' }),
    ...mapGetters( 'reader', { isOpen: 'GET_OPEN_SETTING' }),

    alias() {
      return (this.post.alias) ? '/manga/'+this.post.alias : '/'
    },

    title() {
      return (this.post.title_rus) ? this.post.title_rus : this.post.title_eng
    },
    idChapter() {
      return this.$route.params.id ? +this.$route.params.id.replace('ch', '') : undefined
    },
  },

  methods: {
    prevChapter() {},
    nextChapter() {},
    openHideSetting() {
      this.$store.commit('reader/SET_OPEN_SETTING', !this.isOpen)
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
        .divider {
          padding: 0 6px;
        }
      }
    }
  }
  // .btn-line {
  //   @include btn_line;
  // }
</style>