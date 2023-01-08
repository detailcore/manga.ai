<template>
  <span class="page">
    <LazyWidgetsLoading :text="`Страница ${page} загружается`" v-if="!loaded" />
    <img loading="lazy" :srcset="imageUrl" v-else >
  </span>
</template>

<script>
export default {
  props: {
    loaded: { type: Boolean, required: true },
    sort: { type: Number, default: 1 },
    link: { type: String, default: '' },
    url: { type: String, required: true },
    page: { type: Number, required: true },
  },

  computed: {
    imageUrl() {
      return this.loaded ? this.url + this.link : ''
    },
  },
};
</script>
