<template>
  <span class="page">
    <!-- <WidgetsLoading v-if="loaded" :text="`Страница ${page} загружается`" /> -->
    <img :src="imageUrl" >
  </span>
</template>

<script>
export default {
  props: {
    sort: { type: Number, default: 1 },
    link: { type: String, default: 'https://mangaclub.ru/engine/skins/images/loading.gif' },
    url: { type: String, required: true },
    page: { type: Number, required: true },
  },

  computed: {
    imageUrl() {
      return this.url + this.link
    },
  },
};
</script>

<style lang="scss">
</style>
