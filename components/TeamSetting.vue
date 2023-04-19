<template>
  <div class="description">
    <div class="block__title">Настройки команды</div>

    <div class="container">
      <div class="value">
        <div class="title">Название команды: *</div>
        <input class="text" name="name" type="text" placeholder="Основное название команды" v-model="data.name">
        <div class="block__subtitle">* - изменять основное название команды не рекомендуется</div>
      </div>
      <div class="value">
        <div class="title">Другие названия:</div>
        <input class="text" name="name_alt" type="text" placeholder="Другие названия" v-model="data.name_alt">
      </div>
      <div class="value">
        <div class="title">Сайт:</div>
        <input class="text" name="site" type="text" placeholder="Ссылка на сайт" v-model="data.link_site">
      </div>
      <div class="value">
        <div class="title">Группа ВК:</div>
        <input class="text" name="vk" type="text" placeholder="Ссылка на группу" v-model="data.link_vk">
      </div>
      <div class="value">
        <div class="title">Дискорд:</div>
        <input class="text" name="discord" type="text" placeholder="Ссылка на дискорд" v-model="data.link_discord">
      </div>
      <div class="value">
        <div class="title">Описание команды:</div>
        <textarea placeholder="Несколько слов о вашей команде" :maxlength="maxText" v-model="data.description"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
      </div>
    </div>

    <div class="container">
      <div class="value">
        <div class="title">Аватарка</div>
        <input class="hidden" id="cover" type='file' accept="image/*" @change="onChangeAvatar" />
        <label for="cover" class="user_image avatar" ref="avatar"> Нажмите сюда для выбора аватарки </label>
      </div>
      <div class="value">
        <div class="title">Фон профиля</div>
        <input class="hidden" id="bg" type='file' accept="image/*" @change="onChangeBackground" />
        <label for="bg" class="user_image background" ref="cover_bg"> Нажмите сюда для выбора фона профиля </label>
      </div>
    </div>

    <div class="container">
      <div class="value">
        <div class="title">Состав команды:</div>
        <div class="block__subtitle"> Функция редактирования состава команды находится в разработке! </div>
      </div>
    </div>

    <div class="action">
      <button class="save" @click="saveAndUpload" :disabled="disabled">Сохранить</button>
      <!-- <div class="cancel">Отмена</div> -->
    </div>

    <notifications />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { notify } from '~/services/util'
import { teamUpdate } from "~/services/api"

export default {
  data() {
    return {
      disabled: false,
      data: {
        avatar: '',
        cover_bg: '',
        name: '',
        name_alt: '',
        description: '',
        link_site: '',
        link_vk: '',
        link_discord: '',
      },
      maxText: 1536,
    }
  },

  computed: {
    ...mapGetters('team', { team: 'GET_TEAM' }),

    lengthText() {
      return this.data.description ? this.data.description.length : 0
    },
  },

  created() {
    this.init()
  },

  methods: {
    async saveAndUpload() {
      this.disabled = true
      let form = new FormData()
      if(this.data.avatar) form.append('avatar', this.data.avatar)
      if(this.data.cover_bg) form.append('cover_bg', this.data.cover_bg)
      form.append('name', this.data.name.trim())
      form.append('name_alt', this.data.name_alt ? this.data.name_alt.trim() : '')
      form.append('description', this.data.description ? this.data.description.trim() : '')
      form.append('link_site', this.data.link_site ? this.data.link_site.trim() : '')
      form.append('link_vk', this.data.link_vk ? this.data.link_vk.trim() : '')
      form.append('link_discord', this.data.link_discord ? this.data.link_discord.trim() : '')

      let res = await teamUpdate(this.team.id, form)
      this.disabled = false

      if(res.status == 'ok' || res.id) {
        res.cover.avatar = res.cover.mid ? res.cover.mid : ''
        res.cover.bg = res.cover.bg ? res.cover.bg : ''
        this.$store.commit('team/SET_TEAM_UPDATE', res)
        this.$notify({
          text: "Изменения сохранены!",
          type: "success",
        })
      } else {
        this.$notify(notify(res))
      }

      this.data.avatar = ''
      this.data.cover_bg = ''
    },
    init() {
      this.data.name = this.team.name
      this.data.name_alt = this.team.name_alt
      this.data.description = this.team.description
      this.data.link_site = this.team.link_site
      this.data.link_vk = this.team.link_vk
      this.data.link_discord = this.team.link_discord
    },
    onChangeAvatar(e) {
      let file = (e.target.files.length > 0) ? e.target.files[0] : false,
          imageView = new FileReader(),
          src = this.$refs.avatar

      if(file) {
        imageView.onload = function (el) {
          src.style.backgroundImage = `url('${el.target.result}')`
        }
        imageView.readAsDataURL(file)
        this.data.avatar = file
      } else {
        this.data.avatar = ''
        src.style.backgroundImage = `url()`
      }
    },
    onChangeBackground(e) {
      let file = (e.target.files.length > 0) ? e.target.files[0] : false,
          imageView = new FileReader(),
          src = this.$refs.cover_bg

      if(file) {
        imageView.onload = function (el) {
          src.style.backgroundImage = `url('${el.target.result}')`
        }
        imageView.readAsDataURL(file)
        this.data.cover_bg = file
      } else {
        this.data.cover_bg = ''
        src.style.backgroundImage = `url()`
      }
    },
  },
};
</script>

<style lang="scss">
.description {
  .container {
    padding: 0 6px !important;
    textarea {
      height: 305px;
    }
  }
  .action {
    height: 40px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    .save,
    .cancel {
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 6px;
      border: thin solid rgba(255, 255, 255, 0.12);
    }
      button.save {
        color: #ffffff;
        background-color: #121212;
      }
    .save {
      border-bottom: thin solid rgba(0, 255, 34, 0.25);
      &:hover {
        border: thin solid rgba(0, 255, 34, 0.25);
      }
    }
    .cancel {
      border-bottom: thin solid rgba(255, 0, 0, 0.25);
      &:hover {
        border: thin solid rgba(255, 0, 0, 0.25);
      }
    }
  }
}
</style>
