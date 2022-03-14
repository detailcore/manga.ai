<template>
  <div class="create container">
    <div class="block__title">
      <Nuxt-link :to="`/manga/${chapter.post.alias}`"> {{ postTitle }} </Nuxt-link>
      <mdi-MenuRight />
      Редактировать главу
      <mdi-MenuRight />
      <Nuxt-link :to="`/manga/${chapter.post.alias}/ch${chapter.id}`"> {{ chapter.chapter }} </Nuxt-link>
      <div class="add">
        <div class="btn" title="Добавить новую главу" @click.prevent="goToCreateChapter">
          <mdi-Plus title="Добавить новую главу" />
        </div>
      </div>
    </div>
    <div class="create__fields">
      <div class="create__fields__input">

        <div class="upload_chapters">
          <div class="upload_chapter">
            <div class="chapter_short">
              <input type="text" class="input" placeholder="Том" :value="chapter.volume" @change="changeVolume">
              <input type="text" class="input" placeholder="Глава" :value="chapter.chapter" @change="changeChapter">
            </div>

            <div class="chapter_name">
              <input type="text" class="input" placeholder="Название" :value="chapter.name" @change="changeName">
            </div>

            <div class="chapter_team">
              <multiselect track-by="name" label="name" placeholder="Введите название команды или выберите из списка"
                v-model="selectedTeams" 
                :options="teams"
                :multiple="true"
                :max-height="600"
                :searchable="true"
                :showLabels="false"
                :hide-selected="true"
                :internal-search="false"
                :close-on-select="false"
                @input="changeTeams"
                @search-change="findTeams">
              <template slot="tag" slot-scope="{ option, remove }">
                <div class="tag__item">
                  <div class="tag__name">{{ option.name }}</div>
                  <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
                </div>
              </template>
              <span slot="noResult">Команда не найдена</span>
              <span slot="noOptions">Начните вводить текст</span>
            </multiselect>
            </div>
          </div>
        </div>

        <div class="chapter_controls">
          <div class="status">Текущий статус: <span>{{ currentStatus.name }}</span></div>
          <div class="statuses_list">
              <div class="status">Изменить статус:</div>
              <div class="list">
                <label class="label" v-for="item of statuses" :key="item.id">
                  <input type="radio" :value="item.id" v-model="selectedStatus">
                  <span> {{ item.name }} </span>
                </label>
              </div>
          </div>
        </div>

        <!-- <div class="chapter__pages">
          <div class="page" v-for="(item, index) of chapter.pages" :key="index">
            <div class="panel">
              <div class="controls" v-if="item.sort === 1">
                <input type="checkbox">
                <div class="btn" title="Удалить страницу">
                  <mdi-TrashCan />
                </div>
              </div>
            </div>
            <div class="thumb" :style="`background-image: url(${chapterFolder + item.link})`"></div>
            <div class="name"> {{ item.link }} </div>
            <div class="number">
              <input class="num" type="text" :value="item.page" v-if="item.sort === 1">
              <input class="num" type="text" :value="item.page" :title="`Это часть ${item.page}й страницы`" v-else disabled>
              <div class="sort">часть: {{ item.sort }}</div>
            </div>
          </div>
        </div> -->
        <div class="chapter__pages">
          <WidgetsPageThumb v-for="item of chapter.pages" :key="item.id" :id="item.id" :idPost="postId" :pageIds="pageIds" />
        </div>

        <div class="action">
          <div class="cancel">Удалить главу целиком</div>
          <div class="more">Сохранить в черновик</div>
          <div class="save" @click.prevent="save">Сохранить</div>
        </div>

      </div>
    </div>

    <!-- <notifications /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSearchTeam } from '~/services/api'

