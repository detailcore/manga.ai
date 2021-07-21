<template>
  <div>
    <div class="comment">
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
          <div class="replies" v-show="replies">
            Показать (+{{ replies }})
          </div>
        </div>
      </div>
    </div>

    <span v-for="(item, index) in dataReplies" :key="index">
      <widgets-comment-replies v-if="id === item.id_parent"
        :id="item.id"
        :id_user="item.user.id"
        :id_parent="item.id_parent"
        :cover="item.user.cover"
        :login="item.user.login"
        :date="item.date"
        :text="item.text"
        :score="item.score"
        :replies="item.count_replies"
        type="comment" />
    </span>

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
    dataReplies() {
      return [
        {
          id: 3,
          id_parent: 2,
          count_replies: 1,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133495772,
          is_fixed: false,
          score: 0,
          user: {
            id: 412,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 412',
          }
        },
        {
          id: 10,
          id_parent: 2,
          count_replies: 0,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133496717,
          is_fixed: false,
          score: 0,
          user: {
            id: 410,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 410',
          }
        },
        {
          id: 11,
          id_parent: 3,
          count_replies: 0,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133496717,
          is_fixed: false,
          score: 0,
          user: {
            id: 419,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 419',
          }
        },
      ]
    }
  }
}
</script>

<style lang="scss"></style>
