<template>
  <div class="bookmarks" v-show="tabBookmark">
    <div class="nav-line">
      <div class="item" :class="{ active: tab === 0 }" @click.prevent="selectTab(0)">Всё <span class="count">{{ total }}</span></div>
      <div class="item" :class="{ active: tab === item.id }" v-for="item in bookmarks" :key="item.id" @click.prevent="selectTab(item.id)">
        {{ item.name }}
        <span class="count" v-if="postLoaded"> {{ posts.bookmarksCount[item.id] }} </span>
      </div>
      <!-- <div class="btn"><mdi-Plus class="add_bookmark" /></div> -->
    </div>

    <div class="container cards">
      <LazyWidgets-CardLibrary
        :id="item.id"
        :type="item.type"
        :alias="item.alias"
        :cover="item.cover"
        :title="item.title"
        v-for="item in posts.data"
        :key="item.id" />

      <LazyPagination :sourceLinks="posts.links" :type="'USER_BOOKMARKS'" v-if="postLoaded" />

      <div class="block__title" v-if="total == 0">Страница закладок пуста.</div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    tabBookmark: { type: Boolean, default: true },
  },

  data() {
    return {
      tab: 0,
    }
  },

  computed: {
    ...mapGetters( 'bookmark', { posts: 'GET_USER_BOOKMARKS' }),
    ...mapGetters( 'bookmark', { bookmarks: 'GET_BOOKMARK_LIST' }),

    postLoaded() {
      return this.posts.data ? this.posts.data.length > 0 : false
    },
    total() {
      return this.postLoaded ? this.posts.total : 0
    },
  },

  async mounted() {
    this.$store.dispatch('bookmark/FETCH_USER_BOOKMARKS', { id: +this.$route.params.id, type: 0 })
    if(this.bookmarks.length === 0) this.$store.dispatch('bookmark/FETCH_BOOKMARK_LIST')
  },

  methods: {
    selectTab(id) {
      if(this.tab !== +id) {
        this.$store.dispatch('bookmark/FETCH_USER_BOOKMARKS', { id: +this.$route.params.id, type: +id })
      }
      this.tab = +id
    },
  },
};
</script>

<style lang="scss">
  .bookmarks {
    .block__title {
      margin: 0 auto;
    }
    .cards {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      // justify-content: space-between;
      .library_item {
        position: relative;
      }
    }
    .nav-line {
      .item.active {
        background-color: rgba(255, 255, 255, 0.12);
        border-bottom: thin solid rgba(0, 255, 34, 0.25);
      }
    }
  }
</style>
