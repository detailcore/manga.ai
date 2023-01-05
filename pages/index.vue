<template>
  <div class="container region_main">
    <!-- <Line-Popular /> -->
    <div class="main__content">
      <div class="content">
        <div class="block__title">Новые главы</div>
        <div class="block__subtitle">Последние добавленные в мангу главы</div>

        <Widgets-CardLatest v-for="(item, index) in latestData" :key="index"
          :id="item.id"
          :alias="item.alias"
          :rank="item.adult_rank"
          :category="item.type"
          :chapter="item.new_chapter"
          :more="item.amount_chapters"
          :cover="item.cover"
          :rating="item.rating"
          :title="item.title" />

        <!-- <div class="more" v-show="home.nextPageUrl !== null">
          <span class="more__button" v-show="!disabled" @click.prevent="loadMore">Показать еще</span>
        </div> -->
      </div>

      <RegionSide :newReleases='newReleases' :topReleases='topReleases' />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  head: {
    title: 'Читать мангу и комиксы онлайн. Манга онлайн, новые главы!',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Манга онлайн и комиксы. Новые главы топовых произведений. Быстрые переводы манги на русском языке. Читать мангу, популярную мангу и избранные мангу'
      }
    ],
  },

  async asyncData({ store }) {
    if(
      store.state.home.new.length === 0
      || (Math.floor(new Date().getTime()/1000.0) >= store.state.home.created_at + 600) // 10 min
    ) {
      await store.dispatch('home/FETCH_ALL') // await обязательно
      // await store.dispatch('home/FETCH_SIDE')
      // await store.dispatch('home/FETCH_LATEST')
      store.commit('home/SET_TIME', Math.floor(new Date().getTime()/1000.0))
    }
  },

  // data() {
  //   return {
  //     disabled: false,
  //   }
  // },

  computed: {
    ...mapState(['home']),
    ...mapGetters('home', { newReleases: 'GET_NEW' }),
    ...mapGetters('home', { topReleases: 'GET_TOP' }),
    ...mapGetters('home', { latestData: 'GET_LATEST' }),
  },

  // methods: {
  //   async loadMore() {
  //     this.disabled = true
  //     await this.$store.dispatch('home/FETCH_LATEST')
  //     this.disabled = false
  //   },
  // },
}
</script>

<style lang="scss">
.region_main {
  margin-top: 60px;
}
.main__content {
  display: flex;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1320px;
  justify-content: space-between;
  .block__subtitle {
    color: #919191;
    margin-top: -10px;
  }
  .content {
    padding: 4px;
    // max-width: 66.666667%;
    .more {
      @include btn_line_full;
    }
  }
  .side {
    padding: 4px;
    // max-width: 33.333333%;
  }
}

</style>
