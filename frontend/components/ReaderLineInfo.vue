<template>
  <div class="reader-chapter-line" :class="{ container: mode === 'horizontally' }">

    <div class="btn-line">
      <div class="btn-text-action" @click="setComplaint">
        <mdi-ExclamationThick title="Пожаловаться" />
        <span class="mb_hidden"> Пожаловаться </span>
      </div>
    </div>

    <div class="btn-line" v-if="mode === 'vertically'">
      <div class="btn-text-action" @click="openComments">
        <mdi-CommentMultiple title="Показать комментарии" />
        <span class="mb_hidden"> Комментарии </span>
      </div>
    </div>

    <div class="btn-line">
      <button @click="prevPage" :class="{ hidden: isFirst }">
        <mdi-ChevronLeft title="Предыдущая страница" />
      </button>
      <WidgetsSelect :type="'Страница'" />
      <button @click="nextPage" :class="{ hidden: isLast }">
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
  },

  data() {
    return {
      count: 1,
    }
  },

  computed: {
    ...mapGetters( 'reader', { mode: 'GET_MODE' }),
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { numbers: 'GET_PAGE_NUMBERS' }),
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { showComments: 'GET_OPEN_COMMENTS' }),
    ...mapGetters( 'complaint', { openComplaint: 'GET_COMPLAINT_OPEN' }),

    lastPage() {
      return this.numbers[this.numbers.length-1]
    },
    isFirst() {
      return this.numbers[0] === this.pageCur
    },
    isLast() {
      return this.pageCur === this.lastPage
    },
  },

  methods: {
    openComments() {
      this.$store.commit('reader/SET_OPEN_COMMENTS', !this.showComments)
    },
    setComplaint() {
      this.$store.commit('complaint/SET_COMPLAINT_OPEN', { id: null, value: !this.openComplaint.value })
    },
    nextPage() {
      if(this.pageCur < this.lastPage) {
        this.count = +this.pageCur
        this.$store.commit('reader/SET_PAGE_CURRENT', { num: ++this.count, id: this.idChapter, alias: this.$route.params.alias })
      }
    },
    prevPage() {
      if(this.pageCur > 1) {
        this.count = +this.pageCur
        this.$store.commit('reader/SET_PAGE_CURRENT', { num: --this.count, id: this.idChapter, alias: this.$route.params.alias })
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
    &.vertically {
      padding: 2px 0px 3px 0px;
      background-color: #121212;
      border-top: thin solid rgba(255, 255, 255, 0.12);
    }
  }
  .vertically {
    .btn-line .btn-select .values {
      top: inherit;
      bottom: 100%
    }
  }
  .btn-line {
    @include btn_line;
  }
</style>
