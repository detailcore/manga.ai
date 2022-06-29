<template>
  <div class="create container">
    <div class="block__title">
      Редактирование
      <mdi-MenuRight />
      <Nuxt-link :to="'/manga/'+ alias"> {{ data ? data.title_rus : data.title_eng }} </Nuxt-link>
    </div>
    <div class="block__subtitle "> Изменяйте только необходимые поля </div>
    <div class="create__fields">

      <div class="create__fields__image">
        <span class="title">Изменить обложку</span>
        <input class="hidden" id="cover" type='file' accept="image/*" @change="onChangeCover" />
        <label for="cover" class="image" ref="cover"> Нажмите сюда для выбора изображения </label>
      </div>


      <div class="create__fields__input">
        <span class="title">Русское название</span>
        <input class="input_text" type="text" v-model.trim="formData.title_rus" placeholder="Русское название">

        <span class="title">Английское название</span>
        <input class="input_text" type="text" v-model.trim="formData.title_eng" placeholder="Английское название">

        <span class="title">Оригинальное название (без иероглифов)</span>
        <input class="input_text" type="text" v-model.trim="formData.title_orig" placeholder="Оригинальное название (без иероглифов)">

        <span class="title">Альтернативные названия (возможно с иероглифами)</span>
        <input class="input_text" type="text" v-model.trim="formData.title_alt" placeholder="Разделять символом '/' (наклонная черта) ">

        <div class="line_half">
          <div class="half">
            <span class="title">Тип</span>
            <select v-model="selectedType">
              <option v-for="item in info.types" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="half">
            <span class="title">Год релиза</span>
            <input class="input_text" type="text" v-model.trim="formData.year" placeholder="Год релиза">
          </div>
          <div class="half" v-if="getUserId === 1">
            <span class="title">URL</span>
            <input class="input_text" type="text" v-model.trim="alias" placeholder="Год релиза">
          </div>
        </div>

        <div class="line_half">
          <div class="half">
            <span class="title">Автор(ы)</span>
            <multiselect track-by="name" label="name" placeholder="Начните вводить текст и выберите из списка" selectLabel='Нажмите для выбора'
                v-model="selectedAuthors"
                :options="authors"
                :multiple="true"
                :max-height="600"
                :searchable="true"
                :hide-selected="true"
                :internal-search="false"
                :close-on-select="false"
                @search-change="findAuthors">
              <template slot="tag" slot-scope="{ option, remove }">
                <div class="tag__item">
                  <div class="tag__name">{{ option.name }}</div>
                  <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
                </div>
              </template>
              <span slot="noResult">Автор не найден</span>
              <span slot="noOptions">Начните вводить текст</span>
            </multiselect>
          </div>
          <!-- <div class="half">
            <span>Автор</span>
            <input class="input_text" type="text" v-model.trim="manga.cover" placeholder="Автор">
          </div> -->
          <div class="half">
            <span class="title">Художник (если есть)</span>
            <multiselect track-by="name" label="name" placeholder="Начните вводить текст и выберите из списка" selectLabel='Нажмите для выбора'
                v-model="selectedArtists"
                :options="artists"
                :multiple="true"
                :max-height="600"
                :searchable="true"
                :hide-selected="true"
                :internal-search="false"
                :close-on-select="false"
                @search-change="findArtists">
              <template slot="tag" slot-scope="{ option, remove }">
                <div class="tag__item">
                  <div class="tag__name">{{ option.name }}</div>
                  <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
                </div>
              </template>
              <span slot="noResult">Художник не найден</span>
              <span slot="noOptions">Начните вводить текст</span>
            </multiselect>
          </div>
        </div>

        <span class="title">Издатель</span>
        <multiselect track-by="name" label="name" placeholder="Начните вводить текст и выберите из списка" selectLabel='Нажмите для выбора'
            v-model="selectedPublishers"
            :options="publishers"
            :multiple="true"
            :max-height="600"
            :searchable="true"
            :hide-selected="true"
            :internal-search="false"
            :close-on-select="false"
            @search-change="findPublishers">
          <template slot="tag" slot-scope="{ option, remove }">
            <div class="tag__item">
              <div class="tag__name">{{ option.name }}</div>
              <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
            </div>
          </template>
          <span slot="noResult">Издатель не найден</span>
          <span slot="noOptions">Начните вводить текст</span>
        </multiselect>

        <span class="title">Жанры</span>
        <multiselect track-by="name" label="name" placeholder="Выберите из списка" selectLabel='Нажмите для выбора'
            v-model="selectedGenres"
            :options="info.genres"
            :multiple="true"
            :max-height="300"
            :searchable="false"
            :hide-selected="true"
            :internal-search="false"
            :close-on-select="false">
          <template slot="tag" slot-scope="{ option, remove }">
            <span class="tag__item">
              <span class="tag__name">{{ option.name }}</span>
              <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
            </span>
          </template>
        </multiselect>

        <span class="title">Теги</span>
        <multiselect track-by="name" label="name" placeholder="Выберите из списка" selectLabel='Нажмите для выбора'
            v-model="selectedTags"
            :options="info.tags"
            :multiple="true"
            :max-height="300"
            :searchable="false"
            :hide-selected="true"
            :internal-search="false"
            :close-on-select="false">
          <template slot="tag" slot-scope="{ option, remove }">
            <span class="tag__item">
              <span class="tag__name">{{ option.name }}</span>
              <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
            </span>
          </template>
        </multiselect>

        <span class="title">Формат выпуска</span>
        <multiselect track-by="name" label="name" placeholder="Выберите из списка" selectLabel='Нажмите для выбора'
            v-model="selectedFormats"
            :options="info.formats"
            :multiple="true"
            :max-height="300"
            :searchable="false"
            :hide-selected="true"
            :internal-search="false"
            :close-on-select="false">
          <template slot="tag" slot-scope="{ option, remove }">
            <span class="tag__item">
              <span class="tag__name">{{ option.name }}</span>
              <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
            </span>
          </template>
        </multiselect>

        <span class="title">Переводчики (команды)</span>
        <multiselect track-by="name" label="name" placeholder="Начните вводить текст и выберите из списка" selectLabel='Нажмите для выбора'
            v-model="selectedTranslators"
            :options="translators"
            :multiple="true"
            :max-height="600"
            :searchable="true"
            :hide-selected="true"
            :internal-search="false"
            :close-on-select="false"
            @search-change="findTranslators">
          <template slot="tag" slot-scope="{ option, remove }">
            <div class="tag__item">
              <div class="tag__name">{{ option.name }}</div>
              <mdi-Close class="tag__remove" title="Удалить" @click="remove(option)" />
            </div>
          </template>
          <span slot="noResult">Команда не найдена</span>
          <span slot="noOptions">Начните вводить текст</span>
        </multiselect>

        <div class="line_quarter">
          <div class="quarter">
            <span class="title">Статус произведения</span>
              <select v-model="selectedStatus">
              <option v-for="item in info.status_of_releases" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span class="title">Статус перевода</span>
            <select v-model="selectedTranslation">
              <option v-for="item in info.status_of_translations" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span class="title">Контент для взрослых</span>
            <select v-model="selectedAdult">
              <option v-for="item in info.adult_ranks" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <!-- <span class="title">Загрузка глав</span>
            <select v-model="uploaderSelected">
              <option v-for="(item, index) in manga.uploader" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select> -->
          </div>
        </div>

        <span class="title">Ссылки на оригинал или анлейт (помогает модерации)</span>
        <input class="input_text" type="text" v-model.trim="formData.link" placeholder="Ссылка">

        <span class="title">Описание</span>
        <textarea v-model="formData.description" placeholder="Описание"></textarea>
        <!-- <div class="member">
          <input id="member" type="checkbox" v-model="" />
          <label for="member">Я являюсь представителем команды</label>
        </div> -->
      </div>
    </div>

    <div class="action">
      <button class="save" @click.prevent="updatePost" :disabled="disabled">Сохранить изменения</button>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

    <notifications />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  editPostById,
  createSearchPeople,
  createSearchPublisher,
  createSearchTeam,
  } from '~/services/api'

