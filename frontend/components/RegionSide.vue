<template>
  <div class="side">
    <div class="block top">
      <div class="block__title">Топ дня</div>
      <widgets-card-short v-for="(item, index) in dataTop" :key="index"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :year="item.year"
        :category="item.category"
        type="top" />
    </div>

    <div class="block new">
      <div class="block__title">Новые тайтлы</div>
      <widgets-card-short v-for="(item, index) in dataNew" :key="index"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :year="item.year"
        :category="item.category"
        type="top" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTop: [
        {
          id: 1,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 1999,
          category: 'Манга',
        },
        {
          id: 2,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2021,
          category: 'Веб-манхва',
        },
        {
          id: 3,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2019,
          category: 'маньхуа',
        },
      ],
      dataNew: [
        {
          id: 1,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 1999,
          category: 'Манга',
        },
        {
          id: 2,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2021,
          category: 'Веб-манхва',
        },
        {
          id: 3,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2019,
          category: 'маньхуа',
        },
      ]
    }
  }
};
</script>

<style lang="scss">
  .block.new {
    top: 0;
    position: sticky;
  }
</style>
