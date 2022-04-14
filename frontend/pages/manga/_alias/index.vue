<template>
  <div class="region_manga">
    <div class="parallax_cover" :style="styleCover">
    </div>

    <div class="manga_block" v-if="data.rating">
      <div class="block__cover">
        <div class="cover">
          <img :alt="title" :srcset="urlCover">
          <div class="cover__btn">
            <div class="btn_action">
              <div class="item" @click.prevent="readFirstChapter" v-if="chapterCount">
                <mdi-BookOpenPage title="Читать с первой главы" />
                <span>Читать</span>
              </div>
              <ListBookmark v-if="loggedIn" :id_post="idPost" />
            </div>            
          </div>
          <div class="cover__translation">
            <div class="block__title">Переводчики</div>
              <widgets-card-short v-for="(item, index) in data.teams" :key="index"
                :id="item.id"
                :cover="item.cover"
                :title="item.name"
                :description="item.description"
                type="translator" />
          </div>
        </div>
      </div>
      <div class="block__information">
        <div class="release_name">
          <h1 class="rus" v-show="data.title_rus"> {{ data.title_rus }} </h1>
          <span class="eng" v-show="data.title_eng"> {{ data.title_eng }} </span>
          <span class="alt">
            {{ data.title_orig }} <span v-show="data.title_alt"> / {{ data.title_alt }}</span>
          </span>
        </div>
        <div class="description">
          {{ data.description }}
        </div>
        
        <div class="stat">
          <div class="item rating" v-if="isRatingEmpty" @click="openModalRating">
            <mdi-Star title="Рейтинг" />
            <span class="count"> Оценить </span>
            <span class="vote"> (рейтинг скрыт, недостаточно оценок) </span>
          </div>
          <div class="item rating" v-else @click="openModalRating">
            <mdi-Star title="Рейтинг" />
            <span class="count">{{ data.rating.avg }}</span>
            <span class="vote">{{ data.rating.amount }}</span>
            <span class="your" v-show="yourRate !== null"> Оценено на: {{ yourRate }} </span>
          </div>
          <!-- <div class="item">
            <mdi-CardsHeart title="" />
            <span class="count">XXXXX</span>
          </div>
          <div class="item">
            <mdi-Eye title="" />
            <span class="count">{{ data.views }}</span>
          </div>
          <div class="item">
            <mdi-BookmarkMultiple title="" />
            <span class="count">XXXXX</span>
          </div> -->
        </div>

        <div class="btn_action">
          <Nuxt-link class="item" to="" :class="{ 'nuxt-link-exact-active' : page===''}">
            <mdi-ImageText title="" />
            <span>Информация</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="?page=chapters">
            <mdi-FormatListNumbered title="" />
            <span>Главы ({{ chapterCount }})</span>
          </Nuxt-link>
          <!-- <Nuxt-link class="item" to="?page=related">
            <mdi-FormatListText title="" />
            <span>Связанные</span>
          </Nuxt-link> -->
          <Nuxt-link class="item" to="?page=comments">
            <mdi-CommentMultiple title="" />
            <span>Комментарии ({{ commentCount }})</span>
          </Nuxt-link>
          <!-- <span v-if="0">
            <Nuxt-link class="item" to="?page=covers">
              <mdi-Image title="" />
              <span>Обложки</span>
            </Nuxt-link>
          </span> -->
        </div>

        <div class="information" v-if="page === ''">
          <div class="line">
            <span class="item">{{ data.type.name }}</span>
            <span class="item">{{ data.year }}</span>
          </div>
          <div class="line">
            <span class="item ongoing" v-show="data.status_of_releases">Выпуск: {{ data.status_of_releases ? data.status_of_releases.name : '' }}</span>
            <span class="item" v-show="data.status_of_translation">Перевод: {{ data.status_of_translation ? data.status_of_translation.name : '' }}</span>
          </div>
          <div class="line tags" v-show="data.genres.length > 0">
            <div class="item" v-for="genre of data.genres" :key="genre.name">
              {{ genre.name }}
            </div>
            <div class="item" v-for="tag of data.tags" :key="tag.name">
              {{ tag.name }}
            </div>
          </div>
        </div>


        <List-Chapters v-if="page === 'chapters' && chapterCount > 0" :id='data.id' />

        <!-- <List-Relateds class="relateds_list" v-if="page === 'related'" :id='data.id' /> -->

        <List-Comments class="comments" v-if="page === 'comments'" />

        <!-- <List-Covers class="covers" v-if="page === 'covers'" /> -->

      </div>
    </div>


    <div class="modal" v-if="openSetRating">
      <div class="title"> Выставить оценку </div>
      <div class="stars">
        <mdi-Star title="1" @click="setRating(1)" />
        <mdi-Star title="2" @click="setRating(2)" />
        <mdi-Star title="3" @click="setRating(3)" />
        <mdi-Star title="4" @click="setRating(4)" />
        <mdi-Star title="5" @click="setRating(5)" />
      </div>
      <div class="your_rate" v-show="yourRate !== null">
        Ваша оценка: {{ yourRate }} <mdi-TrashCan title="Удалить оценку" @click="setRating(0)" />
      </div>
    </div>

    <div class="background__close" :class="{ hidden: !openSetRating }" @click="close"></div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { notify } from '~/services/util'
