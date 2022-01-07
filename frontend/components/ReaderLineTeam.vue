<template>
  <div class="reader-teams container">
    <div class="teams">
      <div class="team" v-for="team in teams" :key="team.id">
        <div class="ava" :style="`background-image: url(${team.cover});`"></div>
        <div class="text">
          <Nuxt-link to="#" class="name"> {{ team.name }} </Nuxt-link>
          <div class="desc"> {{ team.desc_short }} </div>
        </div>
      </div>
    </div>

    <div class="ty">
      <button>
        <mdi-HeartOutline title="Сказать спасибо!" v-if="true" />
        <mdi-CardsHeart title="Вы уже поставили лайк" v-else />
      </button>
      <div class="text">
        <span> Благодарностей: {{ likes }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    likes: { type: Number, defualt: 0 }
  },

  computed: {
    ...mapGetters('reader', { teams: 'GET_TEAMS_CURREN' }),
  },
  
};
</script>

<style lang="scss">
.reader-teams {
  padding: 1rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  .teams {
    display: flex;
    .team {
      display: flex;
      align-items: center;
      padding-right: 1rem;
      .ava {
        width: 60px;
        height: 60px;
        margin-right: 1rem;
        border-radius: 4px;
        background-size: cover;
        background-position: center;
      }
      .text {
        height: 100%;
        max-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name {
          color: $orange_primary;
          font-weight: 600;
        }
        .desc {
          font-weight: 200;
          overflow: hidden;
        }
      }
    }
  }
  .ty {
    display: flex;
    // border: thin solid $orange_primary;
    button {
      @include button;
      border: none;
      color: $orange_primary;
      margin-right: 0.5rem;
      border-radius: 4px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
      }
    }
  }
}
</style>
