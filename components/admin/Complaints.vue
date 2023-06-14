<template>
  <div class="complaints">
    <div class="block__title">Жалобы</div>

    <div class="nav-rows">
      <div class="row-item" :class="{ active: $route.query.type === 'post' }" @click="goto('post')">Тайтлы</div>
      <div class="row-item" :class="{ active: $route.query.type === 'reader' }" @click="goto('reader')">Читалка</div>
      <div class="row-item" :class="{ active: $route.query.type === 'comment' }" @click="goto('comment')">Комментарии</div>
    </div>

    <div class="content">
      <div class="block__subtitle" v-if="isEmpty">Жалобы отсутствуют</div>

      <div class="item" v-for="item in complaints.data" :key="item.id">
        <div class="num">{{ item.id }}</div>
        <div class="main">
          <div class="link"><b>Ссылка</b>: <Nuxt-link :to="item.link" target="_blank">{{ item.link }}</Nuxt-link></div>
          <div class="cause"><b>Причина</b>: {{ item.cause }}</div>
          <div class="text"><b>Описание</b>: {{ item.text }}</div>
          <div class="user"><b>Отправитель</b>: <Nuxt-link class="link" :to="'/user/' + item.user_id">{{ item.user_name }}</Nuxt-link> ({{ item.user_role }})</div>
        </div>
        <div class="side">
          <div class="btn" @click.once="remove(item.id)">X</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {

  computed: {
    ...mapState('admin', { complaints: 'complaints' }),

    isEmpty() {
      return (this.complaints.data?.length == 0 || this.complaints?.length == 0) ? true : false
    }
  },

  methods: {
    async goto(type) {
      this.$router.push({
        query: {
          page: 'complaints',
          type: type,
        },
      })
      await this.$store.dispatch('admin/FETCH_COMPLAINTS', type)
    },
    async remove(id) {
      await this.$store.dispatch('admin/FETCH_REMOVE_COMPLAINT', id)
    },
  },
}
</script>

<style lang="scss" scoped>
  .complaints {
    .nav-rows{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .row-item {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        cursor: pointer;
        padding: 6px;
        margin: 4px 0;
        border-radius: 6px;
        position: relative;
        text-decoration: none;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        border: thin solid rgba(255, 255, 255, 0.12);
        &.active {
          &:before {
            opacity: 0.1;
          }
        }
        &:nth-child(even) {
          margin-left: 8px;
          margin-right: 8px;
        }
        &:hover {
          font-weight: bold;
          &:before {
            opacity: 0.1;
          }
        }
        &:before {
          @include before;
        }
      }
    }

    .content {
      margin: 8px 12px 8px 0;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }
      .num {
        margin-right: 12px;
      }
      .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        div {
          padding: 3px 0;
        }
      }
      .side {
        display: flex;
      }
    }
  }
</style>
