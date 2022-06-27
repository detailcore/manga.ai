<template>
  <div class="create container" v-if="isAdmin">
    <div class="block__title">Модерация</div>

    <div class="panel">
      <div class="menu" v-if="count.manga">
        <div class="menu-item" :class="{ active: type === 'manga' }" @click="setType('manga')">
          Манга
          <span class="count">{{ count.manga ? count.manga.total : 0 }}</span>
        </div>
        <div class="menu-item" :class="{ active: type === 'chapter' }" @click="setType('chapter')">
          Главы
          <span class="count">{{ count.chapter ? count.chapter.total : 0 }}</span>
        </div>
        <div class="menu-item" :class="{ active: type === 'team' }" @click="setType('team')">
          Команды
          <span class="count">{{ count.team ? count.team.total : 0 }}</span>
        </div>
      </div>

      <div class="menu sub-menu" v-if="count.manga">
        <div class="menu-item" :class="{ active: statuses === 1 }" @click="setStatuses(1)">
          Опубликовано
          <span class="count">{{ countSubMenu[1] }}</span>
        </div>
        <div class="menu-item" :class="{ active: statuses === 2 }" @click="setStatuses(2)">
          Проверяется
          <span class="count">{{ countSubMenu[2] }}</span>
        </div>
        <div class="menu-item" :class="{ active: statuses === 3 }" @click="setStatuses(3)">
          Черновик
          <span class="count">{{ countSubMenu[3] }}</span>
        </div>
        <div class="menu-item" :class="{ active: statuses === 4 }" @click="setStatuses(4)">
          Снято с публикации
          <span class="count">{{ countSubMenu[4] }}</span>
        </div>
        <div class="menu-item" :class="{ active: statuses === 5 }" @click="setStatuses(5)">
          Отклонено модератором
          <span class="count">{{ countSubMenu[5] }}</span>
        </div>
      </div>

      <Paginator v-show="pagination.pageMax > 1" />

      <div class="result" v-if="content.length > 0">
        <div class="items" v-if="type === 'manga'">
          <WidgetsModerationTitle v-for="item in content" :key="item.id" :item="item" />
        </div>
        <div class="items" v-if="type === 'chapter'">
          <WidgetsModerationChapter v-for="item in content" :key="item.id" :item="item" />
        </div>
        <div class="items" v-if="type === 'team'">
          <WidgetsModerationTeam v-for="item in content" :key="item.id" :item="item" />
        </div>
      </div>

      <Paginator v-show="pagination.pageMax > 1" />
    </div>

    <notifications />
  </div>
  <div class="create container" v-else>
    <div class="block__title">У вас нет доступа к этой странице</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware({ store, redirect }) {
    if (!store.state.auth.loggedIn || (+store.state.auth.user.id_role !== 1 && +store.state.auth.user.id_role !== 2)) {
      return redirect('/')
    }
  },

  head() {
    return {
      title: 'Модерация',
    }
  },

  async mounted() {
    await this.loadContent(this.type, this.statuses)
  },

  computed: {
    ...mapGetters( 'moderation', { count: 'GET_COUNT' }),
    ...mapGetters( 'moderation', { content: 'GET_CONTENT' }),
    ...mapGetters( 'moderation', { pagination: 'GET_PAGINATION' }),

    isAdmin() {
      return this.$store.state.auth.user ? (this.$store.state.auth.user.id_role === 1) : false
    },
    type() {
      return this.$route.query ? this.$route.query.type : '/'
    },
    statuses() {
      return this.$route.query ? +this.$route.query.statuses : '/'
    },
    countSubMenu() {
      return this.count[this.type]
    }
  },

  methods: {
    async loadContent(type='manga', status=1) {
      if(!this.count.manga) {
        await this.$store.dispatch('moderation/FETCH_COUNT')
      }
      await this.$store.dispatch('moderation/FETCH_CONTENT', {
        type: type,
        status: status,
        page: 1,
      })
    },

    setType(type) {
      this.$router.push({
        path: '/moderation',
        query: {
          type: type,
          statuses: this.statuses,
         }
      })
      this.loadContent(type, this.statuses)
    },

    setStatuses(status) {
      this.$router.push({
        path: '/moderation',
        query: {
          type: this.type,
          statuses: status,
         }
      })
      this.loadContent(this.type, status)
    },
  },
};
</script>

<style lang="scss">
  @include creation_pages;

  .panel {
    .menu {
      display: flex;
      justify-content: space-around;
      .menu-item {
        border-radius: 2px;
        height: 30px;
        line-height: 30px;
        text-transform: uppercase;
        text-align: center;
        border-bottom: 2px solid rgba(255, 255, 255, 0.12);
        margin: 5px;
        width: 100%;
        transition: all .3s ease;
        cursor: pointer;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
          background-color: #858585;
        }
        .count {
          font-size: 0.9rem;
          font-weight: 200;
        }
      }
      .active {
        background-color: #858585;
      }
    }
    .menu.sub-menu {
      .menu-item {
        font-size: 0.85rem;
        font-weight: 200;
      }
    }
  }
</style>
