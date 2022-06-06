<template>
  <div class="reader-image">
    <div class="pages" v-if="mode === 'horizontally'">
      <WidgetsImage v-for="(image, index) of pageImages" :key="index" 
        :url="urlImage" 
        :sort="image.sort" 
        :link="image.link" 
        :page="image.page" />

      <div class="button">
        <div class="prev" :class="{ hidden: isFirst }" @click="prev"></div>
        <div class="next" @click="next"></div>
      </div>
    </div>


    <div class="pages" v-if="mode === 'vertically'">
      <div v-for="(images, i) of pageImages" :key="i" :id="images[0].page" :data-p="images[0].page" ref="page">
        <WidgetsImage v-for="(img, k) of images" :key="k"
          :url="urlImage" 
          :sort="img.sort" 
          :link="img.link" 
          :page="img.page" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  props: {
    pages: { type: Array, defualt: [] },
  },

  data() {
    return {
      count: 1
    }
  },

  computed: {
    ...mapGetters( 'reader', { mode: 'GET_MODE' }),
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { pageCur: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { idChapter: 'GET_ID_CHAPTER' }),
    ...mapGetters( 'reader', { numbers: 'GET_PAGE_NUMBERS' }),

    pageImages() { // массив т.к. картинки могут быть нарезаны на несколько part
      let result = []

      if(this.mode === 'horizontally') { //* Горизонтальный режим
        this.pages.forEach(item => {
          if( this.pageCur == item.page ) {
            result.push({
              link: item.link,
              page: item.page,
              sort: item.sort,
            })
          }
        })
      }

      if(this.mode === 'vertically') { //* Вертикальный режим
        result = Object.values(
          this.pages.reduce((r, cur) => {
            const key = 'k' + cur['page']; // символ "k" добавлен, чтобы автоматически не сортировало по цифровым ключам 
            (r[key] = r[key] || []).push(cur);
            return r;
          }, {})
        );
      }

      return result
    },

    urlImage({ $config: { urlMangaReader } }) {
      return urlMangaReader + this.idPost + '/' + this.idChapter + '/'
    },
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

  beforeMount() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 150)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },

  mounted() {
    this.loadImages()
  },

  methods: {
    handleScroll() {
      if(this.mode === 'vertically') {
        console.log('scrollY => ', window.scrollY)
        function isVisible(el) {
          let coords = el.getBoundingClientRect(),
              windowHeight = window.document.documentElement.offsetHeight,
              topVisible = coords.top > 0 && coords.top < windowHeight, // виден верхний край элемента
              bottomVisible = coords.bottom < windowHeight && coords.bottom > 0; // виден нижний край элемента
  
          return (topVisible || bottomVisible)
        }
  
        function showVisible(context) {
          for (const item of context.$refs.page) {
            let page = +item.dataset.p
            if(!page) continue
  
            if(isVisible(item)) {
              console.log('page =>', page)
              context.$store.commit('reader/SET_PAGE_CURRENT_VERTICALLY', page)
              return false
            }
          }
          return false
        }
  
        showVisible(this)
      }
    },
    last() {
      this.$nuxt.$emit('go-to-next-chapter', 'any payload')
    },
    prev() {
      if(this.pageCur > 1) {
        this.count = +this.pageCur
        this.setPage(--this.count)
      }
    },
    next() {
      if(this.pageCur < this.lastPage) {
        this.count = +this.pageCur
        this.setPage(++this.count)
      } else { // Переключение на следующую главу, если страницы закончились
        this.last()
      }
    },
    setPage(num, id=this.idChapter, alias=this.$route.params.alias) {
      this.$store.commit('reader/SET_PAGE_CURRENT', { num: num, id: id, alias: alias })
    },
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

<style lang="scss" scoped>
.reader-image {
  display: flex;
  justify-content: center;
  .pages {
    max-width: 100%;
    position: relative;
    .page {
      display: flex;
      flex-direction: column;
    }
    img {
      margin: 0;
      padding: 0;
    }
    .button {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      .prev {
        width: 40%;
        top: 0;
        left: 0;
        position: inherit;
      }
      .next {
        width: 40%;
        top: 0;
        right: 0;
        position: inherit;
      }
      .prev,
      .next {
        height: 100%;
        cursor: pointer;
        background-color: rgba(255, 0, 140, 0.5);
      }
    }
  }
}
</style>
