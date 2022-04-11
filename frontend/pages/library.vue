<template>
  <div class="container container_fullh content">
    <div class="search-results">
      <div class="block__title"> Библиотека </div>
      <div class="search-list">
        <Widgets-CardLibrary
          :id="item.id"
          :type="item.type"
          :alias="item.alias"
          :cover="item.cover"
          :title="item.title"
          v-for="item in posts"
          :key="item.id" />
      </div>
      <div class="more" v-show="!lastPage">
        <span class="more__button" @click.prevent="nextPage">Показать еще</span>
      </div>
    </div>

    <div class="search-filter">
      <div class="filter-layout" :class="{ 'is-hidden': (genresOpen || tagsOpen) }">
        <div class="filter-submenu">
          <div class="button" @click.prevent="genresOpen = !genresOpen"> Жанры <mdi-ChevronRight /> </div>
          <div class="button" @click.prevent="tagsOpen = !tagsOpen"> Теги <mdi-ChevronRight /> </div>

          <div class="checkbox-list">
            <div class="filter_title"> Тип </div>
            <div class="checkbox-list two-columns">
              <Widgets-CheckboxList v-for="item in filter.types" :key="'types'+item.id" :id="item.id" :type="'types'" :name="item.name" :reset="reset" />
            </div>

            <div class="filter_title"> Год выпуска </div>
            <!-- <div class="checkbox-list two-columns">
              <span>
                От: {{ year.from }}
                <input type="range" min="1930" :max="currentYear" step="1" v-model="year.from">
              </span>
              <span>
                До: {{ year.before }}
                <input type="range" min="1930" :max="currentYear" step="1" v-model="year.before">
              </span>
            </div> -->
            <div class="checkbox-list in-line">
              <input type="text" placeholder="От 1930" class="input" v-model="year.from">
              <span> — </span>
              <input type="text" :placeholder="'До ' +currentYear" class="input" v-model="year.before">
            </div>

            <!-- Еще не сделана логика в Бэкенде -->
            <!-- <div class="filter_title"> Рейтинг </div>
            <div class="checkbox-list in-line">
              <input type="text" placeholder="От 0.00" class="input" v-model="rating.from">
              <span> — </span>
              <input type="text" placeholder="До 5.00" class="input" v-model="rating.before">
            </div> -->

            <!-- в БД нет значений кроме value = 1 -->
            <!-- <div class="filter_title"> Возрастная группа </div>
            <div class="checkbox-list two-columns">
              <Widgets-CheckboxList v-for="item in filter.adult_ranks" :key="'adult_ranks'+item.id" :id="item.id" :type="'adult_ranks'" :name="item.name" :reset="reset" />
            </div> -->

            <div class="filter_title"> Формат выпуска </div>
            <div class="checkbox-list two-columns">
              <Widgets-CheckboxList v-for="item in filter.formats" :key="'formats'+item.id" :id="item.id" :type="'formats'" :name="item.name" :reset="reset" />
            </div>

            <div class="filter_title"> Статус перевода </div>
            <div class="checkbox-list two-columns">
              <Widgets-CheckboxList v-for="item in filter.status_of_translations" :key="'status_of_translations'+item.id" :id="item.id" :type="'status_of_translations'" :name="item.name" :reset="reset" />
            </div>

            <div class="filter_title"> Статус произведения </div>
            <div class="checkbox-list two-columns">
              <Widgets-CheckboxList v-for="item in filter.status_of_releases" :key="'status_of_releases'+item.id" :id="item.id" :type="'status_of_releases'" :name="item.name" :reset="reset" />
            </div>

            <div class="filter_title"> Сортировать по </div>
            <div class="checkbox-list">
              <div class="column">
                <label class="sort">
                  <input type="radio" name="sortName" value="RUS" v-model="sortByName">
                  <span class="name"> Названию (RUS) </span>
                </label>
                <label class="sort">
                  <input type="radio" name="sortName" value="ENG" v-model="sortByName">
                  <span class="name"> Названию (ENG) </span>
                </label>
              </div>
              <div class="column sort-type">
                <label class="sort">
                  <input type="radio" name="sortType" value="ASC" v-model="sortType">
                  <span class="name"> По возрастанию (А-я) </span>
                </label>
                <label class="sort">
                  <input type="radio" name="sortType" value="DESC" v-model="sortType">
                  <span class="name"> По убыванию (Я-а) </span>
                </label>
              </div>
            </div>
          </div>

          <div class="buttons two-columns">
            <div class="button cancel" @click.prevent="sendCancel"> Сбросить </div>
            <div class="button submit" @click.prevent="sendFilter()"> Показать </div>
          </div>
        <div class="filter_title">В планах добавить фильтр по рейтингу, возрасту, кол-ву глав</div>
        </div>
      </div>


      <div class="filter-layout" :class="{ 'is-hidden': !genresOpen }">
        <div class="filter-submenu">
          <div class="button" @click.prevent="genresOpen = !genresOpen">
            <mdi-ChevronLeft /> Вернуться
          </div>
          <div class="checkbox-list">
            <Widgets-CheckboxList v-for="item in filter.genres" :key="'genres'+item.id" :id="item.id" :type="'genres'" :name="item.name" :reset="reset" />
          </div>
          <div class="button submit" @click.prevent="sendFilter()"> Выбрать </div>
        </div>
      </div>
        
      <div class="filter-layout" :class="{ 'is-hidden': !tagsOpen }">
        <div class="filter-submenu">
          <div class="button" @click.prevent="tagsOpen = !tagsOpen">
            <mdi-ChevronLeft /> Вернуться
          </div>
          <div class="checkbox-list">
            <Widgets-CheckboxList v-for="item in filter.tags" :key="'tags'+item.id" :id="item.id" :type="'tags'" :name="item.name" :reset="reset" />
          </div>
          <div class="button submit" @click.prevent="sendFilter()"> Выбрать </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { libraryGetFilter } from '~/services/api'

