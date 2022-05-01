<template>
  <div class="bookmarks">
    <div class="bookmarks__selected" @click="openBookmark" v-click-outside="close">
      <mdi-BookmarkPlus title="Добавить в закладки" v-if="bookmarkName === 'В закладки'" />
      <mdi-Bookmark :title="'В закладках ' + bookmarkName" v-else />
      <span class="name"> {{ bookmarkName }} </span>
      <mdi-MenuUp title="Закрыть закладки" v-if="showBookmarkList"/>
      <mdi-MenuDown title="Открыть закладки" v-if="!showBookmarkList"/>
    </div>

    <div class="bookmarks__list" v-show="showBookmarkList">
      <span class="bookmark" v-for="item in bookmarks" :key="item.id" @click="createBookmark(item.id)">
        <mdi-Plus :title="'Добавить в '+ item.name" />
        {{ item.name }}
      </span>
      <span class="bookmark del" @click.prevent="deleteBookmark()" v-if="!isEmptyBookmark">
        Удалить из закладок
        <mdi-TrashCan title="Удалить из закладок" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id_post: { type: Number, default: undefined },
    id_chapter: { type: Number, default: undefined },
  },

  data() {
    return {
      showBookmarkList: false,
    }
  },

  // async fetch() {
  //   // await this.$store.dispatch('bookmark/FETCH_BOOKMARK_LIST')
  //   // await this.$store.dispatch('bookmark/FETCH_BOOKMARK', { id: this.id_post, id_user: this.userId })
  //   if(this.bookmarks.length === 0) await this.$store.dispatch('bookmark/FETCH_BOOKMARK_LIST')
  //   if(this.isEmptyBookmark.id === undefined) await this.$store.dispatch('bookmark/FETCH_BOOKMARK', { id: this.id_post, id_user: this.userId })
  // },

  mounted() {
    this.init()
  },

  computed: {
    ...mapGetters( 'bookmark', { bookmarks: 'GET_BOOKMARK_LIST' }),
    ...mapGetters( 'bookmark', { currentBookmark: 'GET_BOOKMARK' }),

    userId() {
      return this.$store.state.auth.loggedIn ? this.$store.state.auth.user.id : false
    },
    isEmptyBookmark() {
      return (this.bookmarkName === 'В закладки') ? true : false
    },
    bookmarkName() {
      return !this.currentBookmark ? 'В закладки' : this.currentBookmark.name
    },
  },

  methods: {
    init() {
      if(this.userId) {
        if(this.bookmarks.length === 0) this.$store.dispatch('bookmark/FETCH_BOOKMARK_LIST')
        this.$store.dispatch('bookmark/FETCH_BOOKMARK', { id: this.id_post, id_user: this.userId })
      }
    },
    createBookmark(id) { // Создать/Изменить
      this.$store.dispatch('bookmark/FETCH_CREATE_BOOKMARK', {
        id: this.currentBookmark.id ? this.currentBookmark.id : undefined,  // м.б. undefined
        id_bookmark: id,
        id_post: this.id_post,
        id_chapter: this.id_chapter,  // м.б. undefined
        id_user: this.$store.state.auth.user.id,
      })
    },
    deleteBookmark() {
      this.$store.dispatch('bookmark/FETCH_DELETE_BOOKMARK', this.currentBookmark.id)
    },
    openBookmark() {
      this.showBookmarkList = !this.showBookmarkList
    },
    close() {
      this.showBookmarkList = false
    },
  },
}
</script>

<style lang="scss">
  .bookmarks {
    position: relative;
    &__selected {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      cursor: pointer;
      margin: 4px 0;
      padding: 6px;
      position: relative;
      border-radius: 6px;
      white-space: nowrap;
      border: thin solid rgba(255, 255, 255, 0.12);
      .material-design-icon {
        margin-right: 8px;
      }
    }
    &__list {
      position: absolute;
      display: flex;
      border-radius: 6px;
      flex-direction: column;
      z-index: 5;
      width: 100%;
      background-color: #121212;
      border: thin solid rgba(255, 255, 255, 0.12);
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
      .bookmark {
        padding: 6px;
        cursor: pointer;
        border-radius: 6px;
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: row;
        .material-design-icon {
          margin: 0 6px;
          font-size: 1.2rem;
        }
      }
      .bookmark.del {
        margin-top: 12px;
        justify-content: center;
        border: thin solid rgba(255, 0, 0, 0.25);
      }
    }
    &__selected,
    &__list > .bookmark {
      &:hover {
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
    }
  }
</style>
