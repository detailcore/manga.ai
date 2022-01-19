<template>
  <div class="bookmarks" v-show="tabBookmark">
    <div class="nav-line">
      <div class="item">Всё <span class="count">287</span></div>
      <div class="item">Читаю <span class="count">156</span></div>
      <div class="item">В планах <span class="count">45</span></div>
      <div class="item">Прочитано <span class="count">287</span></div>
      <div class="item">Отложено <span class="count">75</span></div>
      <div class="item">Брошено <span class="count">53</span></div>
      <div class="item">Не интересно <span class="count">43</span></div>
      <div class="btn"><mdi-Plus class="add_bookmark" /></div>
    </div>

    <div class="container cards">
      <Widgets-Card-Popular
          :cover="item.cover" 
          :title="item.title" 
          :like="item.like" 
          v-for="(item, index) in dataBookmarks" :key="index" />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    tabBookmark: { type: Boolean, default: true },
  },

  computed: {
    dataBookmarks() {
      return [
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 10,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 159,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 17.5,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 150100,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 100800,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        }
      ]
    },
  },

  methods: {
  },
};
</script>

<style lang="scss">
  .bookmarks {
    .cards {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>
