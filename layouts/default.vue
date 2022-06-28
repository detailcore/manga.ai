<template>
  <div class="page_main" :class="{ mobile: widthViewport <= 710 }">
    <LazyRegionHeader />
    <Nuxt />
    <LazyRegionFooter />
  </div>
</template>

<script>
import { reloadPage } from '~/services/util'

export default {
  name: "default",

  data() {
    return {
      widthViewport: 0
    }
  },

  mounted() {
    this.widthViewport = window.innerWidth
    // reloadPage()
  },

  methods: {
    getWidthViewport() {
      return window.innerWidth
    }
  },
}
</script>
