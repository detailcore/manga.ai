<template>
  <div class="widget__chapter">
    <div class="title">
      Том {{ volume }} Глава {{ chapter }}
    </div>
    <div class="body" v-for="item in chapters" :key="item.id">
      <div class="link_teams">
        <Nuxt-link :to="urlChapter+item.id" class="link_name">
          <mdi-ArrowRightBottom title="" />
          <span class="name" v-if="item.name">
            {{ item.name }}
          </span>
          <span v-else> Гл. {{ chapter }} </span>
        </Nuxt-link>

        <div class="teams" v-if="item.teams.length > 0">
          <mdi-AccountGroupOutline title="Команда" />
          <div class="list">
            <span v-for="team in item.teams" :key="team.id" class="team">{{ team.name }}</span>
          </div>
        </div>
      </div>

      <div class="like_time">
        <!-- <div class="likes">
          <mdi-HeartOutline title="Лайков нет" v-if="item.likes == 0" />
          <mdi-CardsHeart title="Лайков" v-else />
          <span>{{ item.likes }}</span>
        </div> -->
        <div class="time">
          <mdi-ClockOutline title="Дата и время загрузки главы" />
          <span class="date"> {{ updateTime(item.updated_at) }} </span>
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
      border-radius: 2px 2px 0px 0px;
      background: linear-gradient(to right, #121212, 60%, transparent 90%);
    }
    .body {
      padding: 0 4px;
      min-height: 26px;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #121212;
      border-left: 2px solid rgba(0, 255, 34, 0.25);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.12);
      }
      // .name_teams {
        // width: calc(100% - 212px);
        // display: flex;
        // justify-content: space-between;
      // }
      .link_teams {
        display: flex;
        flex-grow: 1;
      }
      .link_name {
        display: flex;
        flex-grow: 1;
        align-items: center;
        width: 65%;
        // height: 26px;
        .name {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        .material-design-icon {
          min-height: 26px;
          min-width: 26px;
        }
      }
      .teams {
        display: flex;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        span {
          min-width: 21px;
          min-height: 21px;
        }
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
        .material-design-icon {
          min-width: 21px;
          min-height: 21px;
        }
        .date {
          text-align: center;
          white-space: normal;
        }
        span:last-of-type {
          padding: 0 0 0 2px;
        }
      }
    }
  }
</style>
