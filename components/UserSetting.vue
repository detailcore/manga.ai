<template>
  <div class="settings" v-if="settingsShow">
    <div class="nav-line">
      <div class="item" :class="{ active : showAva }" @click="showAva = true, showSecurity = false, showInformation = false"> Аватарки </div>
      <div class="item" :class="{ active : showInformation }" @click="showInformation = true, showAva = false, showSecurity = false"> Информация </div>
      <!-- <div class="item"> Уведомления </div> -->
      <div class="item" :class="{ active : showSecurity }" @click="showSecurity = true, showAva = false, showInformation = false"> Безопасность </div>
    </div>

    <div class="container" v-if="showAva">
      <div class="value">
        <div class="title">Аватарка</div>
        <input class="hidden" id="cover" type='file' accept="image/*" @change="onChangeAvatar" />
        <label for="cover" class="user_image avatar" ref="avatar"> Нажмите сюда для выбора аватарки </label>
        <div> Аватарка уменьшится до размера в 160x160 пикселей </div>
      </div>
      <div class="value">
        <div class="title">Фон профиля</div>
        <input class="hidden" id="bg" type='file' accept="image/*" @change="onChangeBackground" />
        <label for="bg" class="user_image background" ref="background"> Нажмите сюда для выбора фона профиля </label>
        <div> Фоновое изображение обрежется по высоте в 330 пикселей и выровняется по центру </div>
      </div>
      <div class="action">
        <button class="save" @click="uploadImages" :disabled="disabled">Сохранить</button>
        <div class="cancel">Отмена</div>
      </div>
    </div>

    <div class="container" v-if="showInformation">
      <div class="value">
        <div class="title">Ваш ник (виден всем):</div>
        <input class="text" :class="{ error: errors.includes('name') }" name="name" type="text" v-model="info.name">
      </div>
      <div class="value">
        <div class="title">Email (виден только вам):</div>
        <input class="text" :class="{ error: errors.includes('email') }" name="email" type="email" v-model="info.email">
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
        <textarea v-model="info.about" placeholder="Введите несколько строк о себе"></textarea>
      </div>
      <div class="action">
        <button class="save" @click="updateInformation" :disabled="disabled">Сохранить</button>
        <div class="cancel" @click="settingsShow = false">Отмена</div>
      </div>
    </div>

    <div class="container" v-if="showSecurity">
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
        <button class="save" @click="updatePassword" :disabled="disabled">Сохранить</button>
        <div class="cancel" @click="settingsShow = false">Отмена</div>
      </div>
    </div>

    <notifications />

  </div>
</template>

<script>
import { updateUser, userUploadCover, userUploadBackground, changePassword } from '~/services/api'

export default {
  props: {
    settingsShow: { type: Boolean, default: false },
  },

  data() {
    return {
      disabled: false,
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
      errors: [],
    }
  },

  mounted() {
    this.setUser()
  },

  methods: {
    onChangeAvatar(e) {
      let file = (e.target.files.length > 0) ? e.target.files[0] : false,
          imageView = new FileReader(),
          src = this.$refs.avatar

      if(file) {
        imageView.onload = function (el) {
          src.style.backgroundImage = `url('${el.target.result}')`
        }
        imageView.readAsDataURL(file)
        this.cover = file
      } else {
        this.cover = ''
        src.style.backgroundImage = `url()`
      }
    },
    onChangeBackground(e) {
      let file = (e.target.files.length > 0) ? e.target.files[0] : false,
          imageView = new FileReader(),
          src = this.$refs.background

      if(file) {
        imageView.onload = function (el) {
          src.style.backgroundImage = `url('${el.target.result}')`
        }
        imageView.readAsDataURL(file)
        this.cover_bg = file
      } else {
        this.cover_bg = ''
        src.style.backgroundImage = `url()`
      }
    },
    async uploadImages() {
      this.disabled = true
      let images = new FormData()
      images.append('cover', this.cover)
      images.append('cover_bg', this.cover_bg)

      let res = await userUploadCover(images)
      this.disabled = false

      if(res.cover) {
        let user = { ...this.$auth.user }
        user.cover = res.cover
        this.$auth.setUser(user)
        this.$store.commit('user/SET_COVER', res.cover)
      }
      if(res.cover_bg) this.$store.commit('user/SET_COVER_BG', res.cover_bg)
      // Обнуление аватарки и фона после загрузки
      this.$refs.avatar.style.backgroundImage = `url()`
      this.$refs.background.style.backgroundImage = `url()`
    },
    async updateInformation() {
      this.disabled = true
      let res = await updateUser({
        name: this.info.name,
        site: this.info.site,
        about: this.info.about,
        email: this.info.email,
        gender: +this.info.gender,
        residence: this.info.residence,
      })
      if(res.status != 200) {
        this.$notify({
          title: `Ошибка ${res.status}`,
          text: res.data.message,
          type: 'error',
          duration: 2500
        })
        this.errors = Object.keys(res.data.errors)
      } else {
        this.errors = []
        this.$store.commit('user/SET_USER_INFO', this.info)
      }
      this.disabled = false
    },
    async updatePassword() {
      this.disabled = true
      if(this.changePassword.new === this.changePassword.reNew && this.changePassword.new.length > 7) {
        await changePassword({
          current_password: this.changePassword.current,
          password: this.changePassword.new,
          password_confirmation: this.changePassword.reNew,
        })
        .then(() => {
          this.$notify({
            text: `Пароль успешно изменён!`,
            type: 'success',
          })
        })
        .catch(() => {
          this.$notify({
            text: `Ошибка изменения пароля`,
            type: 'error',
          })
        })
      } else {
        this.$notify({
          text: `Новый и повторный пароли не совпадают, либо длина пароля меньше 8 символов!`,
          type: 'error',
        })
      }
      this.disabled = false
    },
    setUser() {
      let { id, name, email, cover, cover_bg, gender, site, residence, about } = this.$store.state.auth.user
      this.info.id = id
      this.info.about = about
      this.info.cover = cover
      this.info.cover_bg = cover_bg
      this.info.name = name
      this.info.site = site
      this.info.email = email
      this.info.gender = +gender
      this.info.residence = residence
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
    .user_image {
      display: flex;
      cursor: pointer;
      font-weight: 200;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
      text-align: center;
      text-shadow: 1px 1px 3px black;
      border: dashed 2px rgba(255, 255, 255, 0.12);
      &.avatar {
        width: 160px;
        height: 160px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      &.background {
        height: 330px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center bottom;
      }
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
