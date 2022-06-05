<template>
  <div class="user-generated container">
    <div class="block__title">
      Coming soon!
    </div>
    <div class="block__subtitle">
      Сейчас в разработке, но скоро будет!
    </div>
    <div class="">
      На этой странице будут добавленные вами тайтлы, команды, главы, комментарии, (возможно жалобы) и т.д. В общем то, что душе угодно и возможно чего еще!
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Мои релизы',
    }
  },
};
</script>


<style lang="scss">
.user-generated {
  height: calc(100vh - 165px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
