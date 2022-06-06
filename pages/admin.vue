<template>
  <!-- <div class="admin_panel container" v-if="isAdmin"> -->
  <div class="admin_panel container">
    <div class="block__title">
      <Nuxt-link class="link" to="/admin">Админка</Nuxt-link>
    </div>

    <div class="body">
      <div class="side">
        <div class="nav-column">
          <Nuxt-link class="link" to="?page=roles">Роли</Nuxt-link>
          <Nuxt-link class="link" to="?page=privileges">Привилегий</Nuxt-link>
          <Nuxt-link class="link" to="?page=users">Пользователи</Nuxt-link>

          <Nuxt-link class="link" to="?page=complaints">Жалобы</Nuxt-link>
          <!-- <Nuxt-link class="link" to="?page=categories">Категории</Nuxt-link>
          <Nuxt-link class="link" to="?page=bookmarks">Закладки</Nuxt-link>
          <Nuxt-link class="link" to="?page=peoples">Люди</Nuxt-link>
          <Nuxt-link class="link" to="?page=genres">Жанры</Nuxt-link>
          <Nuxt-link class="link" to="?page=relateds">Связанные</Nuxt-link> -->
        </div>
      </div>

      <div class="main">
        <div class="" v-if="!$route.query.page">Страница в разработке!</div>
        <div class="" v-if="$route.query.page === 'users'">
          <LazyAdminUserSearch />
        </div>
        <div class="" v-if="$route.query.page === 'roles'">
          <LazyAdminRoles />
        </div>
        <div class="" v-if="$route.query.page === 'privileges'">
          <LazyAdminPermissions />
        </div>
        <div class="" v-if="$route.query.page === 'complaints'">
          В разработке!
        </div>
      </div>
    </div>
    <notifications />
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (!store.state.auth.loggedIn || store.state.auth.user.id_role != 1) {
      return redirect('/')
    }
  },

  head() {
    return {
      title: 'Админка',
    }
  },

  mounted() {
    this.loadRole()
  },

  computed: {
    isAdmin() {
      return this.$store.state.auth.user ? (this.$store.state.auth.user.id_role === 1) : false
    },
  },

  methods: {
    async loadRole() {
      await this.$store.dispatch('admin/FETCH_ROLES')
    },
  },
};
</script>

<style lang="scss" scoped>
.admin_panel {
  min-height: calc(100vh - 165px);
  .body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .main {
      width: 100%;
    }
    .side {
      margin-right: 12px;
      .nav-column {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        .link {
          border-radius: 2px;
          height: 30px;
          line-height: 30px;
          text-transform: uppercase;
          text-align: center;
          border-bottom: 2px solid rgba(255, 255, 255, 0.12);
          margin: 5px 0;
          padding: 0 5px;
          width: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.nuxt-link-exact-active {
            background-color: #858585;
          }
        }
      }
    }
  }
}
</style>
