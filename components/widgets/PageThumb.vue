<template>
  <div class="page" :class="{ duplicate_number: duplicate }">
    <div class="panel">
      <div class="controls" v-if="!disabled">
        <!-- <input type="checkbox"> -->
        <div class="btn" title="Удалить страницу" @click="removePage">
          <mdi-TrashCan title="Удалить страницу" />
        </div>
      </div>
    </div>
    <div class="thumb" :style="`background-image: url(${chapterFolder + currentPage.link})`"></div>
    <div class="name"> {{ currentPage.link }} </div>
    <div class="number">
      <input class="num"
            type="text"
            :value="currentPage.page"
            @change="changePage"
            :title="`${currentPage.sort}-я часть ${currentPage.page}-й страницы`"
            :disabled="disabled">
      <div class="sort">часть: {{ currentPage.sort }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    id: { type: Number, required: true },
    idPost: { type: Number, required: true },
    pageIds: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      page: {
        num: null,
        sort: null,
      },
    }
  },

  computed: {
    ...mapState( 'reader', ['duplicateIdPages'] ),
    ...mapGetters( 'reader', { pages: 'GET_CHAPTER_PAGES' }),

    currentPage() {
      return this.pages.filter(item => item.id === this.id)[0]
    },
    idChapter() {
      return +this.$route.params.id.replace('ch', '')
    },
    chapterFolder({ $config: { urlMangaReader } }) {
      return urlMangaReader + this.idPost + '/' + this.idChapter + '/'
    },
    disabled() {
      return this.currentPage.sort > 1
    },
    fullPageIds() {
      return this.pageIds[`page_${this.page.num}`]
    },
    duplicate() {
      return (this.duplicateIdPages.length > 0) ? this.duplicateIdPages.includes(this.id) : false
    },
  },

  created() {
    this.load()
  },

  methods: {
    load() {
      this.page.num = this.currentPage.page
      this.page.sort = this.currentPage.sort
    },
    removePage() {
      this.$store.commit('reader/SET_EDIT_CHAPTER_REMOVE_PAGE', this.fullPageIds)
    },
    changePage(e) { // изм номенра страницы
      this.$store.commit('reader/SET_CHAPTER_PAGE_EDIT', {
        id: +this.id,
        ids: this.fullPageIds,
        num: +e.target.value,
      })
    },
  },
}
</script>

<style lang="scss">
.page_main {
  .page {
    width: 144px;
    overflow: hidden;
    margin-right: 4px;
    position: relative;
    margin-bottom: 20px;
    background: #1e1e1e;
    border-radius: 2px;
    border: thin solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
    .panel {
      height: 36px;
      padding: 0 5px;
      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          margin: 0 12px;
          cursor: pointer;
        }
      }
    }
    .thumb {
      height: 180px;
      background-size: cover;
    }
    .name {
      left: 0;
      width: 100%;
      bottom: 36px;
      position: absolute;
      text-align: center;
      background: linear-gradient(rgb(255 255 255 / 0%), #1e1e1e);
    }
    .number {
      display: flex;
      height: 36px;
      padding: 0 5px;
      align-items: center;
      justify-content: space-between;
      .num {
        width: 50px;
        color: #fff;
        height: 24px;
        padding: 0 8px;
        font-size: inherit;
        text-align: center;
        border-radius: 2px;
        background: #1e1e1e;
        border: thin solid rgba(255, 255, 255, 0.12);
        &:disabled {
          cursor: not-allowed;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==) repeat;
        }
      }
      .sort {
        font-size: 0.9rem;
        font-weight: 200;
      }
    }
  }
  .duplicate_number {
    background-color: #900;
  }
}
</style>
