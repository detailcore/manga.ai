<template>
  <div class="side">
    <div class="block top">
      <div class="block__title">Топ дня</div>
      <widgets-card-short v-for="item in dataTopReleases" :key="item.id"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :year="item.year"
        :category="item.type"
        type="top" />
    </div>

    <div class="block new">
      <div class="block__title">Новые тайтлы</div>
      <widgets-card-short v-for="item in dataNewReleases" :key="item.id"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :year="item.year"
        :category="item.type"
        type="top" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newReleases: { type: Array, required: true },
    topReleases: { type: Array, required: true },
  },

  computed: {
    dataNewReleases() {
      for (const item of this.newReleases) {
        item.title = item.title_rus
        if(item.title == null) {
          item.title = item.title_eng
        }
      }
      return this.newReleases
    },
    dataTopReleases() {
      for (const item of this.topReleases) {
        item.title = item.title_rus
        if(item.title == null) {
          item.title = item.title_eng
        }
      }
      return this.topReleases
    },
  },
};
</script>

<style lang="scss">
  .block.new {
    top: 0;
    position: sticky;
  }
</style>
