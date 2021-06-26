<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      Test page
    </v-col>
  </v-row>
</template>

<script>

export default {
  components: {
  },
  head: {
    title: 'Test page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Test page description'
      }
    ]
  },
  mounted () {
    // window.Echo.channel('channel')
    //   .listen('Hello', (e) => {
    //     console.log(e)
    //   })

    // console.log(window.Echo)
  }
}
</script>
