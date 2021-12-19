<template>
  <div class="chapters">
    <!-- <div class="chapter" v-for="(item, index) in currentChapters" :key="index"> -->
      <widgets-chapter v-for="(item, index) in currentChapters" :key="index" :chapters="item" />
    <!-- </div> -->
    <!-- <button @click="nextPage()">nextPage</button>
    <button @click="prevPage()" v-show="page>1">prevPage</button> -->
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

  async created() {
    if(+this.id !== +this.idPost) {
      await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: this.page })
    }
  },

  computed: {
    ...mapGetters( 'post', { chapters: 'GET_CHAPTERS' }),

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

  methods: {
    async nextPage() {
      await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: ++this.page })
    },
    async prevPage() {
      if(this.page > 1) {
        await this.$store.dispatch('post/FETCH_CHAPTERS', { id: this.id, sort: this.sort, page: --this.page })
      }
    },
  },
};
</script>


<style lang="scss">
.chapters {
  display: flex;
  flex-direction: column;
  margin: 10px 8px 0 0;
}
</style>
