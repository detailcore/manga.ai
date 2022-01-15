<template>
  <div class="reader-image">
    <div class="pages">
      <WidgetsImage v-for="(image, index) of pageImages" :key="index" 
        :url="urlImage" 
        :sort="image.sort" 
        :link="image.link" 
        :page="image.page" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    pages: { type: Array, defualt: [] },
  },

  computed: {
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { idChapter: 'GET_ID_CHAPTER' }),

    pageImages() { // массив т.к. картинки могут быть нарезаны на несколько patr
      let result = []
      this.pages.forEach(item => {
        if( this.pageCur == item.page ) {
          result.push({
            link: item.link,
            page: item.page,
            sort: item.sort,
          })
        }
      });
      return result
    },

    urlImage({ $config: { urlMangaReader } }) {
      return urlMangaReader + this.idPost + '/' + this.idChapter + '/'
    },
  },

  mounted() {
    this.loadImages()
  },

  methods: {
    loadImages() {
      let newImageObj = [],
          urlImage = this.urlImage
      
      for (const item of this.pages) {
        newImageObj.push(item)
      }
      
      function loadImage(url, httpFolder) {
        return new Promise(function(resolve, reject)
        {
          let img = new Image()
          img.onload = function() {
            //в случае успешной загрузки изображения, результат "обещания" будет url этого изображения
            return resolve(url)
          }
          img.onerror = function() {
            //в случае не успешной загрузки изображения, результат "обещания" будет url этого изображения
            return reject(url)
          }
          img.src = httpFolder + url.link;
        });
      }

      function displayImages(images) {
        let imgSrc = images.shift(); // проходим по массиву с изображениями
        if (!imgSrc) return; //если в результате рекурсии прошлись по всему массиву

        //если в массиве еще есть изображение, загружаем его
        return loadImage(imgSrc, urlImage)
          .then((url) => {
            //загружает картинку по очереди
            return displayImages(images); //рекурсия
          })
          .catch((url) => {
            console.log('ОШИБКА', url);
            return displayImages(images); //рекурсия
            // если какое-то из изображений не загрузилось, переходим к следующему изображению
          });
      }
      displayImages(newImageObj)
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
    align-items: center;
    flex-direction: column;
    .page {
      display: flex;
      flex-direction: column;
    }
    img {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
