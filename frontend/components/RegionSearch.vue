<template>
  <div class="btn-search" v-click-outside="close">
    <div class="btn" v-show="!isOpen" @click="openSearch">
      <mdi-Magnify title="Поиск по сайту" />
    </div>
    <div class="search" v-show="isOpen">
      <input type="search" class="input_search"
        autocomplete="off"
        v-model.trim="query"
        placeholder="Поиск по названию">
      <div class="btn close" @click="close">
        <mdi-Close title="Закрыть поиск" />
      </div>
      <div class="result">
        <div v-for="(item, index) in searchResult" class="item" :key="index">
          <img :src="item.cover" alt="cover item">
          <div class="desc">
            <div v-show="item.title.rus.length > 0" class="title">{{ item.title.rus }}</div>
            <div v-show="item.title.rus.length > 0" class="title">{{ item.title.eng }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      result: [],
      isOpen: false,
    }
  },

  computed: {
    searchResult() {
      return this.result = [
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: {
            rus: `Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!`,
            eng: `It's Difficult to Love an Otaku`
          }
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: {
            rus: `Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!`,
            eng: `It's Difficult to Love an Otaku`
          }
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: {
            rus: `Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!`,
            eng: `It's Difficult to Love an Otaku`
          }
        },
      ]
    },
  },

  methods: {
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
    width: 300px;
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
        @include modal;
        width: inherit;
        top: 40px;
        left: 0;
        z-index: 1;
        .item {
          cursor: pointer;
          padding: 8px;
          height: 100px;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: space-between;
          img {
            width: 60px;
            border-radius: 4px;
          }
          .desc {
            display: flex;
            height: inherit;
            padding-left: 6px;
            flex-direction: column;
            justify-content: space-evenly;
            .title {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
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
