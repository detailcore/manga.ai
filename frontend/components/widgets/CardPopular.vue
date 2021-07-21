<template>
  <div class="item">
    <div class="cover" :style="coverStyle">
      <!-- <img src="/_nuxt/assets/images/one_pixel.jpg" alt="cover" :srcset="coverUrl"> -->
      <div class="like">
        <mdi-CardsHeart /> {{ like }}
      </div>
      <div class="title"> {{ title }} </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    like: { type: Number, required: true },
    cover: { type: String, required: true },
    title: { type: String, required: true },
  },

  computed: {
    coverUrl() {
      return this.cover
    },
    coverStyle() {
      return {
        backgroundImage: 'url('+this.coverUrl+')'
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
      align-items: center;
      justify-content: center;
      box-shadow: 0px 20px 8px rgb(0 0 0 / 50%) inset;
      span {
        margin-right: 6px;
      }
    }
    .title {
      @include text_two_line;
      padding: 4px;
      box-shadow: 0px -36px 10px rgb(0 0 0 / 50%) inset;
    }
  }
}
</style>