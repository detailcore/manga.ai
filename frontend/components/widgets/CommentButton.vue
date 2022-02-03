<template>
  <div class="footer">
    <div class="action">
      <div class="control">
        <span class="like">
          <mdi-ThumbUp class="btn item" title="Поставить лайк" @click.once="upVote" />
          <span class="score">{{ vote }}</span>
          <mdi-ThumbDown class="btn item" title="Поставить дизлайк" @click.once="downVote" />
        </span>
        <span class="btn" v-show="!writeShow" @click="writeShow = true">
          <mdi-Reply title="Ответить" />
        </span>
        <span class="btn" v-show="writeShow" @click="writeShow = false">
          <mdi-Close title="Закрыть ответ" />
        </span>
      </div>

      <div class="control">
        <span class="btn">
          <mdi-ExclamationThick title="Пожаловаться" />
        </span>
        <span class="btn" @click.prevent="editComment">
          <mdi-Pencil title="Редактировать" />
        </span>
        <span class="btn" @click.prevent="delComment">
          <mdi-TrashCan title="Удалить" />
        </span>
      </div>
    </div>

    <div class="reply" v-if="writeShow">
      <Widgets-CommentWrite :type="'App.Post'" :id="id" :id_root="id_root" :id_parent="id_parent" />
    </div>
  </div>
</template>

<script>
import { setUpVoteComment, setDownVoteComment, updateComment, deleteComment } from '~/services/api'

export default {
  props: {
    text: { type: String, default: '' },
    id: { type: Number, required: true },
    score: { type: Number, default: 0 },
    id_user: { type: Number, default: 0 },
    id_root: { type: Number, default: null },
    id_parent: { type: Number, default: null },
  },

  data() {
    return {
      writeShow: false,
    }
  },

  computed: {
    vote() {
      return this.score
    },
    isAllowEditing() {
      return this.$store.state.auth.user.id === this.id_user || this.$store.state.auth.user.id_role === 1
    }
  },

  methods: {
    async upVote() {
      this.$store.commit('comments/SET_COMMENT_SCORE', {id: this.id, str: 'up'})
      await setUpVoteComment(this.id)
    },
    async downVote() {
      this.$store.commit('comments/SET_COMMENT_SCORE', {id: this.id, str: 'down'})
      await setDownVoteComment(this.id)
    },
    async editComment() {
      await updateComment({ id: this.id, content: this.text })
    },
    async delComment() {
      await deleteComment(this.id)
    },
  },
}
</script>

<style lang="scss">
.action {
  display: flex;
  justify-content: space-between;
  .control {
    display: flex;
    min-height: 30px;
    align-items: center;
    flex-direction: row;
  }
}
</style>
