<template>
  <div class="reader">
    <ReaderLineInfo :idChapter="chapter.id" v-if="mode === 'horizontally'" />

    <ReaderImage :pages="chapter.pages" />

    <ReaderLineTeam :likes="chapter.likes" />

    <ListComments class="comments" :class="{ vertically: isOpenComments, container: (mode === 'horizontally')}" />

    <headroom :footroom="true" v-if="mode === 'vertically'">
      <ReaderLineInfo :idChapter="chapter.id" :class="{ vertically: (mode === 'vertically')}" />
    </headroom>

    <WidgetsReaderSetting v-if="isOpenSetting" />
    <WidgetsComplaint v-if="isOpenComplaint" :id="chapter.id" :page="pageCur" :type="'reader'" />

    <!-- <small>
      <mdi-Account />
      <mdi-AccountDetails />
      <mdi-AccountGroupOutline />
      <mdi-Home />
      <mdi-Bell />
      <mdi-Close />
      <mdi-ThemeLightDark />
      <mdi-DiceMultiple />
      <mdi-Logout />
      <mdi-CardsHeart />
      <mdi-HeartOutline />
      <mdi-Magnify />
      <mdi-Star />
      <mdi-MenuDown />
      <mdi-MenuUp />
      <mdi-ImageText />
      <mdi-FormatListNumbered />
      <mdi-Image />
      <mdi-Eye />
      <mdi-CommentMultiple />
      <mdi-SortNumericAscending />
      <mdi-SortNumericDescending />
      <mdi-Reply />
      <mdi-ThumbUp />
      <mdi-ThumbDown />
      <mdi-Login />
      <mdi-At />
      <mdi-Google />
      <mdi-Plus />
      <mdi-Cog />
      <mdi-Earth />
      <mdi-FormatListText />
      <mdi-ClockOutline />
      <mdi-ArrowRightBottom />
      <mdi-Bookshelf />
      <mdi-BookmarkMultiple />
      <mdi-BookOpenPage />
      <mdi-BookmarkPlusOutline />
      <mdi-BookmarkPlus />
      <mdi-BookmarkMinus />
      <mdi-ExclamationThick />
      <mdi-ChevronLeft />
      <mdi-ChevronRight />
      <mdi-MenuLeft />
      <mdi-MenuRight />
      <mdi-Pencil />
      <mdi-TrashCan />
    </small> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { headroom } from "vue-headroom";

export default {
  layout: 'reader',

  components: {
    headroom
  },

  head() {
    return {
      title: 'Чтение манги ' + (this.chapter.post.title_rus ? this.chapter.post.title_rus : this.chapter.post.title_eng) + '. Глава ' + this.chapter.chapter + ' (страница ' + this.pageCur + ')',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Читать мангу ' + (this.chapter.post.title_rus ? this.chapter.post.title_rus : this.chapter.post.title_eng) + ' глава ' + this.chapter.chapter + ' ' + (this.chapter.name ? this.chapter.name : '') + '. Читать онлайн мангу.'
        }
      ]
    }
  },

  async asyncData({ store, route }) {
    const idChapter = +route.params.id.replace('ch', '')
    await store.dispatch('reader/FETCH_CHAPTER', idChapter) // получить текущую главу
  },

  mounted() {
    this.setFirstPage()
    this.initLocalStorage()
  },

  computed: {
    ...mapGetters( 'reader', { mode: 'GET_MODE' }),
    ...mapGetters( 'reader', { chapter: 'GET_CHAPTER' }),
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { isOpenSetting: 'GET_OPEN_SETTING' }),
    ...mapGetters( 'reader', { showComments: 'GET_OPEN_COMMENTS' }),
    ...mapGetters( 'complaint', { openComplaint: 'GET_COMPLAINT_OPEN' }),

    isOpenComments() {
      return (this.mode === 'vertically' && this.showComments)
    },
    isOpenComplaint() {
      return this.openComplaint.value && (this.openComplaint.type === 'reader')
    },
  },

  methods: {
    setFirstPage() {
      this.$store.commit('reader/SET_RESET_PAGE')
    },
    initLocalStorage() {
      let mode = localStorage.getItem('mode'),
          comments = localStorage.getItem('commentsInReader')

      localStorage.setItem('commentsInReader', 'show') // TODO: Удалить если буду делать скрытие комментариев

      // FIXME: Ниже идут строки инициализации скрытия комментариев
      // if(!comments) {
      //   localStorage.setItem('commentsInReader', 'hide')
      // } else {
      //   this.$store.commit('reader/SET_SETTING_COMMENTS', comments)
      // }

      if(!mode) {
        localStorage.setItem('mode', 'horizontally')
      } else {
        this.$store.commit('reader/SET_SETTING_MODE', mode)
      }
    },
  },
}
</script>

<style lang="scss">
.reader {
  .headroom--top {
    bottom: 0px !important;
    position: fixed !important;
  }
}
</style>
