<template>
  <div>
    <div class="comment__add">
      <textarea v-model="addText" :maxlength="maxText" class="comment__add__text" placeholder="Введите ваш комментарий"></textarea>
      <div class="comment__add__action">
        <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
        <div class="send">
          <div class="send__spoiler">
            <span :class="{ decorator: !spoiler }">спойлер</span>
            <div class="switch">
              <input id="switch-1" type="checkbox" class="switch-input" v-model="spoiler" />
              <label for="switch-1" class="switch-label"></label>
            </div>
          </div>
          <div class="btn__action">Отправить</div>
        </div>
      </div>
    </div>


    <div class="comments__sort">
      <select v-model="selected">
        <option v-for="(item, index) in sort" :value="item.value" :key="index">
          {{ item.text }}
        </option>
      </select>
    </div>

    
    <div class="comments__list">
      <widgets-comment v-for="(item, index) in dataComments" :key="index"
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
    </div>

    
    <div class="btn__action comments__more" @click="loadMore">Показать еще комментарии</div>
  </div>
</template>


<script>
export default {
  props:{
  },
  data() {
    return {
      addText: '',
      maxText: 512,
      spoiler: false,
      selected: 'asc',
      sort: [
        { text: 'Сначала новые', value: 'asc' },
        { text: 'Сначала старые', value: 'desc' },
        { text: 'Сначала залайканные', value: 'like' }
      ],
    }
  },
  computed: {
    lengthText() {
      return this.addText.length
    },
    dataComments() {
      return [
        {
          id: 1,
          id_parent: 0,
          count_replies: 0,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133495732,
          is_fixed: false,
          score: -2,
          user: {
            id: 867,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 867',
          }
        },
        {
          id: 2,
          id_parent: 0,
          count_replies: 1,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133495735,
          is_fixed: false,
          score: 3,
          user: {
            id: 869,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 869',
          }
        },
        {
          id: 4,
          id_parent: 0,
          count_replies: 0,
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis beatae quis sint omnis officiis error culpa dolorum iure nostrum ipsa, magnam soluta accusantium impedit? Dolore et sit veniam aliquid ad.',
          date: 133495871,
          is_fixed: false,
          score: 982,
          user: {
            id: 19,
            cover: '/_nuxt/assets/images/mid_cover.jpg',
            login: 'User_Login 19',
          }
        },
      ]
    }
  },
  methods: {
    sendComment() {},
    loadMore() {},

    filter(arr, str) {
      return (arr || [])
        .map(n => ({ ...n, children: this.filter(n.children, str) }))
        .filter(n => n.name.includes(str) || n.children.length);
    },
  },
};
</script>


<style lang="scss">
.comments {
  margin-top: 16px;
  .comment__add {
    &__text {
      width: 100%;
      color: #fff;
      background: #1e1e1e;
      padding: 8px 12px;
      font-size: inherit;
      border-radius: 6px;
      min-height: 104px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.01);
      &:hover,
      &:focus {
        outline: none;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      &:focus {
        box-shadow: inset 0 0 2px 0px #fff;
      }
    }
    &__action {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      .limit {
        font-weight: 300;
        font-size: 0.9rem;
      }
      .send {
        display: flex;
        align-items: center;
        flex-direction: row;
        &__spoiler {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-right: 16px;
          span {
            font-weight: 300;
          }
          @include btn_switcher;
        }
        .decorator {
          text-decoration: line-through;
        }
      }
    }
  }

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
        background-position: center;
      }
      .body {
        margin-left: 12px;
        .header {
          font-weight: 600;
        }
        .text {
          padding-top: 8px;
        }
        .footer {
          display: flex;
          min-height: 30px;
          align-items: center;
          flex-direction: row;
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
