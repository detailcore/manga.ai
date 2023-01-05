<template>
  <div class="comment__item">
    <div class="comment__content">
      <div class="cover" :style="{ backgroundImage: `url(${urlCover})` }"></div>
      <div class="body">
        <div class="header">
          <Nuxt-link :to="`/user/${id_user}`"> {{ name }} </Nuxt-link>
          <span class="date"> {{ updateTime }} </span>
        </div>
        <div class="text">
          <span v-show="hasParentName">@{{ parentName }}, </span>
          {{ text }}
        </div>
        <Widgets-CommentButton :id="id" :id_user="id_user" :score="score" :id_root="id_root" :id_parent="id_parent" :text="text" />
      </div>
    </div>

    <div class="comment__children" v-if="hasReplies">
      <LazyWidgets-Comment v-for="(item, index) in replies" :key="index"
        :id="item.id"
        :id_root="item.root_id"
        :id_user="item.user_id"
        :id_parent="item.parent_id"
        :cover="item.author_avatar"
        :name="item.author_name"
        :date="item.created_at"
        :text="item.content"
        :score="(item.upvotes + (-item.downvotes))"
        :replies="item.replies"
        :parentName="name" />
    </div>

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
    name: { type: String, default: "" },
    date: { type: String, default: 0 },
    text: { type: String, default: "" },
    score: { type: Number, default: 0 },
    replies: { type: Array, default: [] },
    parentName: { type: String, default: null },
  },

  computed: {
    updateTime() {
      let time = this.date
      if(time != null) {
        return this.$moment(time).fromNow()
      }
      return 'Когда-то...'
    },
    hasReplies() {
      return this.replies.length > 0
    },
    hasParentName() {
      return this.parentName ? true : false
    },
    urlCover({ $config }) {
      return $config.urlCoverUser + this.id_user + '/' + this.cover
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