export default {
  async asyncData({ store, params }) {
    await store.dispatch('create/FETCH_INFO')
    await store.dispatch('post/FETCH_POST', params.alias)
  },

  data() {
    return {
      disabled: false,
      alias: null,

      artists: [],
      authors: [],
      publishers: [],
      translators: [],

      selectedType: null,
      selectedAdult: null,
      selectedCover: null,
      selectedStatus: null,
      selectedTranslation: null,

      selectedTags: [],
      selectedGenres: [],
      selectedArtists: [],
      selectedAuthors: [],
      selectedFormats: [],
      selectedPublishers: [],
      selectedTranslators: [],

      formData: {
        title_rus: null,
        title_eng: null,
        title_orig: null,
        title_alt: null,
        year: null,
        description: null,
        link: null,
      }
    }
  },

  created() {
    this.loadFields()
  },

  mounted() {
    this.initCover()
  },

  computed: {
    ...mapGetters( 'post', { data: 'GET_POST' }),
    ...mapGetters( 'create', { info: 'GET_INFO' }),

    getUserId() {
      return this.$store.state.auth.user.id
    },
    urlCover({ $config: { urlCoverTitle } }) {
      return urlCoverTitle + this.data.id +'/'+ (this.data.cover ? this.data.cover : '')
    },
    identicFormats() {
      return JSON.stringify(this.data.formats.map(item => item.id)) === JSON.stringify(this.selectedFormats.map(item => item.id))
    },
    identicGenres() {
      return JSON.stringify(this.data.genres.map(item => item.id)) === JSON.stringify(this.selectedGenres.map(item => item.id))
    },
    identicPublishers() {
      return JSON.stringify(this.data.publishers.map(item => item.id)) === JSON.stringify(this.selectedPublishers.map(item => item.id))
    },
    identicTags() {
      return JSON.stringify(this.data.tags.map(item => item.id)) === JSON.stringify(this.selectedTags.map(item => item.id))
    },
    identicTeams() {
      return JSON.stringify(this.data.teams.map(item => item.id)) === JSON.stringify(this.selectedTranslators.map(item => item.id))
    },
    identicCover() {
      return (this.selectedCover === null || this.selectedCover === undefined)
    },
  },

  methods: {
    initCover() {
      if(this.data.cover) {
        let src = this.$refs.cover
        src.style.backgroundImage = `url('${this.urlCover}')`
      }
    },
    onChangeCover(e) {
      let file = (e.target.files.length > 0) ? e.target.files[0] : false,
          imageView = new FileReader(),
          src = this.$refs.cover

      if(file) {
        imageView.onload = function (el) {
          src.style.backgroundImage = `url('${el.target.result}')`
        }
        imageView.readAsDataURL(file)
        this.selectedCover = file
      } else {
        this.selectedCover = ''
        src.style.backgroundImage = `url()`
        // src.style.backgroundImage = `url('${this.urlCover}')` // отобразит обложку которая была изначально
      }
    },
    loadFields() {
      this.alias = this.data.alias

      this.formData.title_rus = this.data.title_rus
      this.formData.title_eng = this.data.title_eng
      this.formData.title_orig = this.data.title_orig
      this.formData.title_alt = this.data.title_alt
      this.formData.year = this.data.year
      this.formData.description = this.data.description
      this.formData.link = this.data.mod_link

      this.selectedType = this.data.type ? this.data.type.id : this.selectedType
      this.selectedArtists = this.data.artists
      this.selectedAuthors = this.data.authors
      this.selectedPublishers = this.data.publishers
      this.selectedGenres = this.data.genres
      this.selectedTags = this.data.tags
      this.selectedFormats = this.data.formats
      this.selectedTranslators = this.data.teams
      this.selectedStatus = this.data.status_of_releases ? this.data.status_of_releases.id : this.selectedStatus
      this.selectedTranslation = this.data.status_of_translation ? this.data.status_of_translation.id : this.selectedTranslation
      this.selectedAdult = this.info.adult_ranks.filter((item => item.id === this.data.adult_rank.id))[0].id
    },
    async updatePost() {
      this.disabled = true
      let post = new FormData();
      post.append('id_type', this.selectedType ? +this.selectedType : '');
      post.append('id_artist', this.selectedArtists ? this.getIdsField(this.selectedArtists) : '');
      post.append('id_author', this.selectedAuthors ? this.getIdsField(this.selectedAuthors) : '');
      post.append('id_adult_rank', this.selectedAdult ? +this.selectedAdult : 1);
      post.append('id_user', +this.getUserId);
      // post.append('id_status', 1);  //! УКЗАТЬ СТАТУС РЕДАКТИОРВАНИЯ
      post.append('id_status_of_releases', this.selectedStatus);
      post.append('id_status_of_translation', this.selectedTranslation);
      post.append('title_rus', this.formData.title_rus ? this.formData.title_rus : '');
      post.append('title_eng', this.formData.title_eng ? this.formData.title_eng : '');
      post.append('title_orig', this.formData.title_orig ? this.formData.title_orig : '');
      post.append('title_alt', this.formData.title_alt ? this.formData.title_alt : '');
      post.append('year', this.formData.year ? +this.formData.year : '');
      post.append('mod_link', this.formData.link ? this.formData.link : '');
      post.append('description', this.formData.description ? this.formData.description : '');

      if(this.getUserId) {
        post.append('id_user', this.getUserId ? this.getUserId : '');
      }
      if(this.getUserId === 1) {
        post.append('alias', this.alias ? this.alias : '');
      }
      if(!this.identicCover) {
        post.append('image', this.selectedCover);
      }
      if(!this.identicFormats) {
        post.append('id_formats', this.selectedFormats ? this.getIdsField(this.selectedFormats) : '');
      }
      if(!this.identicGenres) {
        post.append('id_genres', this.selectedGenres ? this.getIdsField(this.selectedGenres) : null);
      }
      if(!this.identicPublishers) {
        post.append('id_publishers', this.selectedPublishers ? this.getIdsField(this.selectedPublishers) : '');
      }
      if(!this.identicTags) {
        post.append('id_tags', this.selectedTags ? this.getIdsField(this.selectedTags) : '');
      }
      if(!this.identicTeams) {
        post.append('id_teams', this.selectedTranslators ? this.getIdsField(this.selectedTranslators) : '');
      }

      let response = await editPostById(this.data.id, post)
      this.disabled = false

      if(response.status === 'ok') {
        this.$notify({
          text: response.msg,
          type: 'success',
          duration: 5000,
        })
        await this.$store.dispatch('post/FETCH_POST', this.alias)
        this.$router.push({
          name: 'manga-alias',
          params: {
            alias: this.alias,
          }
        })
      } else {
        this.$notify({
          text: response.msg,
          type: 'error',
        })
      }
    },
    getIdsField(obj) {
      let res = []
      obj.forEach(item => {
        res.push(item.id)
      })
      return res.join() // '1,2,3,4'
    },
    async findAuthors (query) {
      let res = null
      if(query.length >= 2) {
        res = await createSearchPeople(query)
      }
      if(res) {
        this.authors = res
      }
    },
    async findArtists (query) {
      let res = null
      if(query.length >= 2) {
        res = await createSearchPeople(query)
      }
      if(res) {
        this.artists = res
      }
    },
    async findPublishers (query) {
      let res = null
      if(query.length >= 2) {
        res = await createSearchPublisher(query)
      }
      if(res) {
        this.publishers = res
      }
    },
    async findTranslators (query) {
      let res = null
      if(query.length >= 2) {
        res = await createSearchTeam(query)
      }
      if(res) {
        this.translators = res
      }
    },
  },
};
</script>

