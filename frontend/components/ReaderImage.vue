<template>
  <div class="reader-image">
    <div class="pages">
      <span class="page" v-for="(image, index) of pageImages" :key="index">
        <img :src="urlImage + image.link">
      </span>
    </div>
    <!-- <img src="https://img.mangaclub.ru/1053//v1_c1_p002-u4290-1053-14845063170119.jpg" alt="TEST IMG" srcset="" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    pages: { type: Array, defualt: [] },
  },

  data() {
    return {
      isLoaded: false,
    }
  },

  computed: {
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { idChapter: 'GET_ID_CHAPTER' }),

    pageImages() {
      let result = []
      this.pages.forEach(item => {
        if( this.pageCur == item.page ) {
          result.push(item)
        }
      });
      return result
    },

    urlImage({ $config: { urlMangaReader } }) {
      return urlMangaReader + this.idPost + '/' + this.idChapter + '/'
    },

  },
};
</script>

<style lang="scss">
.reader-image {
  display: flex;
  justify-content: center;
  .pages {
    display: flex;
    flex-direction: column;
    .page {
      display: flex;
    }
    img {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
