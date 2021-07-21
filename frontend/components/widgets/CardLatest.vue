<template>
  <nuxt-link :to="'/manga/'+id" class="chapter item">
    <div class="cover" :style="styleCover">
      <div class="rank" v-show="rank > 0"> +{{ rank }} </div>
      <div class="cat"> {{ category }} </div>
    </div>    
    <div class="info">
      <div class="title"> {{ title }} </div>
      <div class="chapter">
        Том {{ chapter.v }}. Глава {{ chapter.c }}. {{ chapter.title }}
        <span v-show="more">+ еще {{ more }}</span>
      </div>
      <div class="update"> {{ update }} </div>
      <div class="rating"> {{ rating }} </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    rank: { type: Number, default: 0 },
    category: { type: String, default: '' },
    chapter: { type: Object, required: true },
    more: { type: Number, required: true },
    cover: { type: String, required: true },
    rating: { type: Number, default: 0 },
    title: { type: String, required: true },
    update: { type: String, default: '' }
  },

  computed: {
    styleCover() {
      return {
        backgroundImage: `url(${this.cover})`
      }
    }
  },
}
</script>

<style lang="scss">
.chapter.item {
  padding: 0;
  display: flex;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 6px;
  border: thin solid rgba(255, 255, 255, 0.12);
  &:hover {
    text-decoration: none;
  }
  .cover {
    width: 76px;
    height: 114px;
    font-size: 0.9rem;
    position: relative;
    .rank {
      padding: 2px;
      max-width: 30px;
      border-radius: 6px 0 6px 0;
      background-color: rgb(164 0 0 / 70%);
    }
    .cat {
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      text-align: center;
      text-transform: lowercase;
      box-shadow: 0px -10px 12px rgb(0 0 0 / 50%) inset;
    }
  }
  .info {
    display: flex;
    padding-left: 12px;
    position: relative;
    flex-direction: column;
    width: calc(100% - 76px);
    justify-content: space-evenly;
    .title {
      @include text_two_line;
      font-weight: 500;
      font-size: 1.2rem;
    }
    .chapter {
      font-weight: 300;
      span {
        color: #919191;
      }
    }
    .update {
      color: #919191;
      margin-top: -12px;
    }
    .rating {
      position: absolute;
      top: 0;
      right: 0;
      padding: 3px 6px;
      border-radius: 0 6px 0 6px;
      font-size: 0.9rem;
      background-color: rgba(255, 255, 255, 0.12);
    }
  }
}
</style>
