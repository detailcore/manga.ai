<template>
  <div class="btn-search" v-click-outside="close">
    <div class="btn" v-show="!isOpen" @click="openSearch">
      <mdi-Magnify title="Поиск по сайту" />
    </div>
    <div class="search" v-show="isOpen">
      <input type="search" class="input_search"
        autocomplete="off"
        v-model.trim="query"
        placeholder="Поиск по названию (RUS/ENG)"
        @input="throttledSend"
        ref="search">
      <div class="btn close" @click="close">
        <mdi-Close title="Закрыть поиск" />
      </div>
      <div class="result" v-if="searchResult.length > 0">
        <div v-for="(item, index) in searchResult" class="item" :key="index" @click="goTitle(item.alias)">
          <img :src="item.cover" alt="cover item">
          <div class="desc">
            <div class="title">{{ item.title }}</div>
            <div class="category">{{ item.type }} ({{ item.year }})</div>
          </div>
        </div>
      </div>
      <div class="result" v-if="searchNotResult">
        <div class="item">
          <div class="desc">
            <div class="title">Поиск не дал результатов</div>
            <div class="category">Введите на другом языке или только часть названия</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash.throttle'
import { isCyrillic } from '~/services/util'
import { postSearchByTitles } from '~/services/api'

export default {
  data() {
    return {
      lang: '',
      query: '',
      result: [],
      isOpen: false,
      resultIsEmpty: false,
    }
  },

  computed: {
    searchResult() {
      return this.result
    },
    searchNotResult() {
      return this.result.length == 0 && this.query.length > 2 && this.resultIsEmpty
    },
    throttledSend() {
      return throttle(this.sendSearch, 1200)
    },
  },

  methods: {
    async sendSearch() {
      this.lang = isCyrillic(this.query.replace(/[^a-zа-яё]/gi, '')) ? 'ru' : 'en'
      if(this.query.length > 2) {
        let tmp = await postSearchByTitles(this.query, this.lang)
        this.result = tmp.filter(item => {
          let cover = item.cover ? item.cover.low + '.webp' : false
          item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
          item.cover = cover ? this.$config.urlCoverTitle + item.id + '/' + cover : ''
          item.type = item.type ? item.type.name : ''

          return item
        })
        if(this.result.length == 0) this.resultIsEmpty = true
      }
    },
    goTitle(alias) {
      this.$router.push({
        name: 'manga-alias',
        params: {
          alias: alias,
        }
      })
      this.close()
    },
    openSearch() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
      this.query = ''
    }
  },
}
</script>

<style lang="scss">
  .btn-search {
    display: flex;
    align-items: center;
    justify-self: start;
    width: 100%;
    max-width: 400px;
    .search {
      @include flex_center_center;
      position: relative;
      top: 3px;
      left: 0;
      width: 100%;
      .input_search {
        background: #1e1e1e;
        color: #fff;
        height: 36px;
        border-radius: 6px;
        padding: 0 8px;
        width: 100%;
        font-size: inherit;
        margin-right: -52px;
      }
      .btn.close {
        left: 8px;
        top: 0;
      }
      .result {
        @include scroll_bar;
        @include modal;
        position: absolute !important;
        width: inherit;
        top: 40px;
        left: 0;
        z-index: 1;
        overflow-y: auto;
        max-height: 90vh;
        .item {
          cursor: pointer;
          padding: 8px;
          height: 100px;
          display: flex;
          position: relative;
          align-items: center;
          // justify-content: space-between;
          img {
            width: 60px;
            border-radius: 4px;
          }
          .desc {
            display: flex;
            height: inherit;
            padding-left: 6px;
            flex-direction: column;
            justify-content: center;
            .title {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
            .category {
              color: #919191;
            }
          }
          &:last-child:before {
            display: none;
          }
          &:before {
            left: 0;
            bottom: -2px;
            width: 100%;
            content: '';
            padding: 2px 0;
            position: absolute;
            border-bottom: 1px solid #252525;
          }
          &:hover {
            border-radius: 6px;
            background: #2f2f2f;
          }
        }
      }
    }
  }
</style>
