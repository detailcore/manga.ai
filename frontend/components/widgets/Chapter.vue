<template>
  <div class="widget__chapter">
    <div class="title">
      Том {{ volume }} Глава {{ chapter }}
    </div>
    <div class="body" v-for="item in chapters" :key="item.id">
      <nuxt-link :to="urlChapter" class="name">
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
      return this.$route.path + '/ch' + this.chapters[0].id
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
  .widget__chapter {
    margin: 0 0 10px 0;
    border-radius: 2px;
    // background-color: rgba(255, 255, 255, 0.12);
    background-color: #1e1e1e;
    .title {
      display: flex;
      align-items: center;
      height: 24px;
      font-weight: 600;
      padding: 0 0 0 2px;
    }
    .body {
      padding: 0 4px;
      height: 26px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #121212;
      border-left: 2px solid rgba(0, 255, 34, 0.25);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.12);
      }
      .name_teams {
        // width: calc(100% - 212px);
        // display: flex;
        // justify-content: space-between;
      }
      .name {
        display: flex;
        flex-grow: 1;
        align-items: center;
        height: 26px;
        .material-design-icon {
          height: 26px;
        }
      }
      .teams {
        display: flex;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .team {
          padding: 0 4px;
          display: flex;
          align-items: center;
        }
      }
      .like_time {
        display: flex;
        max-width: 210px;
        white-space: nowrap;
      }
      .likes {
        display: flex;
        align-items: center;
        padding: 0 6px;
        span:last-of-type {
          padding: 0 4px 0 2px;
        }
      }
      .time {
        display: flex;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span:last-of-type {
          padding: 0 0 0 2px;
        }
      }
    }
  }
</style>
