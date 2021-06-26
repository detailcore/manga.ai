<template>
  <v-app-bar height="56px" hide-on-scroll scroll-threshold="100" flat app>
    <v-bottom-navigation float shift app>
      <v-btn router to="/">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn router to="/cat">
        <span>Catalog</span>
        <v-icon>mdi-package-variant</v-icon>
      </v-btn>
      <v-btn router to="/rand">
        <span>Random</span>
        <v-icon>mdi-dice-multiple</v-icon>
      </v-btn>

      <v-container class="d-flex align-center col-6 col-sm-4">
        <v-text-field prepend-inner-icon="mdi-magnify" hide-details="false" filled solo dense />
      </v-container>
      <!-- <v-container class="d-flex align-center col-8 col-sm-6">
        <v-autocomplete
          hide-details="false"
          prepend-icon="mdi-magnify"
          auto-select-first
          clearable
          flat
          filled
          dense
        />
      </v-container> -->

      <v-spacer />

      <v-btn router to="/test">
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn router to="/#bell" exact>
        <span>Bell</span>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-avatar color="primary" size="36" @click.stop="drawer">
        <img v-if="0" alt="Avatar" src="~/assets/images_post/22f6_cover_small.jpg">
        <v-icon v-else>mdi-account</v-icon>
      </v-avatar>
      <!-- <v-btn router to="/#account" tag="div">
        <span>Account</span>
        <v-icon>mdi-account</v-icon>
        <v-avatar color="primary" size="46">
          <img v-if="1" alt="Avatar" src="~/assets/images_post/22f6_cover_small.jpg">
        </v-avatar>
      </v-btn> -->
    </v-bottom-navigation>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
  }),

  methods: {
    drawer (value) {
      this.$store.commit('updateDrawer', value)
    }
  }
}
</script>
