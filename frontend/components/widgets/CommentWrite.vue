<template>
  <div class="comment__add">
    <textarea v-model="addText" :maxlength="maxText" class="comment__add__text" placeholder="Введите ваш комментарий"></textarea>
    <div class="comment__add__action">
      <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
      <div class="send">
        <!-- <div class="send__spoiler">
          <span :class="{ decorator: !spoiler }">спойлер</span>
          <div class="switch">
            <input id="switch-1" type="checkbox" class="switch-input" v-model="spoiler" />
            <label for="switch-1" class="switch-label"></label>
          </div>
        </div> -->
        <div class="btn__action" @click="sendComment">Отправить</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { commentCreate } from '~/services/api'

export default {
  props: {
    type: { type: String, required: true },
    id: { type: Number, default: null },
    id_root: { type: Number, default: null },
    action: { type: Boolean, default: false },
  },

  data() {
    return {
      addText: '',
      maxText: 512,
      spoiler: false,
    }
  },

  computed: {
    ...mapGetters( 'post', { idPost: 'GET_POST_ID' }),
    ...mapGetters( 'reader', { idChapter: 'GET_ID_CHAPTER' }),
    ...mapGetters( 'reader', { readerPageCurrent: 'GET_PAGE_CURRENT' }),

    lengthText() {
      return this.addText.length
    },

    root() {
      return this.id_root === null ? (this.id === null ? '' : this.id) : this.id_root
    },
  },

  methods: {
    async sendComment() {
      let idTmp, pageTmp
      if(this.type === 'post') {
        idTmp = this.idPost
        pageTmp = this.idPost
      }
      if(this.type === 'reader') {
        idTmp = this.idChapter
        pageTmp = this.idChapter +'.'+this.readerPageCurrent
      }
      let comment = {
        content: this.addText,
        commentable_type: this.type,
        commentable_id: idTmp, 
        page_id: pageTmp,
        captcha: "",
        permalink: this.$config.jsDomain + this.$route.fullPath,
        root_id: this.root,
        parent_id: this.id === null ? '' : this.id,
      }
      let response = await commentCreate(comment)
      this.$store.commit('comments/SET_ADD_COMMENT', response)
      if(this.action) {
        this.$store.commit('comments/SET_WRITE_COMMENT', { id: this.id, value: !this.action })
      }
      this.addText = ''
    },
  },
}
</script>

<style lang="scss">
  .comment__add {
    &__text {
      width: 100%;
      color: #fff;
      background: #1e1e1e;
      padding: 8px 12px;
      font-size: inherit;
      border-radius: 6px;
      min-height: 104px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.01);
      &:hover,
      &:focus {
        outline: none;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      &:focus {
        box-shadow: inset 0 0 2px 0px #fff;
      }
    }
    &__action {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      .limit {
        font-weight: 300;
        font-size: 0.9rem;
        margin-left: 10px;
      }
      .send {
        display: flex;
        align-items: center;
        flex-direction: row;
        &__spoiler {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-right: 16px;
          span {
            font-weight: 300;
          }
          @include btn_switcher;
        }
        .decorator {
          text-decoration: line-through;
        }
      }
    }
  }
</style>
