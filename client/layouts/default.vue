<template>
  <v-app>
    <region-header />
    <region-drawer />
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
import RegionHeader from '../components/RegionHeader.vue'
export default {
  components: { RegionHeader },
  data: () => ({
  })
}
</script>
