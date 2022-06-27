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

        <div class="chapter__pages">
          <WidgetsPageThumb v-for="item of chapter.pages" :id="item.id" :idPost="postId" :pageIds="pageIds" :key="item.id" />
          <WidgetsPageUpload v-for="(item, i) of uploadPageFiles" :idPost="postId" :idChapter="chapter.id" :initName="item.name" :index="i" :key="i" />

          <div class="page add_file">
            <label for="file" >
              <div class="btn" title="Добавить новую страницу">
                <mdi-Plus title="Добавить новую страницу" />
              </div>
              <input id="file" type="file" class="hidden" accept="image/*" @change="changeUploadFiles" multiple>
              <span class="subtitle">Добавить</span>
            </label>
            <label @click="upload">
              <div class="btn" title="Загрузить новые страницы">
                <mdi-CloudDownload title="Загрузить новые страницы" />
              </div>
              <span class="subtitle">Загрузить</span>
            </label>
          </div>
        </div>

        <div class="action">
          <div class="cancel" @click.prevent="removeAll()">Удалить главу целиком</div>
          <div class="more" @click.prevent="save(true)">Сохранить в черновик</div>
          <div class="save" @click.prevent="save()">Сохранить</div>
        </div>

      </div>
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createSearchTeam, editChapterById, editUploadPages, editRemovePageInChapter, editRemoveAllChapter } from '~/services/api'

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
    ...mapGetters( 'upload', { uploadPageFiles: 'GET_UPLOAD_PAGES' }),

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
    emptyToUpload() {
      return this.uploadPageFiles.length === 0
    }
  },

  created() {
    this.wholePage()
    this.teams = this.chapter.teams
    this.selectedTeams = this.chapter.teams
    this.selectedStatus = this.chapter.id_status
  },

  methods: {
    async upload() {
      if(this.emptyToUpload) {
        this.$notify({
          text: 'Страницы для загрузки не выбраны',
          type: 'error',
        })
        return ''
      }

      let response = null,
          formData = new FormData()

      for (const item of this.uploadPageFiles) {
        formData.append('file', item)
        formData.append('page', item.page)
        response = await editUploadPages(this.chapter.id, formData) //* загружаю файлы по очереди в цикле

        if(response.status === 'ok') {
          this.$notify({
            text: response.msg,
            type: 'success',
          })
        } else {
          this.$notify({
            text: response.msg,
            type: 'error',
          })
          break
        }
      }
      if(response) {
        await this.$store.dispatch('reader/FETCH_CHAPTER', this.chapter.id) //* получаю картинки загруженных файлов
        this.$store.commit('upload/SET_UPLOAD_REMOVE_ALLPAGE') //* удаляем все страницы подготовленные к загрузке
        this.wholePage()
      }
    },

    async save(draft = false) {
      // console.log(draft)
      // return draft
      if(!this.emptyToUpload) {
        this.$notify({
          text: `Перед сохранением загрузите или удалите новые страницы!`,
          type: 'error',
          duration: 5000,
        })
        return ''
      }
      // удаление страниц из главы
      if(this.chapter.remove) {
        let remove = await editRemovePageInChapter(this.chapter.id, this.chapter.remove)
        if(remove.status === 'ok') {
          this.$notify({
            text: remove.msg,
            type: 'success',
          })
        } else {
          this.$notify({
            text: remove.msg,
            type: 'error',
          })
        }
        this.$store.commit('reader/SET_EDIT_CHAPTER_REMOVE_PAGE', Array())
      }
      let data = this.chapter,
          duplicateIds = [];

      // Поиск дубликатов с одинаковым номером page & sort
      data.pages.map((item, index, arr) => {
        if (arr.filter((_, kndex) => index != kndex).some(article => (article.page === item.page && item.sort === 1 && article.sort === 1) )) {
          duplicateIds.push(item.id)
        }
      })

      if(duplicateIds.length > 0) {
        this.$store.commit('reader/SET_CHAPTER_PAGE_DUPLICATE_STATUS', { ids: duplicateIds })
        this.$notify({
          text: `Найдены одинаковые номера страниц, исправьте нумерацию!`,
          type: 'error',
          duration: 5000,
        })
      } else {
        this.$store.commit('reader/SET_CHAPTER_PAGE_DUPLICATE_STATUS', { ids: duplicateIds }) // отметить дубликаты нумерации страниц
        this.$store.commit('reader/SET_EDIT_CHAPTER_TEAMS', this.selectedTeams)
        this.changeStatus()
        this.$notify({
          text: `Изменения сохранены`,
          type: 'success',
        })

        data.id_post = this.chapter.post ? this.chapter.post.id : '' // добавляю в объект id поста
        // console.log(data)
        if(draft) { // статус черновик
          this.$store.commit('reader/SET_EDIT_CHAPTER_STATUS', 3)
        }
        await editChapterById(this.chapter.id, data) // сохранить описание в БД
        await this.$store.dispatch('reader/FETCH_CHAPTER', this.chapter.id) // Получить изменения картинок
      }
    },

    wholePage() { // объект с массивами ID страниц
      let pages = this.$store.state.reader.chapter.pages

      this.pageIds = pages.reduce((acc, item) => {
        const page = 'page_' + item.page;
        (acc[page] = acc[page] || []).push(item.id);

        return acc;
      }, {})
    },
    changeVolume(e) {
      const regex = /(\D+)/;
      this.$store.commit('reader/SET_EDIT_CHAPTER_VOLUME', +e.target.value.replace(regex, ''))
    },
    changeChapter(e) {
      const regex = /(\D+)/;
      this.$store.commit('reader/SET_EDIT_CHAPTER_CHAPTER', +e.target.value.replace(regex, '.'))
    },
    changeName(e) {
      this.$store.commit('reader/SET_EDIT_CHAPTER_NAME', e.target.value)
    },
    changeStatus() {
      this.$store.commit('reader/SET_EDIT_CHAPTER_STATUS', +this.selectedStatus)
    },
    changeUploadFiles(e) { // Добавляем страницу в объект для загрузки
      if(e.target.files.length > 0) {
        for (const item of e.target.files) {
          this.$store.commit('upload/SET_UPLOAD_PAGES', item)
        }
      }
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
    async removeAll() {
      let res = await editRemoveAllChapter(this.chapter.id)

      if(res.status === 'ok') {
        this.$notify({
          text: res.msg,
          type: 'success',
        })
        this.$router.push({
          name: 'manga-alias',
          params: {
            alias: this.$route.params.alias,
          }
        })
      } else {
        this.$notify({
          text: res.msg,
          type: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @include action_save;
  @include multiselect;
  @include progress_bar;
  @include create_chapter;
.create {
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
    .add_file {
      min-height: 144px;
      align-items: center;
      justify-content: space-evenly;
      label {
        cursor: pointer;
      }
      .subtitle {
        font-weight: 200;
        font-size: 0.9rem;
      }
    }
  }
}
</style>
