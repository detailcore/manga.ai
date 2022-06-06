<template>
  <div class="roles">
    <div class="item" v-for="item in roles" :key="item.id">
    <div class="block__title">
      {{ item.name }}
      <div class="btn" @click="delOld(item.id)"><mdi-TrashCan title="Удалить" /></div>
    </div>
      <AdminMultiSelect :data="permissions" :selected="item.permissions" />
    </div>

    <div class="add">
      <div class="add_value">
        <div class="block__subtitle">Добавить новую роль:</div>
        <div class="value_body">
          <input class="text" name="name" type="text" placeholder="По окончанию ввода, жми Enter" v-on:keyup.enter="addRole">
        </div>
      </div>
    </div>

    <div class="list">
      <div class="block__subtitle">Список новых ролей для сохранения:</div>
      <div class="item" v-for="(item, i) in newAdd" :key="i">
        {{ item }}
        <div class="btn" @click="delNew(i)"><mdi-TrashCan title="Удалить" /></div>
      </div>
    </div>

    <div class="action">
      <div class="save" @click="save">Сохранить</div>
      <div class="cancel">Отмена</div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newAdd: [],
      selectedRoles: [],
    }
  },
  computed: {
    ...mapGetters( 'admin', { roles: 'GET_ROLES' }),
    ...mapGetters( 'admin', { permissions: 'GET_PERMISSIONS' }),
  },

  created() {
    this.getRoleList()
    this.getPermissions()
  },

  methods: {
    async save() {
      if(this.newAdd.length == 0) {
        this.$notify({
          title: `Вы ничего нового не добавили!`,
          text: `Для добавления нажмите Enter и только потом сохраните!.`,
          type: 'error',
        })
        return false
      }
      console.log('click save')
      await this.$store.dispatch('admin/FETCH_ADD_ROLES', this.newAdd)
      this.newAdd = []
      await this.getRoleList()
    },
    addRole(e) {
      this.newAdd.push(e.target.value)
      e.target.value = ''
    },
    delNew(i) {
      this.newAdd.splice(i, 1);
    },
    async delOld(id) {
      console.log('id', id)
      await this.$store.dispatch('admin/FETCH_REMOVE_ROLES', id)
      await this.getRoleList()
    },
    async getRoleList() {
      await this.$store.dispatch('admin/FETCH_ROLES')
    },
    async getPermissions() {
      await this.$store.dispatch('admin/FETCH_PERMISSIONS')
    },
  },
}
</script>

<style lang="scss" scoped>
.roles {
  .add_value {
    padding-top: 16px;
    .value_body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .text {
      @include input_text;
      height: 36px;
      border-radius: 6px;
      width: 100%;
    }
  }
  .list {
    .item {
      display: flex;
      align-items: center;
    }
  }
  .action {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 12px 0 24px 0;
    .save {
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
      }
    }
    .cancel {
      border-bottom: thin solid rgba(255, 34, 0, 0.25);
      &:hover {
        border: thin solid rgba(255, 34, 0, 0.25);
      }
    }
    .save,
    .cancel {
      cursor: pointer;
      padding: 4px 6px;
      position: relative;
      border-radius: 4px;
      &:hover {
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
    }
  }
}
</style>
