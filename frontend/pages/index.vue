<template>
  <div class="container">
    <line-popular />
    <div class="main__content">
      <div class="content">
        <div class="block__title">Новые главы</div>
        <widgets-card-latest v-for="(item, index) in dataLatest" :key="index"
          :id="item.id"
          :rank="item.ageRank"
          :category="item.category"
          :chapter="item.chapter"
          :more="item.more"
          :cover="item.cover"
          :rating="item.rating"
          :title="item.title"
          :update="item.update" />
      </div>
      <region-side />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  computed: {
    dataLatest() {
      return [
        {
          id: 1,
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          chapter: {
              v: 1,
              c: 161,
              title: 'Название 161 главы',
            },
          more: 1,
          category: 'Манга',
          ageRank: 18,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 4.98,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 2,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 16,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
        {
          id: 3,
          title: 'Другое произведение',
          chapter: {
              v: 24,
              c: 256,
              title: 'Название 256 главы',
            },
          more: 0,
          category: 'Веб-манхва',
          ageRank: 0,
          update: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Samara' }),
          rating: 3.67,
          cover: '/_nuxt/assets/images/mid_cover.jpg'
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.main__content {
  display: flex;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1320px;
  justify-content: space-between;
  .content {
    padding: 4px;
    width: 66.666667%;
    max-width: 66.666667%;
  }
  .side {
    padding: 4px;
    width: 33.333333%;
    max-width: 33.333333%;
  }
}

</style>
