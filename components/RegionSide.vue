<template>
  <div class="side">
    <div class="block top">
      <div class="block__title">Топ дня</div>
      <div class="block__subtitle">Популярная манга за сутки</div>
      <widgets-card-short v-for="item in dataTopReleases" :key="item.id"
        :id="item.id"
        :alias="item.alias"
        :cover="item.coverLow"
        :title="item.title"
        :year="item.year"
        :category="item.category"
        type="top" />
    </div>

    <div class="block new">
      <div class="block__title">Новые тайтлы</div>
      <div class="block__subtitle">Недавно добавленная манга</div>
      <widgets-card-short v-for="item in dataNewReleases" :key="item.id"
        :id="item.id"
        :alias="item.alias"
        :cover="item.coverLow"
        :title="item.title"
        :year="item.year"
        :category="item.category"
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
        item.category = item.type ? item.type.name : ''
        item.coverLow = item.cover ? (item.cover.low ? item.cover.low : '') : ''
        item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
      }
      return this.newReleases
    },
    dataTopReleases() {
      for (const item of this.topReleases) {
        item.category = item.type ? item.type.name : ''
        item.coverLow = item.cover ? (item.cover.low ? item.cover.low : '') : ''
        item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
      }
      return this.topReleases
    },
  },
};
</script>

<style lang="scss">
.side {
  .block__subtitle {
    color: #919191;
    margin-top: -10px;
  }
  .block.top {
    padding-right: 6px;
  }
  .block.new {
    top: 0;
    position: sticky;
    padding-left: 6px;
  }
}
</style>
