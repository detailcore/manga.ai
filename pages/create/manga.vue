<template>
  <div class="create container">
    <div class="block__title">Добавить тайтл</div>
    <div class="create__fields">

      <div class="create__fields__image">
        <span class="title">Обложка *</span>
        <input class="hidden" id="cover" type='file' accept="image/*" @change="onChangeCover" />
        <label for="cover" class="image" ref="cover"> Нажмите сюда для выбора изображения </label>
      </div>


      <div class="create__fields__input">
        <span class="title">Русское название *</span>
        <input class="input_text" type="text" v-model.trim="formData.title_rus" placeholder="Русское название">

        <span class="title">Английское название *</span>
        <input class="input_text" type="text" v-model.trim="formData.title_eng" placeholder="Английское название">

        <span class="title">Оригинальное название (без иероглифов)</span>
        <input class="input_text" type="text" v-model.trim="formData.title_orig" placeholder="Оригинальное название (без иероглифов)">

        <span class="title">Альтернативные названия (возможно с иероглифами)</span>
        <input class="input_text" type="text" v-model.trim="formData.title_alt" placeholder="Разделять символом '/' (наклонная черта) ">

        <div class="line_half">
          <div class="half">
            <span class="title">Тип *</span>
            <select v-model="selectedType">
              <option v-for="item in info.types" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="half">
            <span class="title">Год релиза *</span>
            <input class="input_text" type="text" v-model.trim="formData.year" placeholder="Год релиза">
          </div>
        </div>

        <div class="line_half">
          <div class="half">
            <span class="title">
              Автор(ы) *
              <Nuxt-link to="/create/people" target="_blank">Добавить автора</Nuxt-link>
            </span>
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
            <span class="title">
              Художник (если есть)
              <Nuxt-link to="/create/people" target="_blank">Добавить художника</Nuxt-link>
            </span>
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

        <span class="title">
          Издатель
          <Nuxt-link to="/create/publisher" target="_blank">Добавить издателя</Nuxt-link>
        </span>
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

        <span class="title">Жанры *</span>
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

        <span class="title">
          Переводчики (команды)
          <Nuxt-link to="/create/team" target="_blank">Добавить команду</Nuxt-link>
        </span>
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
            <span class="title">Статус произведения *</span>
              <select v-model="selectedStatus">
              <option v-for="item in info.status_of_releases" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span class="title">Статус перевода *</span>
            <select v-model="selectedTranslation">
              <option v-for="item in info.status_of_translations" :value="item.id" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span class="title">Контент для взрослых *</span>
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

        <span class="title">Описание *</span>
        <textarea v-model="formData.description" placeholder="Описание"></textarea>
        <!-- <div class="member">
          <input id="member" type="checkbox" v-model="" />
          <label for="member">Я являюсь представителем команды</label>
        </div> -->
      </div>
    </div>

    <div class="action">
      <button class="save" @click.prevent="createPost" :disabled="disabled">Отправить на модерацию</button>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

    <notifications />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  createManga,
  createSearchPeople,
  createSearchPublisher,
  createSearchTeam,
  } from '~/services/api'

export default {
  async asyncData({ store }) {
    await store.dispatch('create/FETCH_INFO')
  },

  data() {
    return {
      disabled: false,

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
        title_rus: '',
        title_eng: '',
        title_orig: '',
        title_alt: '',
        year: null,
        description: null,
        link: '',
      }
    }
  },

  computed: {
    ...mapGetters( 'create', { info: 'GET_INFO' }),

    getUserId() {
      return this.$store.state.auth.user.id
    },
  },

  methods: {
    async createPost() {
      this.disabled = true
      let response = null
      let post = {
        id_status: 2,
        id_tags: this.selectedTags ? this.getIdsField(this.selectedTags) : '',
        id_type: +this.selectedType,
        id_genres: this.selectedGenres ? this.getIdsField(this.selectedGenres) : null,
        id_artist: this.selectedArtists ? this.getIdsField(this.selectedArtists) : '',
        id_author: this.selectedAuthors ? this.getIdsField(this.selectedAuthors) : null,
        id_formats: this.selectedFormats ? this.getIdsField(this.selectedFormats) : '',
        id_adult_rank: +this.selectedAdult,
        id_teams: this.selectedTranslators ? this.getIdsField(this.selectedTranslators) : '',
        id_publishers: this.selectedPublishers ? this.getIdsField(this.selectedPublishers) : '',
        id_user: +this.getUserId,
        id_status_of_releases: +this.selectedStatus,
        id_status_of_translation: +this.selectedTranslation,
        image: this.selectedCover,
        title_rus: this.formData.title_rus,
        title_eng: this.formData.title_eng,
        title_orig: this.formData.title_orig,
        title_alt: this.formData.title_alt,
        year: +this.formData.year,
        mod_link: this.formData.link,
        description: this.formData.description,
      }

      // примитивная проверка на обязательные поля
      if(
        post.image &&
        post.id_type &&
        post.year &&
        post.id_author &&
        post.id_genres &&
        post.id_status_of_releases &&
        post.id_status_of_translation &&
        post.id_adult_rank &&
        post.description &&
        (post.title_rus || post.title_eng)
      ) {
        post.alias = this.getAliasTranslit(this.formData.title_rus, this.formData.title_eng)

        response = await createManga(post)

        if(response.status === 'ok') {
          this.$notify({
            text: response.msg,
            type: 'success',
            duration: 8000,
          })
          setTimeout(() => {
            this.$router.push({ path: `/manga/${response.alias}` })
          }, 1500);
        }
      } else {
        this.$notify({
          text: 'Поля со звёздочкой "*" обязательны для заполнения',
          type: 'error',
        })
      }
      this.disabled = false
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
    // Создание Алиаса из названия // потом вынести в утилиты
    getAliasTranslit(titileRus = null, titleEng = null){
      let result = ''
      let word = ''
      if(titileRus) {
        word = titileRus
      } else {
        word = titleEng
      }
      let converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya'
      };
      word = word.toLowerCase();
      let answer = '';

      for (let i = 0; i < word.length; ++i ) {
        if (converter[word[i]] == undefined){
          answer += word[i];
        } else {
          answer += converter[word[i]];
        }
      }

      answer = answer.replace(/[^-0-9a-z]/g, '-');
      answer = answer.replace(/[-]+/g, '-');
      answer = answer.replace(/^\-|-$/g, '');
      result = answer

      return result;
    }
  },
};
</script>

<style lang="scss">
@include multiselect;
@include action_save;

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
    &__input {
      margin: 10px 0 20px 0;
      span.title {
        margin-top: 16px;
        // display: inline-block;
        display: flex;
        justify-content: space-between;
        a {
          color: #ff6820;
        }
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
    margin-bottom: 20px;
  }
}
</style>
