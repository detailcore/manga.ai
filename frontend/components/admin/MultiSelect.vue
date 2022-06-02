<template>
  <multiselect track-by="name" label="name" 
      placeholder="Введите текст или выберите из списка" 
      selectLabel='Нажмите для выбора' 
      selectedLabel="Уже выбрано" 
      deselectLabel="Удалить"
      v-model="currentSelected"
      :options="data"
      :multiple="type"
      :max-height="500"
      :close-on-select="close"
      @select="onSelect"
      @remove="onRemove">
    <template slot="tag" slot-scope="{ option, remove }">
      <div class="tag__item">
        <div class="tag__name">{{ option.name }}</div>
        <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
      </div>
    </template>
  </multiselect>
</template>

<script>

export default {
  props: {
    user: { type: Object, default: () => ({}) }, // пользователь
    type: { type: Boolean, default: true }, // мультиселект или нет
    close: { type: Boolean, default: false }, // закрывать выпадашку при клике
    data: { type: Array, required: true }, // список всего
    selected: { type: Array, required: true }, // было выбрано
  },

  data() {
    return {
      currentSelected: this.selected,
      id_role: this.selected[0] ? this.selected[0].pivot.role_id : null
    }
  },

  methods: {
    async onSelect (option) {
      if(this.$route.query.page === 'users') {
        await this.$store.dispatch('admin/FETCH_USER_SET_ROLE', { id_role: option.id, id_user: this.user.id })
      }
      if(this.$route.query.page === 'roles') { // Добавить разрешение к роли
        await this.$store.dispatch('admin/FETCH_ADD_PERMISSIONS_FOR_ROLE', { id_role: this.id_role, id_permission: option.id })
      }
    },
    async onRemove (option) { // Удалить разрешение у роли
      if(this.$route.query.page === 'roles') {
        await this.$store.dispatch('admin/FETCH_REMOVE_PERMISSIONS_FOR_ROLE', { id_role: this.id_role, id_permission: option.id })
      }
    },
  },
}
</script>

<style lang="scss">
</style>
