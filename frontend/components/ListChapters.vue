<template>
  <div class="chapters">
    <Pagination :sourceLinks="chapters.links" :type="'POST_CHAPTER_LIST'" :sort="sort" v-if="isLoaded" />
    
    <widgets-chapter v-for="(item, index) in currentChapters" :key="index" :chapters="item" />
    
    <Pagination :sourceLinks="chapters.links" :type="'POST_CHAPTER_LIST'" :sort="sort" v-if="isLoaded" />
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

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
      return this.chapters.data ? this.chapters.data.length > 0 : false
    },
    idPost() {
      return this.$store.state.post.idByChapter
    },
    currentChapters() {
      let result = []

      if(this.chapters.data) {
        result = Object.values(
          this.chapters.data.reduce((r, cur) => {
            const key = 'k' + cur['chapter']; // символ "k" добавлен, чтобы автоматически не сортировало по цифровым ключам 
            (r[key] = r[key] || []).push(cur);

            return r;
          }, {})
        );
      }

      return result
    },
  },

  async created() {
    if(+this.id !== +this.idPost) {
      await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: this.page })
    }
  },

  methods: {
    // async nextPage() {
    //   await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: ++this.page })
    // },
    // async prevPage() {
    //   if(this.page > 1) {
    //     await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: --this.page })
    //   }
    // },
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
</style>
