<template>
  <div>
    <div v-show="isRelated">
      <div class="block__title">Связанные произведения</div>
      <div class="line_card">
        <widgets-card-short v-for="(item, index) in relatedAndSimilar.relateds" :key="index"
          :id="item.id"
          :alias="item.alias"
          :cover="item.cover"
          :title="item.title"
          :category="item.category"
          :year="item.year"
          type="top" />
      </div>
    </div>

    <div v-show="isSimilar">
      <div class="block__title">Похожие тайтлы</div>
      <div class="line_card">
        <widgets-card-short v-for="(item, index) in relatedAndSimilar.similars" :key="index"
          :id="item.id"
          :alias="item.alias"
          :cover="item.cover"
          :title="item.title"
          :category="item.category"
          :year="item.year"
          type="top" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: { type: Number, required: true },
  },

  async created() {
    if(this.id !== this.idPost) {
      await this.$store.dispatch('post/FETCH_RELATED', this.id)
    }
  },

  computed: {
    ...mapGetters( 'post', { relatedAndSimilar: 'GET_RELATED' }),

    idPost() {
      return this.$store.state.post.idByRelated
    },
    isRelated() {
      if(this.relatedAndSimilar.length !== 0) {
        return (this.relatedAndSimilar.relateds.length !== 0) ? true : false
      }
      return false
    },
    isSimilar() {
      if(this.relatedAndSimilar.length !== 0) {
        return (this.relatedAndSimilar.similars.length !== 0) ? true : false
      }
      return false
    },
  },
};
</script>


<style lang="scss">
</style>
