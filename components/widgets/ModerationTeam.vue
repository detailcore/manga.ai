<template>
  <div class="moderation_title">

    <div class="cover" :style="urlCover">
      <div class="action_cover">
        <div class="btn" :class="{ active: isOpenStatus }" @click.prevent="openEditStatus(item.id)">
          <mdi-ExclamationThick />
        </div>
        <div class="btn" @click.prevent="editTitle">
          <mdi-Pencil />
        </div>
      </div>
    </div>

    <div class="info">
      <Nuxt-link class="line title" :to="alias">
        Название: {{ item.name }}
      </Nuxt-link>
      <div class="line subtitle"><b>Альтернативное</b>: {{ item.name_alt }}</div>
      <div class="line"><b>Тайтлов</b>: {{ item.titles }}</div>
      <div class="line"><b>Глав</b>: {{ item.chapters }}</div>
      <div class="line"><b>Лайков</b>: {{ item.likes }}</div>
      <div class="line"><b>Сайт</b>: {{ item.link_site }}</div>
      <div class="line"><b>ВК</b>: {{ item.link_vk }}</div>
      <div class="line"><b>Дискорд</b>: {{ item.link_discord }}</div>
      <div class="line date"><b>Изменено</b>: {{ updateTime }}</div>
      <div class="line description"> <b>Описание</b>:  {{ description }} </div>
    </div>

    <LazyWidgetsModerationStatus v-if="isOpenStatus" :id="item.id" />

  </div>
</template>

<script>
import { showDate } from '~/services/util'

export default {
  props: {
    item: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      isOpenStatus: false,
    }
  },

  computed: {
    urlCover({ $config: { urlCoverTeam } }) {
      return {
        backgroundImage: `url('${this.item.cover ?
                          urlCoverTeam + this.item.id +'/'+ this.item.cover.mid + '.webp' :
                          '/_nuxt/assets/images/one_pixel.jpg'}')`
      }
    },
    alias() {
      return '/team/' + this.item.id
    },
    description() {
      return this.item.description ? this.item.description : 'Отсутствует'
    },
    updateTime() {
      let time = this.item.updated_at
      if(time != null) {
        return showDate(time)
        // return this.$moment(time).fromNow()
      }
      return 'Когда-то...'
    },
  },

  methods: {
    openEditStatus(id) {
      if(id === this.item.id) {
        this.isOpenStatus = !this.isOpenStatus
      }
    },
    editTitle() {
      this.$router.push({
        path: this.alias,
        query: {
          page: 'settings'
        }
      })
    },
  },
}
</script>

<style lang="scss">
  .moderation_title {
    margin: 16px 0;
    padding: 12px 6px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .cover {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 146px;
      height: 220px;
      border-radius: 6px;
      background-size: cover;
      background-position: center;
      .action_cover {
        left: 0;
        bottom: 0;
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-around;
        background-color: rgba(0, 0, 0, 0.6);
        .btn.active {
          &:before {
            opacity: 0.1;
          }
        }
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      width: calc(100% - 160px);
      .line {
        margin: 4px 0;
      }
      .title {
        font-size: 1.5rem;
        font-weight: 200;
        .type {
          padding: 0px 4px;
          border-radius: 2px;
          background-color: #858585;
        }
      }
    }
  }
</style>
