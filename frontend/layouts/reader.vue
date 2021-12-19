<template>
  <div>
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
}
</script>

<style lang="scss">
.links {
  // @include center;
}

</style>
