<template>
  <div class="btn-select" v-click-outside="hide">
    <div class="btn-selected" @click="isActive = !isActive">
      {{ type }} {{ selected }}/{{ max }}
    </div>
    <ul class="values" v-show="isActive">
      <li class="value" v-for="item in max" :key="item" :value="item" @click="selectPage">
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
    ...mapGetters( 'reader', { selected: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { max: 'GET_PAGE_MAX' }),
  },

  methods: {
    selectPage(e) {
      this.$store.commit('reader/SET_PAGE_CURRENT', +e.target.value)
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
