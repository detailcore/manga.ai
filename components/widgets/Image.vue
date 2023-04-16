<template>
  <span class="page">
    <img loading="lazy" :srcset="imageUrl" v-if="loaded == 1" >
    <LazyWidgetsLoading :text="text" :isError="isError" v-else />
  </span>
</template>

<script>
export default {
  props: {
    loaded: { type: Number, required: true },
    sort: { type: Number, default: 1 },
    link: { type: String, default: '' },
    url: { type: String, required: true },
    page: { type: Number, required: true },
  },

  computed: {
    imageUrl() {
      return this.loaded ? this.url + this.link : ''
    },
    isError() {
      return this.loaded == -1
    },
    text() {
      return !this.isError ? `Страница ${this.page} загружается` : `Ошибка. Страница ${this.page} не загружена!`
    },
  },
};
</script>
