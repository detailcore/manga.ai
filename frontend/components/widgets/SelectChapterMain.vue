<template>
  <div class="btn-select" v-click-outside="hide">
    <div class="btn-selected" @click="isActive = !isActive">
      <span class="vol">Том {{ selected.volume }} </span> Глава {{ selected.chapter }}
    </div>

    <ul class="modal-values" v-show="isActive">
      <Widgets-SelectChapterPart class="parts" v-for="(parts, i) in testList" :key="i" :list="parts" />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mergeDuplicates } from '~/services/util'

export default {
  async fetch(){
    await this.$store.dispatch('reader/FETCH_CHAPTER_LIST', this.idPost) // получить список глав
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

    testList() {
      return mergeDuplicates(this.list)
    },
  },

  mounted() {
    this.setAlias()
  },

  methods: {
    setAlias(){
      this.$store.commit('reader/SET_ALIAS', this.$route.params.slug)
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
.btn-select {
  .btn-selected {
    .vol { white-space: pre-wrap; }
  }
  .modal-values {
    @include modal;
    @include scroll_bar;
    top: 100%;
    left: 50%;
    // position: absolute;
    transform: translate(-50%, 0%);
    overflow-y: auto;
    overflow-x: hidden;
    list-style-type: none;
    // min-width: min-content;
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 10rem);
    z-index: 4;
    .value {
      // height: 36px;
      // display: flex;
      cursor: pointer;
      max-width: 100%;
      overflow: hidden;
      // padding: 10px 20px;
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
    .value.selected,
    .value.nuxt-link-active {
      background-color: $orange_primary;
    }
  }
}
</style>
