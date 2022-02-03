<template>
  <div>
    <div class="comment">
      <div class="cover" :style="{ backgroundImage: 'url(' + cover + ')' }"></div>
      <div class="body">
        <div class="header">
          <Nuxt-link :to="`user/${id_user}`"> {{ login }} </Nuxt-link>
          <span class="date"> {{ updateTime }} </span>
        </div>
        <div class="text">{{ text }}</div>
        <Widgets-CommentButton :id="id" :id_user="id_user" :score="score" :id_root="id_root" :id_parent="id_parent" :text="text" />
      </div>
    </div>

    <span v-for="(item, index) in replies" :key="index">
      <Widgets-CommentReplies
        :id="item.id"
        :id_root="item.root_id"
        :id_user="item.user_id"
        :id_parent="item.parent_id"
        :cover="item.author_avatar"
        :login="item.author_name"
        :date="item.created_at"
        :text="item.content"
        :score="(item.upvotes + (-item.downvotes))"
        :replies="item.replies"
        :replies_count="item.replies.length"
        type="comment" />
    </span>

  </div>
</template>

<script>
import { setUpVoteComment, setDownVoteComment } from '~/services/api'

export default {
  props: {
    id: { type: Number, required: true },
    id_root: { type: Number, default: null },
    id_user: { type: Number, required: true },
    id_parent: { type: Number, default: null },
    cover: { type: String, default: "" },
    login: { type: String, default: "" },
    date: { type: String, default: 0 },
    text: { type: String, default: "" },
    score: { type: Number, default: 0 },
    replies: { type: Array, default: [] },
    replies_count: { type: Number, default: 0 },
    type: { type: String, default: "" },
  },

  computed: {
    updateTime() {
      let time = this.date
      if(time != null) {
        let timeReplace = time.replace('.000000Z', '')
        return this.$moment(timeReplace).fromNow()
      }
      return 'Когда-то...'
    },
  },

  methods: {
    async upVote() {
      await setUpVoteComment(this.id)
    },
    async downVote() {
      await setDownVoteComment(this.id)
    },
  },
}
</script>

<style lang="scss"></style>
