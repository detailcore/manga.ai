<template>
  <div class="create container">
    <div class="block__title">Редактировать произведение</div>
    <div class="create__fields">

      <div class="create__fields__input">
        <span>Название</span>
        <input type="text">
      </div>
    </div>
    <div class="action">
      <div class="save">Сохранить</div>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
  @include creation_pages;
</style>