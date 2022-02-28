<template>
  <div class="upload_chapter">
    
    <div class="chapter_short">
      <input type="text" class="input" placeholder="Том" :value="getCurrentChapter.vol" @change="changeVolume">
      <input type="text" class="input" placeholder="Глава" :value="getCurrentChapter.ch" @change="changeChapter">
    </div>

    <div class="chapter_name">
      <input type="text" class="input" placeholder="Название" :value="getCurrentChapter.name" @change="changeName">
    </div>

    <div class="chapter_team">
      <multiselect track-by="name" label="name" placeholder="Введите название или выберите из списка"
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

    <div class="chapter_file">
      <label :for="`file-${id}`"> {{ fileName }} </label>
      <input :id="`file-${id}`" type="file" name="zipfile" accept=".zip, .rar" class="input_hide" @change="onFile" />
      <span class="btn" @click.prevent="deleteChapter(id)" v-show="id > 0">
        <mdi-TrashCan title="Удалить" />
      </span>
    </div>
    <!-- <div class="progress_bar">
        <div class="percent">{{ percent }} %</div>
        <progress class="bar" max="100" :value.prop="percent"></progress>
    </div> -->
  </div>
</template>

<script>
import { createSearchTeam } from '~/services/api'

export default {
  props: {
    id: { type: Number, required: true },
    postTeams: { type: Array, default: [] },
  },

  data() {
    return {
      teams: [],
      selectedTeams: [],
      fileName: 'Выберите файл',
    }
  },

  computed: {
    getCurrentChapter() {
      return this.$store.state.create.chapters.filter(item => item.id === this.id)[0]
    },
  },

  created() {
    this.teams = this.postTeams
    this.fileName = 'Выберите файл'
  },

  methods: {
    deleteChapter(id) {
      this.selectedTeams = []
      this.$store.commit('create/SET_REMOVE_CHAPTER', id)
    },
    changeVolume(e) {
      this.$store.commit('create/SET_CHAPTER_VOLUME', { id: this.id, vol: +e.target.value })
    },
    changeChapter(e) {
      this.$store.commit('create/SET_CHAPTER_CHAPTER', { id: this.id, ch: +e.target.value })
    },
    changeName(e) {
      this.$store.commit('create/SET_CHAPTER_NAME', { id: this.id, name: e.target.value })
    },
    changeTeams() {
      this.$store.commit('create/SET_CHAPTER_TEAMS', { id: this.id, teams: this.selectedTeams })
    },
    onFile(e) {
      this.fileName = e.target.files[0] ? e.target.files[0].name : 'Выберите файл'
      this.$store.commit('create/SET_CHAPTER_FILE', { id: this.id, file: e.target.files ? e.target.files[0] : '' })
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
  },
}
</script>

<style lang="scss">
  @include multiselect;
</style>
