<template>
  <div class="container">
    <line-popular />
    <div class="main__content">
      <div class="content">
        <div class="block__title">Новые главы</div>
        <widgets-card-latest v-for="(item, index) in dataResult" :key="index"
          :id="item.id"
          :rank="item.adult_rank.name"
          :category="item.type.name"
          :chapter="item.new_chapter[0]"
          :more="4"
          :cover="item.cover.low"
          :rating="item.rating[0]"
          :title="item.title_rus" />
      </div>
      <region-side :newReleases='newReleases' :topReleases='topReleases' />
    </div>

  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const latestData = await $axios.$get('/home')
    const newReleases = await $axios.$get('/home/releases/new')
    const topReleases = await $axios.$get('/home/releases/top')
    return { latestData, newReleases, topReleases }
  },

  computed: {
    dataResult() {
      return this.latestData.data
    },
  },
}
</script>

<style lang="scss">
.main__content {
  display: flex;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1320px;
  justify-content: space-between;
  .content {
    padding: 4px;
    width: 66.666667%;
    max-width: 66.666667%;
  }
  .side {
    padding: 4px;
    width: 33.333333%;
    max-width: 33.333333%;
  }
}

</style>
