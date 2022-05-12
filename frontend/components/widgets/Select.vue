<template>
  <div class="btn-select" v-click-outside="hide">
    <div class="btn-selected" @click="isActive = !isActive">
      {{ type }} {{ selected }}/{{ lastPage }}
    </div>
    <ul class="values" v-show="isActive">
      <li class="value" v-for="item in pages" :key="item" :value="item" @click="selectPage">
        {{ type }} {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    type: { type: String, defualt: "" },
  },

  data() {
    return {
      isActive: false
    }
  },

  computed: {
    ...mapGetters( 'reader', { pages: 'GET_PAGE_NUMBERS' }),
    ...mapGetters( 'reader', { selected: 'GET_PAGE_CURRENT' }),

    lastPage() {
      return this.pages[this.pages.length-1]
    },
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.$store.commit('reader/SET_PAGE_NUMBERS')
    },
    selectPage(e) {
      let idChapter = this.$route.params.id.replace('ch', '')
      this.$store.commit('reader/SET_PAGE_CURRENT', { num: +e.target.value, id: +idChapter, alias: this.$route.params.alias })
      this.hide()
    },
    show() {
      this.isActive = true
    },
    hide() {
      this.isActive = false
    },
  },
};
</script>

<style lang="scss">
.values {
  @include scroll_bar;
}
</style>
