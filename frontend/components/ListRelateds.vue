<template>
  <div>
    <div class="block__title">Связанные произведения</div>
    <div class="line_card">
      <widgets-card-short v-for="(item, index) in relateds" :key="index"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :category="item.category"
        :year="item.year"
        type="top" />
    </div>
    <div class="block__title">Похожие тайтлы</div>
    <div class="line_card">
      <!-- <widgets-card-short v-for="(item, index) in data.similars" :key="index"
        :id="item.id"
        :cover="item.cover"
        :title="item.title"
        :category="item.category"
        :year="item.year"
        type="top" /> -->
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  async created() {
    if(+this.$route.params.title !== this.idPost) { // Загрузить только, если пустой массив 
      await this.$store.dispatch('post/FETCH_RELATED', +this.$route.params.title)
    }
  },

  computed: {
    ...mapGetters( 'post', { relateds: 'GET_RELATED' }),

    idPost() {
      return this.$store.state.post.id
    },
  },
};
</script>


<style lang="scss">
</style>
