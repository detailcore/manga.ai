<template>
  <div class="page_main" :class="{ mobile: widthViewport <= 710 }">
    <LazyRegionHeader />
    <Nuxt />
    <LazyRegionFooter />
  </div>
</template>

<script>
export default {
  name: "default",

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
