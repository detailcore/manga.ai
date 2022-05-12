<template>
  <div class="page_reader" :class="{ mobile: widthViewport <= 710 }">
    <headroom>
      <ReaderHeader />
    </headroom>
    <Nuxt />
  </div>
</template>

<script>
import { headroom } from "vue-headroom";

export default {
  name: "reader",

  components: {
    headroom
  },

  data() {
    return {
      widthViewport: 0
    }
  },

  mounted() {
    this.widthViewport = window.innerWidth
  },

  methods: {
    getWidthViewport() {
      return window.innerWidth
    }
  },
}
</script>