<template>
  <div class="footer">
    <div class="action">
      <div class="control">
        <span class="like">
          <mdi-ThumbUp class="btn item" title="Поставить лайк" @click.once="upVote" />
          <span class="score">{{ vote }}</span>
          <mdi-ThumbDown class="btn item" title="Поставить дизлайк" @click.once="downVote" />
        </span>
        <span class="btn" @click="showComplaint">
          <mdi-ExclamationThick v-if="!isOpenComplaint" title="Пожаловаться" />
          <mdi-Close v-if="isOpenComplaint" title="Закрыть" />
        </span>
        <span class="btn" @click="showWriteComment">
          <mdi-Reply v-if="!isOpenComment" title="Ответить" />
          <mdi-Close v-if="isOpenComment" title="Закрыть" />
        </span>
      </div>

      <div class="control" v-if="hasEdit">
        <span class="btn" @click.prevent="editComment" >
          <mdi-Pencil title="Редактировать" />
        </span>
        <span class="btn" @click.prevent="delComment">
          <mdi-TrashCan title="Удалить" />
        </span>
      </div>
    </div>

    <Widgets-CommentWrite class="reply" v-if="isOpenComment" :id="id" :id_root="id_root" :action="writeShow" />

    <Widgets-CommentEdit class="reply" v-if="isOpenEditComment" :id="id" :text="text" />

    <Widgets-Complaint v-if="isOpenComplaint" :id="id" :id_user="id_user" :type="'comment'" :content="text" :action="complaintShow" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setUpVoteComment, setDownVoteComment, deleteComment } from '~/services/api'

export default {
  props: {
    text: { type: String, default: '' },
    id: { type: Number, required: true },
    score: { type: Number, default: 0 },
    id_user: { type: Number, default: null },
    id_root: { type: Number, default: null },
    id_parent: { type: Number, default: null },
  },

  data() {
    return {
      isEdit: false,
      cnt: this.score,
      writeShow: false,
      complaintShow: false
    }
  },

  computed: {
    ...mapGetters( 'comments', { edit: 'GET_OPEN_EDIT' }),
    ...mapGetters( 'comments', { writeComment: 'GET_WRITE_COMMENT' }),
    ...mapGetters( 'complaint', { openComplaint: 'GET_COMPLAINT_OPEN' }),

    isOpenEditComment() {
      return this.edit.value && this.edit.id === this.id
    },
    isOpenComment() {
      return this.writeComment.value && this.writeComment.id === this.id
    },
    isOpenComplaint() {
      return this.openComplaint.value && this.openComplaint.id === this.id && (this.openComplaint.type === 'comment')
    },
    isMyComment() {
      return this.$store.state.auth.loggedIn ? (this.$store.state.auth.user.id === this.id_user) : false
    },
    vote() {
      return this.cnt
    },
    hasEdit() {
      return this.$store.state.auth.loggedIn ? this.$store.state.auth.user.id_role === 1 : false
      // return (this.$store.state.auth.loggedIn ? this.$store.state.auth.user.id : 0) ||
      //        (this.$store.state.auth.loggedIn ? this.$store.state.auth.user.id_role === 1 : false)
    },
  },

  methods: {
    loggedInPlease() {
      this.$notify({
        title: 'Войдите в аккаунт!',
        text: 'Для выполнения этого действия необходимо выполнить вход в аккаунт!',
        type: 'error'
      })
    },
    showWriteComment() {
      this.writeShow = !this.writeComment.value
      this.$store.commit('comments/SET_WRITE_COMMENT', { id: this.id, value: this.writeShow })
    },
    showComplaint() {
      this.complaintShow = !this.openComplaint.value
      this.$store.commit('complaint/SET_COMPLAINT_OPEN', { id: this.id, value: this.complaintShow, type: 'comment' })
    },
    async upVote() {
      if(!this.$store.state.auth.loggedIn) {
        this.loggedInPlease()
        return false
      }
      if(this.isMyComment) {
        this.voteMyself()
        return false
      }
      this.cnt++
      this.$store.commit('comments/SET_COMMENT_SCORE', {id: this.id, str: 'up'})
      await setUpVoteComment(this.id)
    },
    async downVote() {
      if(!this.$store.state.auth.loggedIn) {
        this.loggedInPlease()
        return false
      }
      if(this.isMyComment) {
        this.voteMyself()
        return false
      }
      this.cnt--
      this.$store.commit('comments/SET_COMMENT_SCORE', {id: this.id, str: 'down'})
      await setDownVoteComment(this.id)
    },
    async editComment() {
      this.$store.commit('comments/SET_OPEN_EDIT', { id: this.id, value: !this.edit.value })
      // await updateComment({ id: this.id, content: this.text })
      console.log('click to update')
    },
    async delComment() {
      this.$store.commit('comments/SET_REMOVE_COMMENT', this.id)
      await deleteComment(this.id)
    },
    voteMyself() {
      this.$notify({
        text: `Вы не можете голосовать за самого себя!`,
        type: 'error',
      })
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
