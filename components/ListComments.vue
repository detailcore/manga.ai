<template>
  <div>
    <LazyWidgets-CommentWrite />

    <div class="action" v-show="showComments" @click="closeComments">
      <div class="cancel">Закрыть</div>
    </div>

    <!-- Сортировка комментариев в РАЗРАБОТКЕ -->
    <!-- <div class="comments__sort">
      <select v-model="selected">
        <option v-for="(item, index) in sort" :value="item.value" :key="index">
          {{ item.text }}
        </option>
      </select>
    </div> -->


    <div class="comment__list" v-if="!isEmpty">
      <LazyWidgets-Comment v-for="(item, index) in comments" :key="index"
        :id="item.id"
        :id_root="item.root_id"
        :id_user="item.user_id"
        :id_parent="item.parent_id"
        :cover="item.author_avatar"
        :name="item.author_name"
        :date="item.created_at"
        :text="item.content"
        :score="(item.upvotes + (-item.downvotes))"
        :replies="item.replies" />
    </div>

    <div class="comments_info" v-if="isEmptyTotal">На этой странице еще нет комментариев, вы можете стать первым(ой)!</div>
    <div class="comments_info" v-if="!isShowСomments && isReader">Отображение комментариев отключено в настройках читалки!</div>

    <div v-if="goNext" class="btn__action comments__more" @click="loadMore">Показать еще комментарии</div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.loadComments()
  },

  // data() {
  //   return {
  //     selected: 'asc',
  //     sort: [
  //       { text: 'Сначала новые', value: 'asc' },
  //       { text: 'Сначала старые', value: 'desc' },
  //       { text: 'Сначала залайканные', value: 'like' }
  //     ],
  //   }
  // },

  computed: {
    ...mapGetters( 'post', { idPost: 'GET_POST_ID' }),
    ...mapGetters( 'comments', { comments: 'GET_COMMENTS' }),
    ...mapGetters( 'reader', { idChapter: 'GET_ID_CHAPTER' }),
    ...mapGetters( 'reader', { showComments: 'GET_OPEN_COMMENTS' }),
    ...mapGetters( 'reader', { readerPageCurrent: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { settingComments: 'GET_SETTING_COMMENTS' }),

    isEmpty() {
      return this.comments.length == 0
    },
    isEmptyTotal() {
      return this.$store.state.comments.total === 0
    },
    isPost() {
      return this.$route.name === 'manga-alias'
    },
    isReader() {
      return this.$route.name === 'manga-alias-id'
    },
    isShowСomments() {
      return this.settingComments !== 'hide'
    },
    isType() {
      if(this.isPost) return 'post'
      if(this.isReader) return 'reader'
    },
    goNext () {
      return this.$store.state.comments.pagination?.current_page < this.$store.state.comments.pagination?.last_page
    }
  },

  methods: {
    closeComments() {
      this.$store.commit('reader/SET_OPEN_COMMENTS', false)
      //
    },
    async loadMore() {
      await this.loadComments(this.$store.state.comments.pagination?.next_page)
    },

    async loadComments(page=1) {
      if(this.isPost && this.$store.state.post.post.comment_count > 0) {
        await this.$store.dispatch('comments/FETCH_COMMENTS', {
          page: page,
          type: 'post',
          page_id: this.idPost,
          commentable_id: this.idPost,
        })
      }
      if(this.isReader && this.isShowСomments) {
        await this.$store.dispatch('comments/FETCH_COMMENTS', {
          page: page,
          type: 'reader',
          page_id: this.readerPageCurrent,
          commentable_id: this.idChapter,
        })
      }
    },

    // filter(arr, str) {
    //   return (arr || [])
    //     .map(n => ({ ...n, children: this.filter(n.children, str) }))
    //     .filter(n => n.name.includes(str) || n.children.length);
    // },
  },
};
</script>


<style lang="scss">
.comments.vertically {
  // top: 0;
  // right: 0;
  // width: 500px;
  // height: 100%;
  // margin: 0;
  // padding: 6px;
  // margin-right: -18px;
  // position: fixed;
  // background-color: #121212;
  // z-index: 10000;
  // border-left: thin solid rgba(255, 255, 255, 0.12);
  // overflow-y: scroll;
  // overflow-x: hidden;
    top: 48px;
    right: 0;
    width: 500px;
    height: calc(100% - 90px);
    margin: 0;
    padding: 6px 18px 6px 6px;
    margin-right: -18px;
    position: fixed;
    background-color: #121212;
    border-left: thin solid rgba(255, 255, 255, 0.12);
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 6px;
  .comment__list {
    position: relative;
  }
  .action {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .cancel {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: center;
      padding: 5px;
      margin: 6px 0;
      cursor: pointer;
      position: relative;
      border-radius: 6px;
      text-transform: uppercase;
      border: thin solid rgba(255, 255, 255, 0.12);
    }
    .cancel {
      border-bottom: thin solid rgba(255, 0, 0, 0.25);
      &:hover {
        border: thin solid rgba(255, 0, 0, 0.25);
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
    }
  }
}

.comments {
  margin-top: 16px;
  .center {
    text-align: center;
  }
  .btn__action {
    color: #ffffff;
    background-color: #121212;
    max-height: 34px;
    text-transform: uppercase;
    cursor: pointer;
    padding: 8px;
    margin: 6px 0;
    border-radius: 6px;
    position: relative;
    text-decoration: none;
    align-items: center;
    display: inline-flex;
    justify-content: center;
    border: thin solid rgba(255, 255, 255, 0.12);
    &:hover {
      &:before {
        opacity: 0.1;
      }
    }
    &:before {
      @include before;
    }
  }


  .comments__sort {
    select {
      cursor: pointer;
      color: #fff;
      background: #121212;
      padding: 6px 8px;
      font-size: inherit;
      border-radius: 6px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.12);
    }
  }



  .comment__list {
    margin-top: 16px;
    .comment__content {
      padding: 8px 12px;
      display: flex;
      flex-direction: row;
      .cover {
        width: 60px;
        height: 60px;
        min-width: 60px;
        min-height: 60px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
      .body {
        width: 100%;
        margin-left: 12px;
        .header {
          font-weight: 600;
        }
        .text {
          padding-top: 8px;
        }
        .footer {
        }
        .date {
          color: #919191;
          font-weight: 300;
        }
        .like {
          .btn {
            margin: 0;
          }
          display: flex;
          align-items: center;
          .score {
            margin: 0px 4px;
          }
          .item {
            font-size: 1.3rem;
          }
        }
        .reply {
          margin-left: 16px;
        }
        .replies {
          color: #919191;
          cursor: pointer;
          font-weight: 300;
          font-size: 0.85rem;
          text-transform: uppercase;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .btn__action.comments__more {
    width: 100%;
    margin-bottom: 16px;
  }

  .comments_info {
    height: 60px;
    max-width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
