<template>
  <div class="item">
    <Nuxt-link :to="'/'+alias" class="cover" :style="coverStyle">
      <!-- <img src="/_nuxt/assets/images/one_pixel.jpg" alt="cover" :srcset="coverUrl"> -->
      <div class="like">
        <mdi-CardsHeart /> {{ likes }}
        <mdi-Star /> {{ rating }}
      </div>
      <div class="title"> {{ title }} </div>
    </Nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    alias: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    rating: { type: String, default: '0' },
    cover: { type: String, required: true },
    title: { type: String, required: true },
  },

  computed: {
    coverStyle() {
      return {
        backgroundImage: 'url('+this.cover+')'
      }
    }
  },

  methods: {
  },
}
</script>

<style lang="scss">
.item {
  padding: 12px 6px;
  .cover {
    &:hover {
      text-decoration: none;
      box-shadow: 0px 10px 10px rgb(0 0 0 / 50%) inset, 0px -10px 10px rgb(0 0 0 / 50%) inset;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 146px;
    height: 220px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
    // box-shadow: 0 0 40px rgba(0, 0, 0, .5) inset;
    .like {
      width: 100%;
      height: 26px;
      display: flex;
      font-weight: 200;
      font-size: 0.9rem;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 20px 8px rgb(0 0 0 / 50%) inset;
      span {
        margin-right: 6px;
          &:last-of-type {
            margin-left: 6px;
        }
      }
    }
    .title {
      @include text_two_line;
      padding: 4px;
      text-align: center;
      font-weight: 200;
      font-size: 0.95rem;
      box-shadow: 0px -36px 10px rgb(0 0 0 / 50%) inset;
    }
  }
}
</style>