import { postSetRating } from '~/services/api'

export default {
  async asyncData({ store, params }) {
    if(params.alias !== store.state.post.post.alias) await store.dispatch('post/FETCH_POST', params.alias)
  },

  data() {
    return {
      openSetRating: false,
    }
  },

  computed: {
    ...mapGetters( 'post', { data: 'GET_POST' }),
    ...mapGetters( 'post', { idPost: 'GET_POST_ID' }),

    title() {
      return this.data.title_rus ? this.data.title_rus : this.data.title_eng
    },
    page(){
      // определяет какая вкладка отображается
      return (this.$route.query.page) ? this.$route.query.page : ''
    },
    urlCover({ $config: { urlCoverTitle } }) {
      return this.data.cover ? urlCoverTitle + this.data.id +'/'+ this.data.cover : ''
    },
    styleCover() {
      return this.data.cover ? 
        {
          fontSize: 0,
          backgroundImage: `url(${this.urlCover})`
        } : {
          backgroundImage: 'none'
        }
    },
    chapterCount() {
      return this.data.chapter_count ? this.data.chapter_count : 0
    },
    commentCount() {
      return this.data.comment_count ? this.data.comment_count : 0
    },
    loggedIn() {
      return this.$store.state.auth.loggedIn
    },
    yourRate() {
      return this.data.rating ? this.data.rating.your : null
    },
    isRatingEmpty() {
      return this.data.rating ? this.data.rating.amount < 10 : false
    },
    isSingle() {
      return this.data.rating ? this.data.formats.map(item => item.id === 6).includes(true) : false
    },
  },

  methods: {
    async setRating(num) {
      this.close()
      if(+num !== +this.yourRate) {
        let res = await postSetRating({ id: +this.idPost, value: +num })
        this.$notify(notify(res))
      }
      this.$store.commit('post/SET_RATING', { newRate: +num, oldRate: this.yourRate })
    },

    openModalRating() {
      if(!this.loggedIn) {
        this.$notify({
          title: 'Войдите в аккаунт!',
          text: 'Для выстевления оценки тайтлу необходимо выполнить вход в аккаунт!',
          type: 'error'
        })
        return false
      }
      if(this.chapterCount <= 1 && !this.isSingle ) {
        this.$notify({
          text: 'Недостаточно глав для оценки',
          type: 'error',
        })
        return false
      }
      this.openSetRating = !this.openSetRating
    },

    readFirstChapter() {
      this.$router.push({
        name: 'manga-alias-id',
        params: { 
          id: 'ch' + this.data.chapter_first,
          alias: this.data.alias,
         }
      })
    },

    close() {
      this.openSetRating = false
    },
  },
}
</script>

