<template>
  <div class="page_main" :class="{ mobile: isMobi }">
    <RegionHeader />
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

  computed: {
    isMobi() {
      return this.widthViewport <= 710
    }
  },

}
</script>
