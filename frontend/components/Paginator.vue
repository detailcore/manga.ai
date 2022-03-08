<template>
  <div class="pagination">
    <div class="btn" @click="prevPage">
      <mdi-ChevronLeft />
    </div>

    <div class="btn" :class="{ active: (+pagination.pageCurrent === +link.label) }" v-for="(link, i) of links" :key="i" @click.prevent="loadPage(link.label)">
      <span>{{ link.label }}</span>
    </div>

    <div class="btn" @click="nextPage">
      <mdi-ChevronRight />
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters( 'moderation', { pagination: 'GET_PAGINATION' }),

    links() {
      return this.pagination ? this.pagination.links : []
    }
  },

  methods: {
    nextPage () {
      if (this.pagination.pageCurrent < this.pagination.pageMax) {
        this.$store.commit('moderation/SET_PAGE', this.pagination.pageCurrent + 1)
        this.loadContent()
      } else {
        this.$notify({
          text: 'Вы уже на последней странице',
          type: 'error',
        })
      }
    },

    prevPage () {
      if (this.pagination.pageCurrent > 1) {
        this.$store.commit('moderation/SET_PAGE', this.pagination.pageCurrent - 1)
        this.loadContent()
      } else {
        this.$notify({
          text: 'Вы уже на 1й странице',
          type: 'error',
        })
      }
    },

    loadPage(num) {
      this.$store.commit('moderation/SET_PAGE', +num)
      this.loadContent()
    },

    async loadContent() {
      await this.$store.dispatch('moderation/FETCH_CONTENT', {
        type: this.$route.query.type,
        status: this.$route.query.statuses,
        page: this.pagination.pageCurrent,
      })
    },
  },
}
</script>

<style lang="scss">
  .pagination {
    display: flex;
    margin: 12px 0;
    justify-content: space-between;
    .btn.active {
      &:before {
        opacity: 0.1;
      }
    }
  }
</style>
