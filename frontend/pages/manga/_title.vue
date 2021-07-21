<template>
  <div class="region_manga">
    <div class="parallax_cover" :style="styleCover">
    </div>

    <div class="manga_block">
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
              <widgets-card-short v-for="(item, index) in dataTranslators" :key="index"
                :id="item.id"
                :cover="item.cover"
                :title="item.title"
                :description="item.description"
                type="translator" />
          </div>
        </div>
      </div>
      <div class="block__information">
        <div class="release_name">
          <h1 class="rus">Я перевоплотился в 7-го принца, так что я буду совершенствовать свою магию</h1>
          <span class="eng">I was reincarnated as the 7th Prince so I will perfect my magic as I please</span>
          <span class="alt">
            I was reincarnated as the 7th Prince so I will perfect my magic as I please / Я перевоплотился в 7-го принца, так что я буду совершенствовать свою магию, как захочу / Tensei Shitara dai Nana Ouji dattanode, Kimamani Majutsu o Kiwamemasu
          </span>
        </div>
        <div class="description" v-show="page === ''">
          10 лет назад, после того, как «Врата», соединившие реальный мир с параллельным, открылись, некоторые из людей получили силу охотиться на монстров внутри "Врат".Они известны как «Охотники». Однако не все Охотники сильные. Меня зовут Сун Цзинь-Ву, охотник E-ранга. Я тот, кто рискует своей жизнью в самых низких уровнях подземелья. Не имея никаких сверхсильных навыков, я едва зарабатывал необходимые деньги, сражаясь в низкоуровневых подземельях ... по крайней мере, пока я не нашел скрытое подземелье с самыми трудными проблемами в подземельях D-ранга! В конце концов, когда я умер, я внезапно получил странную силу, журнал квестов, который мог видеть только я, секрет для поднятия уровня, о котором знаю только я! Если бы я тренировался в соответствии с моими квестами и охотился на монстров, мой уровень повышался. Переход от самого слабого Охотника к самому сильному, Охотнику S-ранга!
        </div>
        
        <div class="stat">
          <div class="item rating">
            <mdi-Star title="" />
            <span class="count">9.46</span>
            <span class="vote">9813</span>
          </div>
          <div class="item">
            <mdi-CardsHeart title="" />
            <span class="count">2579</span>
          </div>
          <div class="item">
            <mdi-Eye title="" />
            <span class="count">1050907</span>
          </div>
          <div class="item">
            <mdi-BookmarkMultiple title="" />
            <span class="count">98654</span>
          </div>
        </div>

        <div class="btn_action">
          <Nuxt-link class="item" to="/manga/title_manga" :class="{ 'nuxt-link-exact-active' : page===''}">
            <mdi-ImageText title="" />
            <span>Информация</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="/manga/title_manga?page=chapters">
            <mdi-FormatListNumbered title="" />
            <span>Главы</span>
          </Nuxt-link>
          <Nuxt-link class="item" to="/manga/title_manga?page=comments">
            <mdi-CommentMultiple title="" />
            <span>Комментарии</span>
          </Nuxt-link>
          <span v-if="0">
            <Nuxt-link class="item" to="/manga/title_manga?page=covers">
              <mdi-Image title="" />
              <span>Обложки</span>
            </Nuxt-link>
          </span>
        </div>

        <div class="information" v-if="page === ''">
          <div class="line">
            <span class="item">манга</span>
            <span class="item">2021</span>
            <span class="item ongoing">онгоинг</span>
            <span class="item">перевод продолжается</span>
          </div>
          <div class="line tags">
            <div class="item">Веб</div>
            <div class="item">В цвете</div>
            <div class="item">Реинкарнация</div>
            <div class="item">Культивация</div>
            <div class="item">Путешествия во времени</div>
            <div class="item">Артефакты</div>
            <div class="item">Будущее</div>
            <div class="item">Воспоминания из другого мира</div>
            <div class="item">ГГ мужчина</div>
            <div class="item">Ранги силы</div>
            <div class="item">Космос</div>
            <div class="item">Скрытие личности</div>
            <div class="item">Спасение мира</div>
            <div class="item">Прокачка</div>
            <div class="item">Боевые искусства</div>
            <div class="item">Гарем</div>
            <div class="item">Научная фантастика</div>
            <div class="item">Романтика</div>
            <div class="item">Фэнтези</div>
            <div class="item">Школа</div>
          </div>

          <div class="block__title">Связанные произведения</div>
          <div class="line_card">
            <widgets-card-short v-for="(item, index) in dataRelated" :key="index"
              :id="item.id"
              :cover="item.cover"
              :title="item.title"
              :category="item.category"
              :year="item.year"
              type="top" />
          </div>
          <div class="block__title">Похожие тайтлы</div>
          <div class="line_card">
            <widgets-card-short v-for="(item, index) in dataRelated" :key="index"
              :id="item.id"
              :cover="item.cover"
              :title="item.title"
              :category="item.category"
              :year="item.year"
              type="top" />
          </div>
        </div>


        <list-chapters class="chapters_list" v-if="page === 'chapters'" />

        <list-comments class="comments" v-if="page === 'comments'" />

        <list-covers class="covers" v-if="page === 'covers'" />

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showBookmarkList: false,
      dataRelated: [
        {
          id: 1,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 1999,
          category: 'Манга',
        },
        {
          id: 2,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2021,
          category: 'Веб-манхва',
        },
        {
          id: 3,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2019,
          category: 'маньхуа',
        },
        {
          id: 4,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2019,
          category: 'маньхуа',
        },
        {
          id: 5,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Я отправился в другой мир, чтобы обрести бессмертие с помощью науки и технологий!',
          year: 2019,
          category: 'маньхуа',
        },
      ],
    }
  },

  computed: {
    page(){
      if(this.$route.query.page) {
        return this.$route.query.page
      }
      return ''
    },
    urlCover() {
      return '/_nuxt/assets/images/cover_manga.jpg'
    },
    styleCover() {
      return {
        fontSize: 0,
        backgroundImage: `url('${this.urlCover}')`
      }
    },
    dataTranslators() {
      return [
        {
          id: 0,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Team Translation 1',
          description: 'Description team. Only one little team...'
        },
        {
          id: 1,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Team Translation 2',
          description: 'Description team. Only one little team...'
        },
        {
          id: 2,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          title: 'Team Translation 3',
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione placeat vel maxime nulla expedita earum, ad optio labore quibusdam beatae! Ex commodi placeat ipsam ipsum soluta eos tempore at hic.'
        },
      ]
    },
  },

  methods: {
    openBookmark() {
      this.showBookmarkList = !this.showBookmarkList
      console.log(
        'qwe qwe qwe'
      );
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
          display: flex;
          flex-direction: column;
          .line {
            display: flex;
            width: 100%;
            margin: 20px 0;
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
                margin: 0;
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
              margin-top: -10px;
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