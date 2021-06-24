<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      QWE
    </v-col>
  </v-row>
</template>

<script>

export default {
  components: {
  },
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ]
  },
  mounted () {
    window.Echo.channel('channel')
      .listen('Hello', (e) => {
        console.log(e)
      })

    console.log(window.Echo)
  }
}
</script>
