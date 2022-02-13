<template>
  <div class="create container">
    <div class="block__title">Добавить тайтл</div>
    <div class="create__fields">

      <div class="create__fields__image">
        <div class="cover">
          <span>Обложка</span>
          <input name="myCover" type="file">
        </div>
        <div class="bg_cover">
          <span>Фоновое изображение</span>
          <input name="myBackground" type="file">
        </div>
      </div>


      <div class="create__fields__input">
        <span>Русское название</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Русское название">

        <span>Английское название</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Английское название">

        <span>Оригинальное название (без иероглифов)</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Оригинальное название (без иероглифов)">

        <span>Альтернативные названия (возможно с иероглифами)</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Разделять символом '/' (наклонная черта) ">

        <div class="line_half">
          <div class="half">
            <span>Тип</span>
            <select v-model="typeSelected">
              <option v-for="(item, index) in manga.type" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="half">
            <span>Год релиза</span>
            <input type="text" v-model.trim="manga.cover" placeholder="Год релиза">
          </div>
        </div>
        
        <div class="line_half">
          <div class="half">
            <span>Автор</span>
            <input type="text" v-model.trim="manga.cover" placeholder="Автор">
          </div>
          <div class="half">
            <span>Художник (если есть)</span>
            <input type="text" v-model.trim="manga.cover" placeholder="Художник">
          </div>
        </div>

        <span>Издатель</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Издатель">

        <span>Жанры</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Жанры">

        <span>Теги</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Теги">

        <span>Формат выпуска</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Формат выпуска">

        <span>Переводчики (команды)</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Переводчики">

        <div class="line_quarter">
          <div class="quarter">
            <span>Статус</span>
              <select v-model="statusSelected">
              <option v-for="(item, index) in manga.status" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span>Перевод</span>
            <select v-model="translationSelected">
              <option v-for="(item, index) in manga.translation" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span>Контент для взрослых</span>
            <select v-model="adultSelected">
              <option v-for="(item, index) in manga.adult" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="quarter">
            <span>Загрузка глав</span>
            <select v-model="uploaderSelected">
              <option v-for="(item, index) in manga.uploader" :value="item.value" :key="index">
                {{ item.text }}
              </option>
            </select>
          </div>
        </div>

        <span>Ссылки на оригинал или анлейт (помогает модерации)</span>
        <input type="text" v-model.trim="manga.cover" placeholder="Ссылка">

        <span>Описание</span>
        <textarea v-model="manga.cover" :maxlength="maxText" placeholder="Описание"></textarea>
        <!-- <div class="member">
          <input id="member" type="checkbox" v-model="" />
          <label for="member">Я являюсь представителем команды</label>
        </div> -->
      </div>
    </div>

    <div class="action">
      <div class="save">Отправить на модерацию</div>
      <div class="cancel">Отмена</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      manga: {
        cover: '',
        type: [
          { text: 'Манга', value: 1 },
          { text: 'Манхва', value: 2 },
          { text: 'Маньхуа', value: 3 },
          { text: 'Руманга', value: 4 },
          { text: 'OEL-манга', value: 5 },
          { text: 'Комикс западный', value: 6 }
        ],
        adult: [
          { text: 'Нет', value: 1 },
          { text: '16+', value: 2 },
          { text: '18+', value: 3 }
        ],
        status: [
          { text: 'Онгоинг', value: 1 },
          { text: 'Завершен', value: 2 },
          { text: 'Анонс', value: 3 },
          { text: 'Приостановлен', value: 4 },
          { text: 'выпуск прекращен', value: 5 }
        ],
        uploader: [
          { text: 'Кто угодно', value: 1 },
          { text: 'Создатель и переводчики', value: 2 }
        ],
        translation: [
          { text: 'Продолжается', value: 1 },
          { text: 'Завершен', value: 2 },
          { text: 'Заморожен', value: 3 },
          { text: 'Заброшен', value: 4 }
        ],
      },
      typeSelected: 1,
      adultSelected: 1,
      statusSelected: 1,
      uploaderSelected: 2,
      translationSelected: 1,
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
      span {
        margin-top: 16px;
        display: inline-block;
      }
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
      select {
        height: 36px;
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
