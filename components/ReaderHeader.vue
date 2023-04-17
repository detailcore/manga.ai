<template>
  <header class="region__header">
    <div class="header">
      <div class="header__home">
        <Nuxt-link to="/" class="btn home"><mdi-Home title="Главная страница" /></Nuxt-link>
        <div class="info">
          <div class="name">{{ name }}</div>
          <Nuxt-link :to="alias" class="title">{{ title }}</Nuxt-link>
        </div>
        <Nuxt-link :to="alias" class="backspace btn">
          <mdi-KeyboardBackspace :title="`Вернуться к описанию манги: ${title}`" />
        </Nuxt-link>
      </div>


      <div class="btn-line">
        <button @click="prevChapter">
          <mdi-MenuLeft title="Предыдущая глава" />
        </button>
        <WidgetsSelectChapterMain />
        <button @click="nextChapter">
          <mdi-MenuRight title="Слудующая глава" />
        </button>
      </div>

      <div class="header__control">
        <LazyListBookmark v-if="$store.state.auth.loggedIn" :id_chapter="selected.id" :id_post="idPost" />
        <!-- <span class="divider"> | </span> -->
        <!-- <div class="btn">
          <mdi-Bell title="Уведомления" />
        </div> -->
        <div class="btn" @click="openHideSetting">
          <mdi-Cog title="Настройки" />
        </div>
        <!-- <span class="divider"> | </span> -->
        <Region-User />
        <!-- <div class="btn">
          <mdi-Account title="Пользователь" />
        </div> -->

      </div>
    </div>
    <notifications />
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { mergeDuplicates } from '~/services/util'

export default {
  computed: {
    ...mapGetters( 'reader', { post: 'GET_POST' }),
    ...mapGetters( 'reader', { idPost: 'GET_ID_POST' }),
    ...mapGetters( 'reader', { name: 'GET_CHAPTER_NAME' }),
    ...mapGetters( 'reader', { isOpen: 'GET_OPEN_SETTING' }),
    ...mapGetters( 'reader', { selected: 'GET_CHAPTER_CURRENT' }),

    alias() {
      return this.post.alias ? '/manga/'+this.post.alias : '/'
    },

    title() {
      return this.post.title_rus ? this.post.title_rus : this.post.title_eng
    },
    testList() {
      return mergeDuplicates(this.$store.state.reader.chapterList)
    },
    currentIndex() {
      let res = 0
      this.testList.forEach((chapters, index) => {
        chapters.forEach(item => {
          if(item.id === this.selected.id) res = index
        })
      })
      return res
    },
  },

  mounted() {
    this.$nuxt.$on('go-to-next-chapter', () => {
      this.nextChapter()
    })
  },

  beforeDestroy(){
    this.$nuxt.$off('go-to-next-chapter')
  },

  methods: {
    prevChapter() { //! FIXME: FIX ГОВНОКОД
      let toggle = true // для предотвращения нескольких срабатываний при глав больше 1
      if(this.testList.length-1 > this.currentIndex) { // Если есть предыдущие главы

        if(this.selected.teams.length === 0) { // Если нет переводчика у текущей главы
          toggle = false
          this.setPage(1, this.testList[this.currentIndex+1][0].id)
        }

        if(this.testList[this.currentIndex+1].length > 1) { // Если глав больше одной
          let currentTeamIds = []
          for (const teamId of this.selected.teams) {
            currentTeamIds.push(teamId)
          }

          for (const chapter of this.testList[this.currentIndex+1]) {
            for (const chapterTeam of chapter.teams) {
              for (const currentId of currentTeamIds) {
                if(chapterTeam.id === currentId && toggle) { // Предыдущая глава от того же переводчика
                  toggle = false
                  this.setPage(1, chapter.id)
                }
              }
            }
          }

          for (const chapter of this.testList[this.currentIndex+1]) {
            if(toggle) { // Если нет такого же переводчика
              toggle = false
              this.setPage(1, chapter.id)
            }
          }

        } else { // если предыдущая глава только одна
          if(toggle) {
            toggle = false
            this.setPage(1, this.testList[this.currentIndex+1][0].id)
          }
        }
      } else { // если глава первая в списке
        this.$notify({
          text: `Вы и так читаете первую главу, куда ещё?`,
          type: 'success',
        })
      }
    },

    nextChapter() { //! FIX ГОВНОКОД
      let toggle = true // для предотвращения нескольких срабатываний при глав больше 1
      if(this.currentIndex > 0) {

        if(this.selected.teams.length === 0) { // Если нет переводчика у текущей главы
          toggle = false
          this.setPage(1, this.testList[this.currentIndex-1][0].id)
        }

        if(this.testList[this.currentIndex-1].length > 1) { // если следующих глав больше одной
          let currentTeamIds = []
          for (const teamId of this.selected.teams) {
            currentTeamIds.push(teamId)
          }

          for (const chapter of this.testList[this.currentIndex-1]) {
            for (const chapterTeam of chapter.teams) {
              for (const currentId of currentTeamIds) {
                if(chapterTeam.id === currentId) { // Следующая глава от того же переводчика
                  toggle = false
                  this.setPage(1, chapter.id)
                }
              }
            }
          }

          for (const chapter of this.testList[this.currentIndex-1]) {
            if(toggle) { // Если нет такого же переводчика
              toggle = false
              this.setPage(1, chapter.id)
            }
          }

        } else { // если глава только одна
          if(toggle) {
            toggle = false
            this.setPage(1, this.testList[this.currentIndex-1][0].id)
          }
        }
      } else { // если уже на последней главе
        this.$notify({
          text: `Глава ${this.selected.chapter} была последней`,
          type: 'success',
        })
      }
    },

    setPage(num, id, alias=this.$route.params.alias) {
      this.$store.commit('reader/SET_PAGE_CURRENT', {
        num: num,
        id: id,
        alias: alias
      })
    },

    openHideSetting() {
      this.$store.commit('reader/SET_OPEN_SETTING', !this.isOpen)
    },
  },
}
</script>

<style lang="scss" scoped>
  .region__header {
    background-color: $dark_primary;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
    .header {
      height: 48px;
      padding: 0 15px;
      margin: 0 auto;
      max-width: 1320px;
      @include flex_space_center;
      &__home {
        max-width: 50%;
        flex-grow: inherit;
        justify-content: flex-start;
        .backspace {
          display: none;
        }
        .info {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .name {
          font-weight: 200;
          font-size: 1.125rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .title {
          font-weight: 500;
          color: $orange_primary;
        }
      }
      &__home,
      &__control {
        display: flex;
        .divider {
          padding: 0 6px;
        }
      }
    }
  }
</style>
