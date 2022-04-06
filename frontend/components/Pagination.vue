<template>
  <!-- Универсальная нумерация страниц -->
  <div class="pagination">
    <div class="btn" @click="prevPage" v-show="prevUrl">
      <mdi-ChevronLeft />
    </div>

    <div class="btn" :class="{ active: link.active }" v-for="(link, i) of links" :key="i" @click.prevent="loadPage(link.url)">
      <span>{{ link.label }}</span>
    </div>

    <div class="btn" @click="nextPage" v-show="nextUrl">
      <mdi-ChevronRight />
    </div>

  </div>
</template>

<script>
import { get } from '~/services/axios'

export default {
  props: {
    type: { type: String, default: () => '' },
    sourceLinks: { type: Array, default: () => [] },
  },

  computed: {
    links() {
      return this.sourceLinks.length ? this.sourceLinks.slice(1, -1) : this.sourceLinks
    },
    prevUrl() {
      return this.sourceLinks[0].url ? this.sourceLinks[0].url : false
    },
    nextUrl() {
      return this.sourceLinks[this.sourceLinks.length-1].url ? this.sourceLinks[this.sourceLinks.length-1].url : false
    },
  },

  methods: {
    nextPage () {
      if (this.nextUrl) this.loadContent(this.nextUrl)
    },

    prevPage () {
      if (this.prevUrl) this.loadContent(this.prevUrl)
    },

    loadPage(url) {
      if(url !== null) this.loadContent(url)
    },

    async loadContent(url) {
      let res = await get(url)
      if(this.type === 'USER_BOOKMARKS') this.$store.commit('bookmark/SET_USER_BOOKMARKS', res) // страница профиля пользователя
    },
  },
}
</script>

<style lang="scss" scoped>
  .pagination {
    width: 100%;
    margin: 12px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .btn.active {
      &:before {
        opacity: 0.1;
      }
    }
  }
</style>
