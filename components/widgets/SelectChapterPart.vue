<template>
  <div>
    <div class="number">
      Том {{ list[0].volume }} Глава {{ list[0].chapter }}
    </div>
    <!-- <Nuxt-link class="value" v-for="item in list" :key="item.id" :id="item.id" :to="$route.fullPath.replace($route.params.id, `ch${item.id}`)"> -->
    <div class="value" :class="{ selected: setSelected(item.id) }" v-for="item in list" :key="item.id" @click="selectPage(item.id)">
      <div class="value__name">
        <mdi-ArrowRightBottom title="" />
        <span class="name" v-show="item.name">{{ item.name }}</span>
        <span class="name" v-show="!item.name">Глава без названия</span>
      </div>
      <div class="value__teams" v-show="item.teams.length > 0">
        <mdi-AccountGroupOutline title="Команда" />
        <div class="team_list">
          <span v-for="team in item.teams" :key="team.id" class="team"> - {{ team.name }}</span>
        </div>
      </div>
    </div>
    <!-- </Nuxt-link> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    list: { type: Array, default: () => [] },
  },

  computed: {
    ...mapGetters( 'reader', { selected: 'GET_CHAPTER_CURRENT' }),
  },

  methods: {
    setSelected(id) {
      if(id === this.selected.id) {
        return true
      }
      return false
    },
    selectPage(id) {
      this.$store.commit('reader/SET_PAGE_CURRENT', { num: 1, id: id, alias: this.$route.params.alias })
    },
  },
};
</script>

<style lang="scss">
.parts {
  display: flex;
  flex-direction: column;
  // padding: 10px 20px;
  .number {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 1.15rem;
    font-weight: 600;
    padding: 0 0 0 2px;
    border-radius: 2px;
    background: linear-gradient(to right, #121212, 80%, #ff6820 90%);
  }
  .value.selected,
  .value.nuxt-link-active {
    .value__teams {
      color: #000;
    }
  }
  .value {
    padding: 2px 2px 2px 6px;
    text-decoration: none;
    &__name {
      height: 20px;
      display: flex;
      align-items: center;
      .name {
        margin-left: 26px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .arrow-right-bottom-icon {
        top: -2px;
        left: 6px;
        position: absolute;
      }
    }
    &__teams {
      color: #919191;
      display: flex;
      overflow: hidden;
      align-items: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      .team_list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .team {
          font-size: 0.9rem;
          font-weight: 200;
          padding: 0 4px;
          display: flex;
          align-items: center;
        }
      }
    }
    .material-design-icon {
      min-width: 21px;
      min-height: 21px;
    }
  }
}
</style>
