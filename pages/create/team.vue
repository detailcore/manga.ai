<template>
  <div class="create container">
    <div class="block__title">Создать новую команду</div>
    <div class="create__fields">
      <!-- <div class="create__fields__image">
        <div class="cover">
          <span>Аватарка команды</span>
          <input name="myAvatar" type="file">
        </div>
        <div class="bg_cover">
          <span>Фоновое изображение</span>
          <input name="myBackground" type="file">
        </div>
      </div> -->
      <div class="create__fields__input">
        <span>Название команды *</span>
        <input type="text" v-model.trim="team.name" placeholder="Название команды">
        <span>Сайт</span>
        <input type="text" v-model.trim="team.site" placeholder="Сайт">
        <span>Группа ВК</span>
        <input type="text" v-model.trim="team.vk" placeholder="Группа ВК">
        <span>Дискорд</span>
        <input type="text" v-model.trim="team.discord" placeholder="Дискорд">
        <span>Описание</span>
        <textarea v-model="team.desc" :maxlength="maxText" placeholder="Описание"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
        <div class="member">
          <input id="member" type="checkbox" v-model="team.member" />
          <label for="member">Я являюсь представителем команды</label>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="save" @click.prevent="send()">Сохранить</div>
      <Nuxt-link to="/" class="cancel"> Отмена </Nuxt-link>
    </div>

    <notifications />

  </div>
</template>

<script>
import { teamCreate } from '~/services/api'

export default {
  data() {
    return {
      maxText: 1536,
      team: {
        // bg: '',
        // cover: '',
        name: '',
        name_alt: '',
        desc: '',
        site: '',
        vk: '',
        discord: '',
        owner: 1,
        member: true
      }
    }
  },

  computed: {
    lengthText() {
      return this.team.desc.length
    },
  },

  methods: {
    async send() {
      let data = {
        name: this.team.name,
        name_alt: this.team.name_alt ? this.team.name_alt : '',
        description: this.team.desc ? this.team.desc : '',
        link_site: this.team.site ? this.team.site : '',
        link_vk: this.team.vk ? this.team.vk : '',
        link_discord: this.team.discord ? this.team.discord : '',
        owner: this.team.member ? (this.$store.state.auth.loggedIn ? this.$store.state.auth.user.id : this.team.owner) : this.team.owner,
      }
      if(this.team.name) {
        let response = await teamCreate(data) // создаём

        if(response.status === 'ok') {
          this.$notify({
            text: response.msg,
            type: 'success',
            duration: 5000,
          })
          this.team = {
            name: '',
            name_alt: '',
            desc: '',
            site: '',
            vk: '',
            discord: '',
            owner: 1,
          }
        }
      } else {
        this.$notify({
          text: 'Поля со звёздочкой "*" обязательны для заполнения',
          type: 'error',
        })
      }
    },
  },
};
</script>

<style lang="scss">
  @include action_save;
  @include creation_pages;
</style>
