<template>
  <div class="reader-image">
    <div class="pages" v-if="mode === 'horizontally'">
      <LazyWidgetsImage v-for="(image, index) of pageImages" :key="index"
        :url="urlImage"
        :loaded="image.loaded"
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
        <LazyWidgetsImage v-for="(img, k) of images" :key="k"
          :url="urlImage"
          :loaded="img.loaded"
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
    pages: { type: Array, default: [] },
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
              loaded: item.loaded,
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
    isReader() {
      return this.$route.name === 'manga-alias-id'
    },
  },

  beforeMount() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 150)
    window.addEventListener('scroll', this.handleDebouncedScroll)
    // window.addEventListener('keydown', this.keyBoardControl)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
    // window.removeEventListener('keydown', this.keyBoardControl)
  },

  async mounted() {
    await this.loadImages()
  },

  methods: {
    //! Отключено, т.к. при вводе комментариев будет перелистывание страницы
    // keyBoardControl(e) {
    //   if((e.code === 'ArrowLeft' || e.code === 'KeyA') && !this.isFirst) this.prev()
    //   if(e.code === 'ArrowRight' || e.code === 'KeyD') this.next()
    //   if(e.code === 'ArrowDown' || e.code === 'KeyS') { // FIXME: не учтено, что пользователь уже мог прокрутить до нижней части страницы
    //     window.scrollBy({
    //       top: window.innerHeight / 1.1,
    //       left: 0,
    //       behavior: 'smooth'
    //     })
    //   }
    //   if((e.code === 'ArrowUp' || e.code === 'KeyW') && window.pageYOffset != 0) {
    //     window.scrollBy({
    //       top: -window.innerHeight / 1.1,
    //       left: 0,
    //       behavior: 'smooth'
    //     })
    //   }
    // },
    handleScroll() {
      if(this.mode === 'vertically') {
        // console.log('scrollY => ', window.scrollY)
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
              // console.log('page =>', page)
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

    // FIXME: Картинки на телефоне грузятся одновременно не дожидаясь загрузки предыдущих изображений, что забивает весь канал при плохой сети
    async loadImages() {
      for (const item of this.pages) {
        const loaded = await loadImage(this.urlImage, item)
        this.$store.commit('reader/SET_PAGE_LOADED', { id: item.id, loaded: loaded })
        await new Promise(r => setTimeout(r, 200)) // пауза между загрузками картинок
      }

      async function loadImage(http, item) {
        return await new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = function() {
            return resolve(true)
          }
          img.onerror = function() {
            return reject(false)
          }
          img.src = http + item.link;
        })
      }
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
        // background-color: rgba(255, 0, 140, 0.5);
      }
    }
  }
}
</style>
