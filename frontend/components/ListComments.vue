<template>
  <div>
    <Widgets-CommentWrite :type="isType" />

    <!-- Сортировка комментариев в РАЗРАБОТКЕ -->
    <!-- <div class="comments__sort">
      <select v-model="selected">
        <option v-for="(item, index) in sort" :value="item.value" :key="index">
          {{ item.text }}
        </option>
      </select>
    </div> -->

    
    <div class="comment__list" v-if="!isEmpty && isShowСomments">
      <Widgets-Comment v-for="(item, index) in comments" :key="index"
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

    <div class="comments_info" v-if="isEmptyTotal && isShowСomments">На этой странице еще нет комментариев, вы можете стать первым(ой)!</div>
    <div class="comments_info" v-if="!isShowСomments">Отображение комментариев отключено в настройках читалки!</div>
    
    <!-- <div class="btn__action comments__more" @click="loadMore">Показать еще комментарии</div> -->
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    if(!this.isEmpty && this.isPost) {
      await this.$store.dispatch('comments/FETCH_COMMENTS', { 
        type: 'post',
        page_id: this.idPost, 
        commentable_id: this.idPost,
      })
    }
    if(this.isReader && this.isShowСomments) {
      await this.$store.dispatch('comments/FETCH_COMMENTS', { 
        type: 'reader',
        page_id: this.readerPageCurrent, 
        commentable_id: this.idChapter,
      })
    }
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
    ...mapGetters( 'reader', { readerPageCurrent: 'GET_PAGE_CURRENT' }),
    ...mapGetters( 'reader', { settingComments: 'GET_SETTING_COMMENTS' }),

    isEmpty() {
      return this.$store.state.post.post.comment_count <= 0
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
      return this.settingComments === 'show'
    },
    isType() {
      if(this.isPost) return 'post'
      if(this.isReader) return 'reader'
    },
  },

  // methods: {
    // loadMore() {},

    // filter(arr, str) {
    //   return (arr || [])
    //     .map(n => ({ ...n, children: this.filter(n.children, str) }))
    //     .filter(n => n.name.includes(str) || n.children.length);
    // },
  // },
};
</script>


<style lang="scss">
.comments {
  margin-top: 16px;

  .btn__action {
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