<style lang="scss">
@include multiselect;

.mobile .create {
  padding: 0 10px;
  border: none;
  .line_half,
  .line_quarter {
    flex-direction: column;
    .half,
    .quarter {
      width: auto;
    }
  }
}

.create {
  min-height: 100vh;
  border-left: thin solid rgba(255, 255, 255, 0.12);
  border-right: thin solid rgba(255, 255, 255, 0.12);
  &__fields {
    &__image {
      margin: 20px 0 0 0;
      display: flex;
      flex-direction: column;
      label.image {
        display: flex;
        cursor: pointer;
        font-weight: 200;
        align-items: center;
        border-radius: 4px;
        justify-content: center;
        text-align: center;
        text-shadow: 1px 1px 3px black;
        border: dashed 2px rgba(255, 255, 255, 0.12);
        width: 50%;
        min-height: 50%;
        max-height: 350px;
        aspect-ratio: 5 / 7;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
    &__input {
      margin: 10px 0 20px 0;
      span.title {
        margin-top: 16px;
        display: inline-block;
      }
      .input_text {
        width: 100%;
        color: #fff;
        height: 32px;
        margin: 4px 0;
        padding: 0 8px;
        font-size: inherit;
        border-radius: 2px;
        background: #1e1e1e;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      textarea {
        width: 100%;
        color: #fff;
        background: #1e1e1e;
        margin: 4px 0;
        padding: 8px 12px;
        font-size: inherit;
        border-radius: 6px;
        min-height: 104px;
        outline: none;
        border: thin solid rgba(255, 255, 255, 0.12);
        &:hover,
        &:focus {
          outline: none;
          border: thin solid rgba(255, 255, 255, 0.12);
        }
        &:focus {
          box-shadow: inset 0 0 2px 0px #fff;
        }
      }
      select {
        height: 32px;
        color: #fff;
        outline: none;
        margin: 4px 0;
        cursor: pointer;
        padding: 6px 8px;
        font-size: inherit;
        border-radius: 6px;
        background: #121212;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      .line_half {
        display: flex;
        justify-content: space-between;
        .half {
          width: 49%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
      .line_quarter {
        display: flex;
        justify-content: space-between;
        .quarter {
          width: 24%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .member {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        #member {
          width: 32px;
          cursor: pointer;
        }
        input {
          height: 20px;
        }
      }
    }
  }

  .action {
    display: flex;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-around;
    .save,
    .cancel {
      padding: 8px;
      margin: 6px 0;
      cursor: pointer;
      max-height: 34px;
      position: relative;
      border-radius: 6px;
      text-decoration: none;
      text-transform: uppercase;
      border: thin solid rgba(255, 255, 255, 0.12);
    }
    .save {
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
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
</style>
