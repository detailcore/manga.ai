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
          ref="pond"
          class="filepond"
          label-idle="Нажмите или перетащите изображение для загрузки"
          :allow-multiple="false"
          credits="false"
          accepted-file-types="image/*"
          :server="uploadServer"
          instantUpload="false"
          :files="info.cover"
          v-on:init="handleFilePondInit"/>
      </div>
      <!-- <div class="value">
        <div class="title">Фон профиля</div>
        <file-pond
          name="cover_bg"
          ref="pond"
          class="filepond"
          label-idle="Drop files here..."
          :allow-multiple="true"
          credits="false"
          accepted-file-types="image/*"
          server="/api"
          :files="info.cover_bg"
          v-on:init="handleFilePondInit"/>
      </div> -->
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
          <input type="radio" id="notChosen" value="Не указан" v-model="info.sex">
          <label for="notChosen">Не указан</label>
          <input type="radio" id="male" value="Мужской" v-model="info.sex">
          <label for="male">Мужской</label>
          <input type="radio" id="female" value="Женский" v-model="info.sex">
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
        <div class="save">Сохранить</div>
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
        cover: '',
        cover_bg: '',
        name: '',
        email: '',
        sex: '',
        residence: '',
        site: '',
        about: '',
      },
    }
  },

  mounted() {
    this.setUser()
  },

  computed: {
    uploadServer({ $config }) {
      return {
        url: $config.apiDomain + '/api/',
        process: {
          url: 'user/upload_cover',
          headers: {
            'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN'),
          },
          withCredentials: true,
        },
        revert: './revert',
        restore: './restore/',
        load: './load/',
        fetch: './fetch/'
      }
    },
  },

  methods: {
    getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setUser() {
      let { name, email, cover, cover_bg, gender } = this.$store.state.auth.user
      this.info.cover = '/_nuxt/assets/images/mid_cover.jpg'
      this.info.cover_bg = cover_bg
      this.info.name = name
      this.info.email = email
      this.info.sex = gender
    },
    handleFilePondInit: function() {
      console.log('FilePond has initialized');
      // FilePond instance methods are available on `this.$refs.pond`
      console.log(this.$refs.pond.getFiles())
    }
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
