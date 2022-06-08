<template>
  <div class="library_item">
    <Nuxt-link :to="'/manga/'+alias" class="cover">
      <img loading="lazy" :srcset="cover+'.webp'" :src="cover" :alt="title" />
      <div class="type">
        <!-- <mdi-CardsHeart /> {{ likes }} -->
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
}
</script>

<style lang="scss">
.library_item {
  width: 25%;
  padding: 12px 6px;
  .cover {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    &:hover {
      text-decoration: none;
      box-shadow: 0px 10px 10px rgb(0 0 0 / 50%) inset, 0px -10px 10px rgb(0 0 0 / 50%) inset;
    }
    img {
      aspect-ratio: 0.71 / 1;
      border-radius: 4px;
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
      border-radius: 4px 4px 0 0;
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
      padding: 1px 4px;
      text-align: center;
      font-weight: 200;
      font-size: 0.95rem;
      box-shadow: 0px -36px 10px rgb(0 0 0 / 50%) inset;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0 0 4px 4px;
    }
  }
}
</style>