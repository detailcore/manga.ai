<template>
  <div class="moderation_title" v-if="item.views >= 0">

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
        <span class="type">{{ type }}</span>
        {{ titles }}
        ({{ year }})
      </Nuxt-link>
      <div class="line date"><b>Изменено</b>: {{ updateTime }}</div>
      <div class="line adult"> <b>Возрастное ограничение</b>: {{ adult }} </div>
      <div class="line adult"> <b>Жанры</b>: {{ genres }} </div>
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
    urlCover({ $config: { urlCoverTitle } }) {
      return {
        backgroundImage: `url('${this.item.cover ? urlCoverTitle + this.item.id +'/'+ this.item.cover.mid + '.webp' : '/_nuxt/assets/images/one_pixel.jpg'}')`
      }
    },
    alias() {
      return '/manga/' + this.item.alias
    },
    titles() {
      return this.item.title_rus ? this.item.title_rus : this.item.title_eng
    },
    type() {
      return this.item.type ? this.item.type.name : ''
    },
    year() {
      return this.item.year ? this.item.year : ''
    },
    adult() {
      return this.item.adult_rank ? this.item.adult_rank.name : ''
    },
    genres() {
      return this.item.genres ? this.item.genres.map(item => item.name).join(', ') : ''
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
      console.log('editTitle')
      this.$router.push({
        path: `${this.alias}/edit`,
        query: {
          id: this.item.id
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
