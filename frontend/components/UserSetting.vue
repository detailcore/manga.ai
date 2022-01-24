<template>
  <div class="settings" v-if="settingsShow">
    <div class="nav-line">
      <div class="item" :class="{ active : showAva }" @click.prevent="showAva = true, showSecurity = false, showInformation = false"> Аватарки </div>
      <div class="item" :class="{ active : showInformation }" @click.prevent="showInformation = true, showAva = false, showSecurity = false"> Информация </div>
      <!-- <div class="item"> Уведомления </div> -->
      <div class="item" :class="{ active : showSecurity }" @click.prevent="showSecurity = true, showAva = false, showInformation = false"> Безопасность </div>
    </div>

    <div class="container" v-show="showAva">
      <div class="value">
        <div class="title">Аватарка</div>
        <file-pond
          name="cover"
          class="filepond"
          label-idle="Нажмите или перетащите изображение для загрузки"
          :allow-multiple="false"
          credits="false"
          accepted-file-types="image/*"
          :server="uploadCover()"
          instantUpload="false"
          :files="getCover" />
        <div> Аватарка обрежется в размер 160x160 пикселей </div>
      </div>
      <div class="value">
        <div class="title">Фон профиля</div>
        <file-pond
          name="cover_bg"
          class="filepond"
          label-idle="Нажмите или перетащите изображение для загрузки"
          :allow-multiple="false"
          credits="false"
          accepted-file-types="image/*"
          :server="uploadCoverBg()"
          instantUpload="false"
          :files="getCoverBg" />
        <div> Фоновое изображение обрежется по высоте в 330 пикселей и выровняется по центру </div>
      </div>
    </div>

    <div class="container" v-show="showInformation">
      <div class="value">
        <div class="title">Ваш ник (виден всем):</div>
        <input class="text" name="name" type="text" v-model="info.name">
      </div>
      <div class="value">
        <div class="title">Email (виден только вам):</div>
        <input class="text" name="email" type="email" v-model="info.email">
      </div>
      <div class="value">
        <div class="title">Пол:</div>
        <div class="values">
          <input type="radio" id="notChosen" value="0" v-model="info.gender">
          <label for="notChosen">Не указан</label>
          <input type="radio" id="male" value="1" v-model="info.gender">
          <label for="male">Мужской</label>
          <input type="radio" id="female" value="2" v-model="info.gender">
          <label for="female">Женский</label>
        </div>
      </div>
      <div class="value">
        <div class="title">Место жительства:</div>
        <input class="text" name="residence" type="text" v-model="info.residence">
      </div>
      <div class="value">
        <div class="title">Вебсайт:</div>
        <input class="text" name="site" type="url" v-model="info.site">
      </div>
      <div class="value">
        <div class="title">Информация о себе:</div>
        <textarea v-model="info.about" placeholder="Введите несколько строчек о себе"></textarea>
      </div>
      <div class="action">
        <div class="save" @click="updateInformation">Сохранить</div>
        <div class="cancel" @click="settingsShow = false">Отмена</div>
      </div>
    </div>

    <div class="container" v-show="showSecurity">
      <div class="value">
        <div class="title">Текущий пароль</div>
        <input class="text" type="password" v-model.trim="changePassword.current" placeholder="Текущий пароль">
      </div>
      <div class="value">
        <div class="title">Новый пароль</div>
        <input class="text" type="password" v-model.trim="changePassword.new" placeholder="Новый пароль">
      </div>
      <div class="value">
        <div class="title">Повторите новый пароль</div>
        <input class="text" type="password" v-model.trim="changePassword.reNew" placeholder="Повторите новый пароль">
      </div>
      <div class="action">
        <div class="save">Сохранить</div>
        <div class="cancel" @click="settingsShow = false">Отмена</div>
      </div>
    </div>

  </div>
</template>

<script>
import { updateUser } from '~/services/api'
import { getCookie } from '~/services/getCookie'

export default {
  props: {
    settingsShow: { type: Boolean, default: false },
  },

  data() {
    return {
      changePassword: {
        current: '',
        new: '',
        reNew: '',
      },
      showAva: true,
      showSecurity: false,
      showInformation: false,
      info: {
        id: 0,
        cover: '',
        cover_bg: '',
        name: '',
        email: '',
        gender: 0,
        residence: '',
        site: '',
        about: '',
      },
      cover: '',
      cover_bg: '',
    }
  },

  mounted() {
    this.setUser()
  },

  computed: {
    getToken() {
      return getCookie('XSRF-TOKEN')
    },
    getApi({ $config }) {
      return $config.apiDomain + '/api/'
    },
    getCover() {
      return this.cover
    },
    getCoverBg() {
      return this.cover_bg
    },
  },

  methods: {
    async updateInformation() {
      await updateUser({
        name: this.info.name,
        site: this.info.site,
        about: this.info.about,
        email: this.info.email,
        gender: +this.info.gender,
        residence: this.info.residence,
      })
    },
    setCover(fileName) {
      this.$store.commit('user/SET_COVER', fileName)
    },
    setCoverBg(fileName) {
      this.$store.commit('user/SET_COVER_BG', fileName)
    },
    setUser() {
      let { id, name, email, cover, cover_bg, gender, site } = this.$store.state.auth.user
      this.info.id = id
      this.info.cover = cover
      this.info.cover_bg = cover_bg
      this.info.name = name
      this.info.site = site
      this.info.email = email
      this.info.gender = +gender
    },
    uploadCover() {
      return {
        url: this.getApi,
        process: {
          url: 'user/upload_cover',
          headers: {
            'X-XSRF-TOKEN': this.getToken,
            'UserId': this.info.id
          },
          withCredentials: true,
          onload: (response) => {
            this.setCover(response)
          },
        },
        revert: null,
        restore: null,
        load: null,
        fetch: null,
      }
    },
    uploadCoverBg() {
      return {
        url: this.getApi,
        process: {
          url: 'user/upload_cover_bg',
          headers: {
            'X-XSRF-TOKEN': this.getToken,
            'UserId': this.info.id
          },
          withCredentials: true,
          onload: (response) => {
            this.setCoverBg(response)
          },
        },
        revert: null,
        restore: null,
        load: null,
        fetch: null,
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  .value {
    padding-top: 16px;
    .title {
      font-size: 1.2rem;
      font-weight: 200;
      margin-bottom: 4px;
    }
    .values {
      display: flex;
      align-items: center;
      flex-direction: row;
      label {
        cursor: pointer;
        font-weight: 200;
        margin-left: 4px;
        margin-right: 10px;
      }
    }
    .text {
      background: #1e1e1e;
      color: #fff;
      height: 36px;
      border-radius: 6px;
      padding: 0 8px;
      width: 100%;
      font-size: inherit;
      margin-right: -52px;
    }
    textarea {
      width: 100%;
      color: #fff;
      background: #1e1e1e;
      padding: 8px 12px;
      font-size: inherit;
      border-radius: 6px;
      min-height: 104px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.01);
    }
  }
}
</style>