<style lang="scss">
  .region_manga {
    min-height: calc(100vh - 160px);
    .parallax_cover {
      height: 300px;
      overflow: hidden;
      perspective: 1px;
      filter: blur(4px);
      background-size: cover;
      background-position: 100% 10%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      // transform: translateZ(-1px) scale(1.5);
      position: relative;
      z-index: -1;
      box-shadow: inset 0px -20px 16px 8px rgb(0 0 0 / 20%);
    }
    .manga_block {
      margin: 0 auto;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      .block__cover {
        width: 100%;
        max-width: 300px;
        margin-top: -200px;
        margin-right: 20px;
        .cover {
          min-height: 100px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          img {
            max-width: 100%;
            border-radius: 6px;
          }
        }
        .cover__btn {
          .btn_action {
            position: relative;
          }
        }
        // .cover__translation {
        // }
      }
      .block__information {
        width: 100%;
        display: flex;
        flex-direction: column;
        .release_name {
          display: flex;
          flex-direction: column;
          margin-top: -2.3rem;
          line-height: normal;
          .rus,
          .eng {
            @include text_two_line;
          }
          .rus {
            font-weight: 600;
            font-size: 1.6rem;
          }
          .eng {
            font-weight: 300;
            font-size: 1.4rem;
            margin-top: 16px;
          }
          .alt {
            font-weight: 300;
            font-size: 0.9rem;
            margin-top: 8px;
          }
        }
        .description {
          padding-top: 20px;
          font-size: 1.1rem;
        }
        // .title_alt {
        //   span {
        //   }
        // }
        .stat {
          display: flex;
          font-size: 1.1rem;
          padding: 1.2rem 0;
          .rating {
            cursor: pointer;
            position: relative;
            .your {
              position: absolute;
              top: -12px;
              left: 0;
              font-size: 0.8rem;
            }
          }
          .item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            &:last-child {
              margin-right: 0px;
            }
          }
          .count {
            margin-left: 4px;
          }
          .vote {
            color: #919191;
            font-weight: 300;
            font-size: 0.85rem;
            padding-left: 2px;
          }
        }
        .btn_action {
          flex-direction: row;
          justify-content: space-around;
          .item {
            width: 100%;
            &:nth-child(even){
              margin-left: 8px;
              margin-right: 8px;
            }
          }
          .nuxt-link-exact-active {
            &:before {
              background-color: currentColor;
              opacity: 0.1;
            }
          }
        }

        .information {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          .line {
            display: flex;
            width: 100%;
            margin: 10px 0;
            .item {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
              padding: 6px;
              margin: 0 10px;
              border-radius: 6px;
              border: thin solid rgba(255, 255, 255, 0.12);
              // &:last-child {
              //   margin: 0;
              // }
              &:first-child {
                margin: 0;
              }
              &.ongoing {
                border-bottom: thin solid rgba(0, 255, 34, 0.25);
              }
              &.end {
                border-bottom: thin solid rgba(255, 0, 34, 0.5);
              }
            }
            // &:last-child {
            //   margin-top: -10px;
            // }
            &.tags {
              // margin-top: -10px;
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              align-items: flex-start;
              align-content: flex-start;
              justify-content: flex-start;
              .item {
                margin: 0;
                width: auto;
                font-weight: 300;
                margin-right: 6px;
                margin-bottom: 6px;
                text-transform: capitalize;
              }
            }
          }
        }
        .line_card {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          &::-webkit-scrollbar {
            width: 9px;
          }
          &::-webkit-scrollbar-track {
            background: #121212;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #2f2f2f ;
            border-radius: 9px;
            border: 3px solid #121212;
          }
          .short {
            min-width: 30%;
            margin-right: 12px;
          }
        }
      }
      .covers {
        padding: 30px;
        display: flex;
        justify-content: center;
      }
      .btn_action {
        display: flex;
        flex-direction: column;
        .item {
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px;
          margin: 4px 0;
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
          .material-design-icon {
            margin-right: 8px;
          }
        }
      }
    }
    .modal {
      @include modal;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        font-weight: 300;
        font-size: 1.4rem;
      }
      .stars {
        width: 200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        span {
          font-size: 2rem;
          cursor: pointer;
          &:hover {
            color: #ff6820;
          }
        }
      }
      .your_rate {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        flex-direction: row;
        span {
          cursor: pointer;
          margin-left: 8px;
          &:hover {
            color: #ff6820;
          }
        }
      }
    }
  }
</style>