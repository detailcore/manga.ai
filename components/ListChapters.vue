<template>
  <div class="chapters">
    <Pagination :sourceLinks="chapters.links" :type="'POST_CHAPTER_LIST'" :sort="sort" v-if="isLoaded" />

    <Widgets-Chapter v-for="(item, index) in currentChapters" :key="index" :chapters="item" />

    <Pagination :sourceLinks="chapters.links" :type="'POST_CHAPTER_LIST'" :sort="sort" v-if="isLoaded" />
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import { mergeDuplicates } from '~/services/util'

export default {
  props: {
    id: { type: Number, required: true }, // id поста
  },

  data() {
    return {
      page: 1,
      sort: 'desc',
    }
  },

  computed: {
    ...mapGetters( 'post', { chapters: 'GET_CHAPTERS' }),

    isLoaded() {
      return this.chapters.data ? (this.chapters.data.length > 0 && this.chapters.last_page > 1) : false
    },
    idPost() {
      return this.$store.state.post.idByChapter
    },
    currentChapters() {
      return mergeDuplicates(this.chapters.data)
    },
  },

  mounted() {
    if(window.innerWidth <= 710) {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
    }
  },

  async created() {
    if(+this.id !== +this.idPost) {
      await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: this.page })
    }
  },
};
</script>


<style lang="scss">
.chapters {
  display: flex;
  flex-direction: column;
  margin: 10px 8px 0 0;
  .pagination {
    .btn {
      margin: 0 8px !important;
    }
  }
}
.mobile {
  .chapters {
    width: 100%;
    height: calc(100% - 129px);
    top: 129px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    z-index: 10;
    display: table;
    position: absolute;
    background: #121212;
  }
}
</style>
