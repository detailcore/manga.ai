<template>
  <div class="page">
    <div class="panel">
      <div class="controls">
        <!-- <input type="checkbox"> -->
        <div class="btn" title="Удалить страницу" @click="remove">
          <mdi-TrashCan title="Удалить страницу" />
        </div>
      </div>
    </div>
    <div class="thumb">
    </div>
    <div class="name"> {{ initName }} </div>
    <div class="number">
      <input class="num"
             type="text"
             :value="num"
             placeholder="Стр."
             @change="changePage">
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    idPost: { type: Number, required: true },
    idChapter: { type: Number, required: true },
    index: { type: Number, default: 0 },
    initName: { type: String, default: '' },
  },

  data() {
    return {
      num: null,
    }
  },

  computed: {
    ...mapState( 'reader', ['duplicateIdPages'] ),
    ...mapGetters( 'upload', { files: 'GET_UPLOAD_PAGES' }),
    ...mapGetters( 'reader', { pages: 'GET_CHAPTER_PAGES' }),

    lastNumPage() {
      return (this.pages.length > 0) ? this.pages[this.pages.length-1].page : 0
    },
  },

  created() {
    this.setNum()
  },

  methods: {
    async remove() {
      console.log('Click remove', this.index)
      this.$store.commit('upload/SET_UPLOAD_REMOVE_PAGE', this.index)
    },

    changePage(e) {
      this.$store.commit('upload/SET_UPLOAD_NUM_PAGE', {
        num: +e.target.value,
        name: this.initName,
      })
    },
    setNum() {
      this.num = this.lastNumPage + this.index + 1
      this.$store.commit('upload/SET_UPLOAD_NUM_PAGE', {
        num: this.num,
        name: this.initName,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .page {
    width: 144px;
    overflow: hidden;
    margin-right: 4px;
    position: relative;
    margin-bottom: 20px;
    background: #1e1e1e;
    border-radius: 2px;
    border: thin solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: space-between;
    .panel {
      height: 36px;
      padding: 0 5px;
      .controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          margin: 0 12px;
          cursor: pointer;
        }
      }
    }
    .thumb {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .name {
      left: 0;
      width: 100%;
      bottom: 36px;
      position: absolute;
      text-align: center;
      background: linear-gradient(rgb(255 255 255 / 0%), #1e1e1e);
    }
    .number {
      display: flex;
      height: 36px;
      padding: 0 5px;
      align-items: center;
      justify-content: space-between;
      .num {
        width: 50px;
        color: #fff;
        height: 24px;
        padding: 0 8px;
        font-size: inherit;
        text-align: center;
        border-radius: 2px;
        background: #1e1e1e;
        border: thin solid rgba(255, 255, 255, 0.12);
        &:disabled {
          cursor: not-allowed;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==) repeat;
        }
      }
      .sort {
        font-size: 0.9rem;
        font-weight: 200;
      }
    }
  }
</style>