export default {
  async asyncData({ store }) {
    if(store.state.library.filter.length === 0) store.dispatch('library/FETCH_FILTER')
    if(store.state.library.posts.length === 0) store.dispatch('library/FETCH_POSTS')
  },

  data() {
    return {
      reset: false,
      tagsOpen: false,
      genresOpen: false,
      year: {
        from: null,
        before: null
      },
      // rating: {
      //   from: null,
      //   before: null
      // },
      sortType: '',
      sortByName: '',
      curPage: 1,
    }
  },

  computed: {
    ...mapGetters('library', { posts: 'GET_POSTS' }),
    ...mapGetters('library', { filter: 'GET_FILTER' }),
    ...mapGetters('library', { lastPage: 'GET_LAST_PAGE' }),

    currentYear() {
      return new Date().getFullYear()
    },
  },

  methods: {
    async sendFilter() {
      this.curPage = 1
      this.tagsOpen = false
      this.genresOpen = false      

      let res = await libraryGetFilter(this.curPage, this.getDataFilter())
      this.$store.commit('library/SET_POSTS', { data: res.data, add: false })
      this.$store.commit('library/SET_LAST_PAGE', (res.current_page === res.last_page))
    },

    async nextPage() {
      ++this.curPage
      let res = await libraryGetFilter(this.curPage, this.getDataFilter())
      this.$store.commit('library/SET_POSTS', { data: res.data, add: true })
      this.$store.commit('library/SET_LAST_PAGE', (res.current_page === res.last_page))
    },

    async sendCancel() {
      this.reset = !this.reset
      this.year.from = null
      this.year.before = null
      // this.rating.from = null
      // this.rating.before = null
      this.sortType = ''
      this.sortByName = ''
      this.$store.commit('library/SET_FILTER_CLEAR')
    },

    getDataFilter() {
      let data = {}
      data.year = []
      // data.rating = []
      
      data.year[0] = this.validNumber(this.year.from, 1930, this.currentYear)
      data.year[1] = this.validNumber(this.year.before, 1930, this.currentYear)
      if(data.year[0] > data.year[1]) data.year[1] = undefined
      this.year.from = Number.isNaN(+data.year[0]) ? undefined : data.year[0]
      this.year.before = Number.isNaN(+data.year[1]) ? undefined : data.year[1]

      // data.rating[0] = this.validNumber(this.rating.from, 0, 5, 2)
      // data.rating[1] = this.validNumber(this.rating.before, 0, 5, 2)
      // if(data.rating[0] > data.rating[1]) data.rating[1] = undefined
      // this.rating.from = Number.isNaN(+data.rating[0]) ? undefined : data.rating[0]
      // this.rating.before = Number.isNaN(+data.rating[1]) ? undefined : data.rating[1]

      data.genres = this.returnValue(this.filter.genres)
      data.tags = this.returnValue(this.filter.tags)
      data.types = this.returnValue(this.filter.types)
      // data.adult_ranks = this.returnValue(this.filter.adult_ranks)
      data.formats = this.returnValue(this.filter.formats)
      data.status_of_translations = this.returnValue(this.filter.status_of_translations)
      data.status_of_releases = this.returnValue(this.filter.status_of_releases)
      
      data.sortType = this.sortType ? this.sortType : undefined
      data.sortByName = this.sortByName ? this.sortByName : undefined

      return data
    },

    returnValue(arr) {
      return arr.filter(item => (+item.value === 1) || (+item.value === -1)).map(item => { return { id: item.id, value: item.value }})
    },

    validNumber(num, min, max, fixed=0) {
      if(num === null || Number.isNaN(+num)) return undefined
      return +Math.min(Math.max(+num, min), max).toFixed(fixed)
    },
  },
}
</script>

