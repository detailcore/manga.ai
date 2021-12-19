<template>
  <div class="posts">
    <widgets-card-popular
      :alias="item.alias"
      :cover="item.cover"
      :title="item.title"
      :likes="item.likes"
      :rating="item.rating"
      v-for="(item, index) in data"
      :key="index"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    page: { type: String, default: '' },
  },

  async mounted() {
    if(this.page == 'posts' && Object.keys(this.teamPosts).length === 0 && this.teamPosts.constructor === Object) {
      await this.$store.dispatch('team/FETCH_TEAM_POSTS', this.$route.params.id)
    }
  },

  computed: {
    ...mapGetters('team', { teamPosts: 'GET_TEAM_POSTS' }),

    data({ $config: { urlCoverTitle } }) {
      if(this.teamPosts.data) {
        let res = [],
            title = ''
        this.teamPosts.data.forEach(el => {
          title = (el.title_rus) ? el.title_rus : el.title_eng
          res.push({
            alias: el.alias,
            likes: el.likes,
            rating: (el.rating) ? parseFloat(el.rating).toFixed(2) : '0',
            cover: (el.cover.mid) ? urlCoverTitle +'/'+ el.id+'/'+el.cover.mid : '',
            title: title
          })
        })
        return res
      }
      return false
    },
  },
};
</script>

<style lang="scss"></style>
