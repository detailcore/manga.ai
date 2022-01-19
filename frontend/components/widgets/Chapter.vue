<template>
  <div class="widget__chapter">
    <div class="title">
      Том {{ volume }} Глава {{ chapter }}
    </div>
    <div class="body" v-for="item in chapters" :key="item.id">
      <nuxt-link :to="urlChapter+item.id" class="name">
        <mdi-ArrowRightBottom title="" />
        <span v-if="item.name">
          {{ item.name }}
        </span>
        <span v-else> Гл. {{ chapter }} </span>
      </nuxt-link>

      <div class="teams" v-if="item.teams.length > 0">
        <mdi-AccountGroupOutline title="Команда" />
        <nuxt-link :to="'team/'+team.id" v-for="team in item.teams" :key="team.id" class="team">
          {{ team.name }}
        </nuxt-link>
      </div>

      <div class="like_time">
        <div class="likes">
          <mdi-HeartOutline title="Лайков нет" v-if="item.likes == 0" />
          <mdi-CardsHeart title="Лайков" v-else />
          <span>{{ item.likes }}</span>
        </div>
        <div class="time">
          <mdi-ClockOutline title="Дата и время загрузки главы" />
          <span v-html="updateTime(item.updated_at)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chapters: { type: Array, default: [] }
  },

  computed: {
    urlChapter() {
      return this.$route.path + '/ch'
    },
    volume() {
      return this.chapters[0].volume
    },
    chapter() {
      return this.chapters[0].chapter
    },
  },
  
  methods: {
    updateTime(time) {
      if(time != null) {
        let timeReplace = time.replace('.000000Z', '')
        return this.$moment(timeReplace).fromNow()
      }
      return 'Когда-то...'
    },
  },
};
</script>


<style lang="scss">
  @include widget_chapter;
</style>
