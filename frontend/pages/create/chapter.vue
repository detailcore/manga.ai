<template>
  <div class="create container">
    <div class="block__title">
      Добавление глав в 
      <mdi-MenuRight />
      <Nuxt-link :to="alias" class="cancel"> {{ title }} </Nuxt-link>
    </div>
    <div class="block__subtitle"> Загрузка архивами <span>*.zip</span> </div>
    <div class="create__fields">
      <div class="create__fields__input">
        <div class="upload_chapters">

          <WidgetsCreateChapter v-for="(item, index) in chapters" :key="index" :id="item.id" :postTeams="postTeams" />

        </div>
      </div>
    </div>

    <div class="action">
      <div class="more" @click="addMore">
        Добавить еще
        <mdi-Plus />
      </div>
      <div class="save" @click.prevent="sendDownload">Начать загрузку</div>
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createChapterGetInfo, createChapterDownload } from '~/services/api'

export default {
  async created() {
    await this.lastChapterLoad()
  },

  data() {
    return {
      post: null,
      postTeams: [],
      lastChapter: [],
    }
  },

  computed: {
    ...mapGetters( 'create', { chapters: 'GET_CHAPTERS' } ),

    title() {
      if(this.post) return this.post.title_rus ? this.post.title_rus : this.post.title_eng
      return ''
    },
    alias() {
      return this.post ? '/manga/'+ this.post.alias : ''
    },
    id() { // id_post
      return this.$route.query.manga ? +this.$route.query.manga : 0
    },
  },

  methods: {
    async sendDownload() {
      for (const item of this.chapters) {
        let formData = new FormData(),
            { id, vol, ch, name, teams, file } = item,
            teamIds = []
        for (const team of teams) {
          teamIds.push(team.id)
        }
        if(file) {
          formData.append('ch', ch);
          formData.append('vol', vol);
          formData.append('name', name);
          formData.append('file', file);
          formData.append('id_post', this.id);
          formData.append('id_team', teamIds); // id команды, строка через запятую

          let res = await createChapterDownload(formData)
          if( res ? res.status === 'ok' : false ) {
            this.$store.commit('create/SET_REMOVE_CHAPTER', id)
            this.$notify({
              text: `Глава ${ch} добавлена`,
              type: 'success',
            })
            console.log(res)
          } else {
            this.$notify({
              text: `Во время загрузки главы ${ch} произошла ошибка`,
              type: 'error',
              duration: 5000,
            })
          }
        } else {
          this.$notify({
            text: `У главы ${ch} не выбран архив для загрузки`,
            type: 'error',
          })
        }
      }
    },

    addMore() {
      let vol = (this.chapters.length === 0) ? +this.lastChapter.volume : +this.chapters[this.chapters.length-1].vol,
          ch = (this.chapters.length === 0) ? +this.lastChapter.chapter : +this.chapters[this.chapters.length-1].ch + 1,
          id = (this.chapters.length === 0) ? 0 : +this.chapters[this.chapters.length-1].id + 1
      this.$store.commit('create/SET_CHAPTERS', {
        id: id,
        vol: vol,
        ch: ch,
        name: '',
        teams: [],
        file: '',
      })
    },

    async lastChapterLoad() {
      let res = await createChapterGetInfo(this.$route.query.manga),
          vol = res.chapter.volume ? res.chapter.volume : 1,
          ch = +res.chapter.chapter
      
      this.post = res.post
      this.postTeams = res.teams
      this.lastChapter = res.chapter

      this.$store.commit('create/SET_CHAPTERS', {
        id: 0,
        vol: +vol,
        ch: +ch.toFixed(0),
        name: '',
        teams: [],
        file: '',
      })
    }
  },
};
</script>

<style lang="scss">
  @include action_save;
  @include multiselect;
  @include progress_bar;
  @include create_chapter;
</style>
