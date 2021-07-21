<template>
  <div class="create container">
    <div class="block__title">Создать новую команду</div>
    <div class="create__fields">
      <div class="create__fields__image">
        <div class="cover">
          <span>Аватарка команды</span>
          <input name="myAvatar" type="file">
        </div>
        <div class="bg_cover">
          <span>Фоновое изображение</span>
          <input name="myBackground" type="file">
        </div>
      </div>
      <div class="create__fields__input">
        <span>Название команды *</span>
        <input type="text" v-model.trim="team.name" placeholder="Название команды">
        <span>Сайт</span>
        <input type="text" v-model.trim="team.site" placeholder="Сайт">
        <span>Группа ВК</span>
        <input type="text" v-model.trim="team.vk" placeholder="Группа ВК">
        <span>Описание</span>
        <textarea v-model="team.desc" :maxlength="maxText" placeholder="Описание"></textarea>
        <div class="member">
          <input id="member" type="checkbox" v-model="team.member" />
          <label for="member">Я являюсь представителем команды</label>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="save">Сохранить</div>
      <div class="cancel">Отмена</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      team: {
        bg: '',
        cover: '',
        name: '',
        desc: '',
        site: '',
        vk: '',
        member: true
      }
    }
  },
};
</script>

<style lang="scss">
.create {
  min-height: 100vh;
  border-left: thin solid rgba(255, 255, 255, 0.12);
  border-right: thin solid rgba(255, 255, 255, 0.12);
  &__fields {
    &__image {
      margin: 20px 0;
      .cover {
        margin: 8px 0;
      }
      .bg_cover {
        margin: 8px 0;
      }
      span {
      }
    }
    &__input {
      margin: 20px 0;
      input {
        width: 100%;
        color: #fff;
        height: 36px;
        margin: 4px 0;
        padding: 0 8px;
        font-size: inherit;
        border-radius: 6px;
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
      .member {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        #member {
          width: 36px;
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