export default {
  async asyncData({ store, route }) {
    const idChapter = +route.params.id.replace('ch', '')
    await store.dispatch('reader/FETCH_CHAPTER', idChapter) // получить текущую главу
  },

  data() {
    return {
      teams: [],
      pageIds: {},
      selectedTeams: [],
      selectedStatus: null,
      statuses: [
        {
          id: 1,
          name: 'Опубликовано'
        },
        {
          id: 2,
          name: 'Проверяется'
        },
        {
          id: 3,
          name: 'Черновик'
        },
        {
          id: 4,
          name: 'Снято с публикации'
        },
        {
          id: 5,
          name: 'Отклонено модератором'
        }
      ],
    }
  },

  computed: {
    ...mapGetters( 'reader', { chapter: 'GET_CHAPTER' }),

    postTitle() {
      return this.chapter ? (this.chapter.post ? this.chapter.post.title_rus : this.chapter.post.title_eng) : ''
    },
    postId() {
      return this.chapter ? (this.chapter.post ? this.chapter.post.id : false) : false
    },
    currentStatus() {
      return this.statuses.filter(item => item.id === this.chapter.id_status)[0]
    },
    chapterFolder({ $config: { urlMangaReader } }) {
      return urlMangaReader + this.postId + '/' + this.chapter.id + '/'
    },
    // currentChapter() {
    //   let { id, volume:vol, chapter:ch, name, teams, } = this.chapter
    //   return { id, vol, ch, name, teams }
    // }
  },

  created() {
    this.wholePage()
    this.teams = this.chapter.teams
    this.selectedTeams = this.chapter.teams
    this.selectedStatus = this.chapter.id_status
  },

  methods: {
    save() {
      let data = this.chapter.pages      
      let count = Object.create(null)
      let used = new Set()
      let dups = []

      for (let {page} of data) {
        if ((count[page] = ~~count[page] + 1) == 2) {
          used.add(page)
        }
      }

      for (let x of data) {
        if (used.has(x.page)) {
          dups.push(x.id)
        }
      }

      if(dups.length > 0) this.$store.commit('reader/SET_CHAPTER_PAGE_DUPLICATE_STATUS', { ids: dups })      
      console.log('Click save')
    },

    wholePage() { // объект с массивами ID страниц
      let pages = this.$store.state.reader.chapter.pages

      this.pageIds = pages.reduce((acc, item) => {
        const page = 'page_' + item.page;        
        (acc[page] = acc[page] || []).push(item.id);

        return acc;
      }, {})
    },
    deleteChapter(id) {
      this.selectedTeams = []
      // this.$store.commit('create/SET_REMOVE_CHAPTER', id)
    },
    changeVolume(e) {
      // this.$store.commit('create/SET_CHAPTER_VOLUME', { id: this.id, vol: +e.target.value })
    },
    changeChapter(e) {
      // this.$store.commit('create/SET_CHAPTER_CHAPTER', { id: this.id, ch: +e.target.value })
    },
    changeName(e) {
      // this.$store.commit('create/SET_CHAPTER_NAME', { id: this.id, name: e.target.value })
    },
    changeTeams() {
      // this.$store.commit('create/SET_CHAPTER_TEAMS', { id: this.id, teams: this.selectedTeams })
    },
    onFile(e) {
      // this.fileName = e.target.files[0] ? e.target.files[0].name : 'Выберите файл'
      // this.$store.commit('create/SET_CHAPTER_FILE', { id: this.id, file: e.target.files ? e.target.files[0] : '' })
    },
    async findTeams (query) {
      let res = null
      if(query.length >= 2) {
        res = await createSearchTeam(query)
      }
      if(res) {
        this.teams = res
      }
    },
    goToCreateChapter() {
      this.$router.push({
        path: '/create/chapter', 
        query: { 
          manga: this.postId,
         }
      })
    },
  },
}
</script>

<style lang="scss">
  @include action_save;
  @include multiselect;
  @include progress_bar;
  @include create_chapter;


  .chapter_controls {
    margin: 16px 0;
    .status {
      margin: 8px 0;
      span {
        text-transform: lowercase;
      }
    }
    .statuses_list {
      display: flex;
      .status {
        white-space: nowrap;
      }
      .list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .label {
          display: flex;
          cursor: pointer;
          flex-wrap: nowrap;
          align-items: center;
          input {
            margin: 0 4px;
          }
        }
      }
    }
  }
  .chapter__pages {
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
</style>