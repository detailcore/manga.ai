<template>
  <button class="line-center" @click="nextChapter">
    <span class="next">Вперёд</span>
    <mdi-MenuRight title="Слудующая глава" />
  </button>
</template>

<script>
export default {
  methods: {
    nextChapter() {
      this.$nuxt.$emit('go-to-next-chapter', 'any payload')
    },
  },
};
</script>
