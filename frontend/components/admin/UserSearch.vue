<template>
  <div class="user_search">

    <div class="search">
      <input type="search" class="text"
        autocomplete="off"
        v-model.trim="query"
        placeholder="Поиск по никнейму или почте"
        @input="sendSearch">

      <div class="result">
        <div v-for="item in users" class="item" :key="item.id">
          <div class="block__title">{{ item.name }}</div>
          <div class="roles">
            Роль: <span v-show="item.roles.length == 0">не назначена!</span>
            <AdminMultiSelect :data="roles" :selected="item.roles" :type="false" :close="true" :user="item" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      query: ''
    }
  },

  computed: {
    ...mapGetters( 'admin', { roles: 'GET_ROLES' }),
    ...mapGetters( 'admin', { role: 'GET_USER_ROLE' }),
    ...mapGetters( 'admin', { users: 'GET_USER_SEARCH' }),
  },

  methods: {
    async sendSearch(e) {
      if(e.target.value.length > 3) {
        await this.$store.dispatch('admin/FETCH_USER_SEARCH', e.target.value)
      }
    },
    edit({ id, id_role }) {
      console.log(id, id_role)
    },
    async sendEdit(id_user) {
      await this.$store.dispatch('admin/FETCH_USER_SET_ROLE', { id_user: id_user })
    },
  },
}
</script>

<style lang="scss" scoped>
  .user_search {
    .text {
      @include input_text;
      width: 100%;
      height: 36px;
      border-radius: 6px;
    }
    &.multiselect__single {
      margin: 0;
    }
  }
</style>
