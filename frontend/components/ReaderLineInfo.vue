<template>
  <div class="reader-chapter-line container">
    <div class="btn-line">
      <div class="btn-text-action" @click="setComplaint(!isOpenComplaint)">
        <mdi-ExclamationThick title="Пожаловаться" />
        <span> Пожаловаться </span>
      </div>
    </div>
    <div class="btn-line">
      <button @click="prevPage">
        <mdi-ChevronLeft title="Предыдущая страница" />
      </button>
      <WidgetsSelect :type="'Страница'" />
      <button @click="nextPage">
        <mdi-ChevronRight title="Слудующая страница" />
      </button>
    </div>
    
    <WidgetsReaderSetting v-if="isOpenSetting" />
    <WidgetsComplaint v-if="isOpenComplaint" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    idChapter: { type: Number, defualt: 0 },
  },

  data() {
    return {
      count: 1,
    }
  },

  computed: {
    ...mapGetters( 'reader', { pageMax: 'GET_PAGE_MAX' }),
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { isOpenSetting: 'GET_OPEN_SETTING' }),
    ...mapGetters( 'post', { isOpenComplaint: 'GET_COMPLAINT_OPEN' }),
    // ...mapGetters( 'reader', { chapterCur: 'GET_CHAPTER_CURRENT' }),
    // ...mapGetters( 'reader', { listChapter: 'GET_CHAPTER_LIST' }),
  },

  methods: {
    setComplaint(value) {
      this.$store.commit('post/SET_COMPLAINT_OPEN', value)
    },
    nextPage() {
      if(this.pageCur < this.pageMax) {
        this.count = +this.pageCur
        this.$store.commit('reader/SET_PAGE_CURRENT', ++this.count)
      }
    },
    prevPage() {
      if(this.pageCur > 1) {
        this.count = +this.pageCur
        this.$store.commit('reader/SET_PAGE_CURRENT', --this.count)
      }
    },
  },
};
</script>

<style lang="scss">
  .reader-chapter-line {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .btn-line {
    @include btn_line;
  }
</style>
