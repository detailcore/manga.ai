<template>
  <div>
    <Widgets-CommentWrite :type="'App.Post'" />

    <!-- Сортировка комментариев в РАЗРАБОТКЕ -->
    <!-- <div class="comments__sort">
      <select v-model="selected">
        <option v-for="(item, index) in sort" :value="item.value" :key="index">
          {{ item.text }}
        </option>
      </select>
    </div> -->

    
    <div class="comments__list">
      <Widgets-Comment v-for="(item, index) in comments" :key="index"
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
    </div>

    
    <div class="btn__action comments__more" @click="loadMore">Показать еще комментарии</div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  async fetch() {
    await this.$store.dispatch('comments/FETCH_COMMENTS', { 
      page_id: this.idPost, 
      commentable_id: this.idPost
      })
  },

  data() {
    return {
      selected: 'asc',
      sort: [
        { text: 'Сначала новые', value: 'asc' },
        { text: 'Сначала старые', value: 'desc' },
        { text: 'Сначала залайканные', value: 'like' }
      ],
    }
  },

  computed: {
    ...mapGetters( 'post', { post: 'GET_POST' }),
    ...mapGetters( 'post', { idPost: 'GET_POST_ID' }),
    ...mapGetters( 'comments', { comments: 'GET_COMMENTS' }),
  },

  methods: {
    loadMore() {},

    // filter(arr, str) {
    //   return (arr || [])
    //     .map(n => ({ ...n, children: this.filter(n.children, str) }))
    //     .filter(n => n.name.includes(str) || n.children.length);
    // },
  },
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



  .comments__list {
    margin-top: 16px;
    .comment {
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
          display: flex;
          align-items: center;
          .score {
            margin: 0px 8px;
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
    .comment.reply {
      margin-left: 60px;
    }
  }


  .btn__action.comments__more {
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
