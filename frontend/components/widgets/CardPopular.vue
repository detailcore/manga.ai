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