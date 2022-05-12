<template>
  <div class="reader">
    <ReaderLineInfo :idChapter="chapter.id" />
    <ReaderImage :pages="chapter.pages" />
    <ReaderLineTeam :likes="chapter.likes" />
    <LazyListComments class="comments container" />


    
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

export default {
  layout: 'reader',

  async asyncData({ store, route }) {
    const idChapter = +route.params.id.replace('ch', '')
    await store.dispatch('reader/FETCH_CHAPTER', idChapter) // получить текущую главу
  },

  mounted() {
    this.setFirstPage()
    this.initLocalStorage()
  },

  computed: {
    ...mapGetters( 'reader', { chapter: 'GET_CHAPTER' }),
  },

  methods: {
    setFirstPage() {
      // this.$router.push({ hash:"#1" }) 
      this.$store.commit('reader/SET_RESET_PAGE')
    },
    initLocalStorage() {
      let mode = localStorage.getItem('mode'),
          comments = localStorage.getItem('commentsInReader')

      if(!comments) {
        localStorage.setItem('commentsInReader', 'hide')
      } else {
        this.$store.commit('reader/SET_SETTING_COMMENTS', comments)
      }

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
</style>
