<template>
  <nuxt-link :to="'/manga/'+alias" class="chapter item">
    <div class="cover" :style="styleCover">
      <div class="rank" v-show="rank !== 'Нет'"> {{ rank }} </div>
      <div class="cat"> {{ category }} </div>
    </div>    
    <div class="info">
      <div class="title"> {{ title }} </div>
      <div class="chapter">
        Том {{ chapter.volume }}. Глава {{ chapter.chapter }}. {{ chapter.name }}
        <span v-show="more > 0">+ еще {{ more }}</span>
      </div>
      <div class="update"> {{ updateTime }} </div>
      <div class="rating"> {{ ratingFixed }} </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    alias: { type: String, required: true },
    rank: { type: String, default: '' },
    category: { type: String, default: '' },
    chapter: { type: Object, required: true },
    more: { type: Number, required: true },
    cover: { type: String, required: true },
    rating: { type: String, default: '0' },
    title: { type: String, required: true }
  },

  computed: {
    styleCover({ $config: { urlCoverTitle } }) {
      return {
        backgroundImage: `url(${urlCoverTitle + this.id +'/'+ this.cover})`
      }
    },
    ratingFixed() {
      let rat = this.rating
      return Number(rat).toFixed(2)
    },
    updateTime() {
      let time = this.chapter.updated_at
      if(time != null) {
        let timeReplace = time.replace('.000000Z', '')
        return this.$moment(timeReplace).fromNow()
      }
      return 'Когда-то...'
    },
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
