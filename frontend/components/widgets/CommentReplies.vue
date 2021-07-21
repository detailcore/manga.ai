<template>
	<div>
		<div class="comment replies">
			<div class="cover" :style="{ backgroundImage: 'url(' + cover + ')' }"></div>
			<div class="body">
				<div class="header">
					<Nuxt-link to="#"> {{ login }} </Nuxt-link>
					<span class="date"> {{ date }} </span>
				</div>
				<div class="text">{{ text }}</div>
				<div class="footer">
					<span class="like">
						<mdi-ThumbUp class="btn item" title="" />
						<span class="score">{{ score }}</span>
						<mdi-ThumbDown class="btn item" title="" />
					</span>
					<span class="btn reply">
						<mdi-Reply title="" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    id_user: { type: Number, required: true },
    id_parent: { type: Number, required: true },
    cover: { type: String, default: "" },
    login: { type: String, default: "" },
    date: { type: Number, default: 0 },
    text: { type: String, default: "" },
    score: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    type: { type: String, default: "" },
  },

  computed: {
  }
}
</script>

<style lang="scss">
.comment.replies {
	margin-left: 60px;
}
</style>
