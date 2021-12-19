<template>
  <div class="reader-image">
    <img :src="urlImage + image.link" alt="" srcset="" v-for="(image, index) of pageImages" :key="index">
    <!-- <img src="https://img.mangaclub.ru/1053//v1_c1_p002-u4290-1053-14845063170119.jpg" alt="TEST IMG" srcset="" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    pages: { type: Array, defualt: [] },
  },

  computed: {
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),

    pageImages() {
      let result = []
      this.pages.forEach(item => {
        if( this.pageCur == item.page ) {
          result.push(item)
        }
      });
      return result
    },

    urlImage() {
      return '/'
    },

  },
};
</script>

<style lang="scss">
.reader-image {
  display: flex;
  justify-content: center;
}
</style>
