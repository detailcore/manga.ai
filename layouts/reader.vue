<template>
  <div class="page_reader" :class="{ mobile: isMobi }">
    <headroom>
      <ReaderHeader />
    </headroom>
    <Nuxt />
  </div>
</template>

<script>
import { headroom } from "vue-headroom"

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

  computed: {
    isMobi() {
      return this.widthViewport <= 710
    }
  },

}
</script>
