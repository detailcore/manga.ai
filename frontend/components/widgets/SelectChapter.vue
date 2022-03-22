<template>
  <div class="btn-select" v-click-outside="hide">
    <div class="btn-selected" @click="isActive = !isActive">
      Том {{ selected.volume }} Глава {{ selected.chapter }}
    </div>

    <ul class="modal-values" v-show="isActive">
      <li class="value" v-for="item in list" :key="item.id" :value="item.id" :class="{ selected: setSelected(item.id) }" @click.prevent="selectPage">
        Том {{ item.volume }} Глава {{ item.chapter }} {{ getTitle(item.name, item.teams) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch(){
    const slug = this.$route.params.slug
    const alias = this.$store.state.reader.alias
    
    if(this.list.length <= 0 || alias !== slug) {
      await this.$store.dispatch('reader/FETCH_CHAPTER_LIST', this.idPost) // получить список глав
    }
  },

  data() {
    return {
      isActive: false,
      isSelected: false,
    }
  },

  computed: {
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { list: 'GET_CHAPTER_LIST' }),
    ...mapGetters( 'reader', { selected: 'GET_CHAPTER_CURRENT' }),
  },

  mounted() {
    this.setAlias()
  },

  methods: {
    getTitle(name='', teams=[]) {
      let result = []
      
      if(teams.length > 0) {
        for (const item of teams) {
          result.push(item.name)
        }
        return name ? ' - ' + name +' || '+ result.join() : ' || ' + result.join()
      }
      return ''
    },
    setSelected(id) {
      if(id === this.selected.id) {
        return true
      }
      return false
    },
    setAlias(){
      this.$store.commit('reader/SET_ALIAS', this.$route.params.slug)
    },
    selectPage(e) {
      const alias = this.$route.params.alias
      const idChapter = 'ch' + e.target.value
      this.$router.push({ name: 'manga-alias-id', params: { id: idChapter, alias: alias  } })
      this.$store.commit('reader/SET_PAGE_CURRENT', 1) // при перелистывании Глав, отображать 1ю страницу
      this.hide()
    },
    show() {
      this.isActive = true
    },
    hide() {
      this.isActive = false
    },
  },
};
</script>

<style lang="scss">
.modal-values {
  @include modal;
  @include scroll_bar;
  top: 100%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, 0%);
  overflow-y: auto;
  overflow-x: hidden;
  list-style-type: none;
  // min-width: min-content;
  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 10rem);
  z-index: 4;
  .value {
    height: 36px;
    // display: flex;
    cursor: pointer;
    max-width: 100%;
    overflow: hidden;
    padding: 10px 20px;
    position: relative;
    align-items: center;
    white-space: nowrap;
    justify-content: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      &:before {
        opacity: 0.1;
      }
    }
    &:before {
      @include before;
    }
  }
  .value.selected {
    background-color: $orange_primary;
  }
}

</style>
