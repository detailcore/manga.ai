<template>
  <div class="reader-chapter-line container">
    <div class="btn-line">
      <div class="btn-text-action">
        <mdi-ExclamationThick title="Пожаловаться" />
        <span> Пожаловаться </span>
      </div>
    </div>
    <div class="btn-line">
      <button>
        <mdi-MenuLeft title="Предыдущая глава" />
      </button>
      <div class="btn-select">
        Глава {{ chapterNum }}
      </div>
      <button>
        <mdi-MenuRight title="Слудующая глава" />
      </button>
    </div>
    <div class="btn-line">
      <button @click="prevPage">
        <mdi-ChevronLeft title="Предыдущая страница" />
      </button>
      <!-- <div class="btn-select">
        Страница {{ pageCur }}/{{ pageMax }}
      </div> -->
      <!-- <select v-model="pageCur">
        <option v-for="item in pageMax" :value="item" :key="item">
          Страница {{ pageCur }}/{{ pageMax }}
        </option>
      </select> -->
      <WidgetsSelect :type="'Страница'" />
      <button @click="nextPage">
        <mdi-ChevronRight title="Слудующая страница" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    idChapter: { type: Number, defualt: 0 },
    chapterNum: { type: String, defualt: '' },
  },

  data() {
    return {
      count: 1,
    }
  },

  computed: {
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { pageMax: 'GET_PAGE_MAX' }),
  },

  methods: {
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
    .btn-line {
      @include btn_line;
    }
  }
</style>
