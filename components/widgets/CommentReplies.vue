<template>
	<div>
		<div class="comment replies">
			<div class="cover" :style="{ backgroundImage: 'url(' + cover + ')' }"></div>
			<div class="body">
				<div class="header">
					<Nuxt-link to="#"> {{ login }} </Nuxt-link>
					<span class="date"> {{ updateTime }} </span>
				</div>
				<div class="text">{{ text }}</div>
				<Widgets-CommentButton :id="id" :id_user="id_user" :score="score" :id_root="id_root" :id_parent="id_parent" :text="text" />
			</div>
		</div>
	</div>
</template>

<script>
import { showDate } from '~/services/util'

export default {
  props: {
    id: { type: Number, required: true },
    id_user: { type: Number, required: true },
    id_root: { type: Number, default: null },
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
        return showDate(time)
        // return this.$moment(time).fromNow()
      }
      return 'Когда-то...'
    },
  },
}
</script>

<style lang="scss">
.comment.replies {
	margin-left: 60px;
}
</style>
