<template>
    <div class="populars">
      <widgets-card-popular
          :cover="item.cover" 
          :title="item.title" 
          :like="item.like" 
          v-for="(item, index) in dataPopular" :key="index" />
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {
    dataPopular() {
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
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
        {
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          like: 0,
        },
      ]
    }
  },

}
</script>

<style lang="scss">
.populars {
  width: 100%;
  overflow: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-track {
    background: #121212;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f2f2f ;
    border-radius: 9px;
    border: 3px solid #121212;
  }
}
</style>
