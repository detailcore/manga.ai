<template>
  <div class="library_item">
    <Nuxt-link :to="'/manga/'+alias" class="cover" :style="coverStyle">
      <div class="type"> {{ type }} </div>
      <div class="title"> {{ title }} </div>
    </Nuxt-link>
  </div>
</template>

<script>
// import { libraryLoadStory } from '~/services/api'

export default {
  props: {
    id: { type: Number, required: true },
    type: { type: String, default: '' },
    alias: { type: String, default: '' },
    cover: { type: String, required: true },
    title: { type: String, default: '' },
  },

  // data() {
  //   return {
  //     story: {},
  //   }
  // },

  computed: {
    // isEmpty() {
    //   for (let i in this.story) return false;
    //   return true;
    // },
    coverStyle({ $config: { urlCoverTitle } }) {
      return {
        backgroundImage: 'url('+ urlCoverTitle + this.id +'/'+ this.cover +')'
      }
    }
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
.library_item {
  width: 25%;
  padding: 12px 6px;
  .cover {
    position: relative;
    height: 100%;
    padding-top: 140%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    background-size: cover;
    background-position: 50%;
    &:hover {
      text-decoration: none;
      box-shadow: 0px 10px 10px rgb(0 0 0 / 50%) inset, 0px -10px 10px rgb(0 0 0 / 50%) inset;
    }
    .type {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
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
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>