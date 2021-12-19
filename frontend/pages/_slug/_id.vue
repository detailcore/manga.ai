<template>
  <div class="reader">
    <ReaderLineInfo
      :idChapter="chapter.id" 
      :chapterNum="chapter.chapter" />
    <ReaderImage :pages="chapter.pages" />
    <ReaderLineTeam />


    
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
    </small> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'reader',

  async asyncData({ store, route }) {
    const idChapter = +route.params.id.replace('ch', '')
    await store.dispatch('reader/FETCH_CHAPTER', idChapter)
  },

  mounted() {
    this.setMaxPage()
  },

  computed: {
    ...mapGetters( 'reader', { chapter: 'GET_CHAPTER' }),
    ...mapGetters( 'reader', { pageMax: 'GET_PAGE_MAX' }),
  },

  methods: {
    setMaxPage() {
      let index = (this.chapter) ? this.chapter.pages.length-1 : 0
      let count = this.chapter.pages[index].page
      this.$store.commit('reader/SET_PAGE_MAX', count)
    },
  },
}
</script>

<style lang="scss">
</style>
