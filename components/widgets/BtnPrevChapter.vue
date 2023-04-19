<template>
  <button class="line-center" @click="prevChapter">
    <mdi-MenuLeft title="Предыдущая глава" />
    <span class="prev">Назад</span>
  </button>
</template>

<script>
export default {
  methods: {
    prevChapter() {
      this.$nuxt.$emit('go-to-prev-chapter', 'any payload')
    },
  },
};
</script>
