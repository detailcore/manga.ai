<template>
  <header class="region__header">
    <div class="header">
      <div class="header__home">
        <Nuxt-link to="/" class="btn"><mdi-Home title="Главная страница" /></Nuxt-link>
        <Nuxt-link to="/library" class="btn"><mdi-Bookshelf title="Каталог" /></Nuxt-link>
        <region-search />
        
        <!-- 
        <mdi-Bookshelf />
        <mdi-ThemeLightDark />
        <mdi-BookmarkMultiple />
        <mdi-Bell />
        <mdi-Account />
        <mdi-Close />
        <mdi-AccountDetails />
        <mdi-DiceMultiple />
        <mdi-Logout />
        <mdi-CardsHeart />
        <mdi-Magnify />
        <mdi-Star />
        -->
      </div>
      <div class="header__control">
        <div class="btn">
          <mdi-ThemeLightDark title="Переключить цветовую тему сайта" />
        </div>
        <Nuxt-link to="/test" class="btn"><mdi-BookmarkMultiple title="Закладки" /></Nuxt-link>
        <!-- <div class="btn">
          <mdi-Bell title="Уведомления" />
        </div> -->
        <region-user />
      </div>
    </div>
  </header>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .region__header {
    background-color: $dark_primary;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    .header {
      height: 64px;
      padding: 0 15px;
      @include flex_space_center;
      &__home,
      &__control {
        @include flex_center_center;
      }
    }
  }
</style>