<style lang="scss" scoped>
.container_fullh {
  min-height: 100%;
  min-height: calc(100vh - 165px);
}
.content {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  .search-results {
    width: calc(100% - 300px);
    .search-list {
      display: flex;
      flex-wrap: wrap;
    }
    .more {
      @include btn_line_full;
    }
  }
  .search-filter {
    overflow: hidden;
    top: 16px;
    width: 300px;
    margin: 16px 0 16px 12px;
    bottom: 16px;
    z-index: 10;
    position: sticky;
    height: calc(100vh - 98px);
    border-radius: 3px;
    border: thin solid rgba(255, 255, 255, 0.12);
    .filter-layout {
      @include scrollBar;
      height: 100%;
      overflow-y: auto;
      transition: 0.3s ease;
      .filter-submenu {
        height: 100%;
        display: flex;
        flex-direction: column;
        .two-columns {
          display: flex;
          align-items: center;
          flex-direction: row;
          .button {
            width: 50% !important;
          }
        }
        .button {
          margin: 4px 0;
          cursor: pointer;
          padding: 6px 8px;
          position: relative;
          align-items: center;
          display: flex;
          justify-content: flex-start;
          &:hover {
            &:before {
              opacity: 0.1;
            }
          }
          &:before {
            @include before;
          }
          &.cancel,
          &.submit {
            width: 100%;
            margin: 0 auto;
            padding: 6px 8px;
            border-radius: 2px;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          &.cancel {
            border: thin solid rgba(255, 0, 0, 0.25);
          }
          &.submit {
            border: thin solid rgba(0, 255, 34, 0.25);
          }
        }
        .filter_title {
          font-size: 1.15rem;
          font-weight: 200;
          width: 100%;
          padding: 4px 8px;
          background-color: #1e1e1e;
        }
      }
      .checkbox-list {
        @include scrollBar;
        margin: 12px 0;
        overflow-y: auto;
        max-height: calc(100% - 64px);
        &.in-line {
          display: flex;
          overflow: inherit;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          .input {
            @include input_text;
            height: 28px;
            width: calc(50% - 16px);
          }
        }
        &.two-columns {
          display: flex;
          overflow: inherit;
          flex-wrap: wrap;
          .checkbox {
            width: 50%;
            margin: 5px 0;
            padding-left: 6px;
          }
        }
        .sort-type {
          margin-top: 10px;
        }
        .sort {
          height: 20px;
          display: flex;
          cursor: pointer;
          margin-left: 8px;
          flex-wrap: nowrap;
          align-items: center;
          .name {
            margin-left: 6px;
          }
        }
      }
    }
    .is-hidden {
      top: 0;
      left: 0;
      z-index: 60;
      width: 100%;
      position: absolute;
      transition: .3s ease;
      transform: translateX(101%);
    }
    .is-visible {
      transform: none;
    }
  }
}
</style>
