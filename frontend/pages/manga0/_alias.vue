<template>
  <div class="region_manga">
    <div class="parallax_cover" :style="styleCover">
    </div>

    <div class="manga_block" v-if="data.rating">
      <div class="block__cover">
        <div class="cover">
          <img src="" alt="cover item" :srcset="urlCover">
          <div class="cover__btn">
            <div class="btn_action">
              <div class="item">
                <mdi-BookOpenPage title="Читать" />
                <span>Читать</span>
              </div>
              <div class="item" @click="openBookmark" v-click-outside="close">
                <mdi-BookmarkPlus title="Добавить в закладки" />
                <span>В закладки</span>
                <mdi-MenuDown class="arrow" />
              </div>
              <div class="bookmark__list" v-show="showBookmarkList">
                <span class="item">Читаю</span>
                <span class="item">В планах</span>
                <span class="item">Прочитано</span>
                <span class="item">Отложено</span>
                <span class="item">Брошено</span>
                <span class="item">Не интересно</span>
                <span class="item del">Удалить</span>
              </div>
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
            <span v-show="data.title_alt"> {{ data.title_alt }} / </span> {{ data.title_orig }}
          </span>
        </div>
        <div class="description" v-show="page === ''">
          {{ data.description }}
        </div>
        
        <div class="stat">
          <div class="item rating">
            <mdi-Star title="" />
            <span class="count">{{ data.rating.avg }}</span>
            <span class="vote">{{ data.rating.amount }}</span>
          </div>
          <div class="item">
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
          </div>
        </div>

        <div class="btn_action">
          <Nuxt-link class="item" to="" :class="{ 'nuxt-link-exact-active' : page===''}">
            <mdi-ImageText title="" />
            <span>Информация</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="?page=chapters">
            <mdi-FormatListNumbered title="" />
            <span>Главы</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="?page=related">
            <mdi-FormatListText title="" />
            <span>Связанные</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="?page=comments">
            <mdi-CommentMultiple title="" />
            <span>Комментарии</span>
          </Nuxt-link>
          <span v-if="0">
            <Nuxt-link class="item" to="?page=covers">
              <mdi-Image title="" />
              <span>Обложки</span>
            </Nuxt-link>
          </span>
        </div>

        <div class="information" v-if="page === ''">
          <div class="line">
            <span class="item">{{ data.type.name }}</span>
            <span class="item">{{ data.year }}</span>
          </div>
          <div class="line">
            <span class="item ongoing">{{ data.status_of_releases.name }}</span>
            <span class="item">перевод: {{ data.status_of_translation.name }}</span>
          </div>
          <div class="line tags" v-show="data.genres.length > 0">
            <div class="item" v-for="genre of data.genres">
              {{ genre.name }}
            </div>
            <div class="item" v-for="tag of data.tags">
              {{ tag.name }}
            </div>
          </div>
        </div>


        <list-chapters class="chapters_list" v-if="page === 'chapters'" />

        <list-relateds class="relateds_list" v-if="page === 'related'" />

        <list-comments class="comments" v-if="page === 'comments'" />

        <list-covers class="covers" v-if="page === 'covers'" />

      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { postGetById } from '@/services/api'

export default {
  async asyncData({ store, route, params }) {
    await store.dispatch('post/FETCH_POST', +params.title)

    // let id = route.params.title
    // const data = await postGetById(id)
    // return { data }
  },

  data() {
    return {
      showBookmarkList: false,
    }
  },

  computed: {
    ...mapGetters( 'post', { data: 'GET_POST' }),

    page(){
      // определяет какая закладка отображается
      return (this.$route.query.page) ? this.$route.query.page : ''
    },
    urlCover() {
      return this.data.cover
    },
    styleCover() {
      return {
        fontSize: 0,
        backgroundImage: `url('${this.data.cover}')`
      }
    },
  },

  methods: {
    async openBookmark() {
      this.showBookmarkList = !this.showBookmarkList
      console.log(
        'qwe qwe qwe'
      );
      // const testData = await this.$axios.$get(`post`)
    },

    close() {
      this.showBookmarkList = false
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
          .bookmark__list{
            display: flex;
            background-color: #121212;
            border-radius: 6px;
            padding: 0px 4px;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2;
            border: thin solid rgba(255, 255, 255, 0.12);
            .item {
              &:hover {
                border: thin solid rgb(0 255 0 / 25%);
              }
            }
            .del {
              border-bottom: thin solid rgb(255 0 0 / 50%);
              transition-duration: .35s;
              &:hover {
                border: thin solid rgb(255 0 0 / 65%);
              }
            }
          }
        }
        .cover__translation {
        }
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
        .title_alt {
          span {
          }
        }
        .stat {
          display: flex;
          font-size: 1.1rem;
          padding: 1.2rem 0;
          .rating {
            cursor: pointer;
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
              &:last-child {
                // margin: 0;
              }
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
          span {
          }
        }
      }
    }
  }
</style>