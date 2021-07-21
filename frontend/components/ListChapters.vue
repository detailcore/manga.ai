<template>
  <div>
    <div class="translator_select">
      <widgets-card-short v-for="(item, index) in dataTest" :key="index"
          :id="item.id"
          :cover="item.cover"
          :title="item.title"
          :count="item.count"
          type="branch" />
    </div>

    <div class="chapters">
      <div class="chapter" v-for="(item, index) in dataChapterList" :key="index">
        <div class="chapter__vol"> {{ item.v }} </div>
        <div class="chapter__body">
          <Nuxt-link class="chapter__body__chapter" to="#">
            Глава {{ item.ch }} <span class="name"> - {{ item.name }} </span>
          </Nuxt-link>
          <div class="chapter__body__publishers">
            <span class="publisher" v-for="(team, jindex) in item.publishers" :key="jindex"> {{ team.name }} </span>
          </div>
          <div class="chapter__body__date"> {{ item.created }} </div>
        </div>
        <div class="chapter__score">
          <mdi-HeartOutline title="" /> {{ item.score }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  computed: {
    dataChapterList() {
      return [
        {
          id: 1, //id chapter
          id_manga: 123,
          v: 1,
          ch: '1',
          name: 'Название самой главы',
          score: 843,
          publishers: [
            { name: 'Название команды' },
            { name: 'Либо логин пользователя' },
          ],
          created: '11.07.2021',
        },
        {
          id: 2, //id chapter
          id_manga: 123,
          v: 1,
          ch: '2',
          name: 'Название самой главы 2 и какое-то ну очень очень очень длинное название второй главы вышло у переводчиков',
          score: 453,
          publishers: [
            { name: 'Одна команда' }
          ],
          created: '11.07.2021',
        },
        {
          id: 3, //id chapter
          id_manga: 123,
          v: 1,
          ch: '3',
          name: 'Название самой главы 3',
          score: 264,
          publishers: [
            { name: 'Название команды' },
            { name: 'Либо логин пользователя' },
          ],
          created: '11.07.2021',
        },
      ]
    },
    dataTest() {
      return [
        {
          id: 1,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          count: 76,
          title: 'Название команды',
        },
        {
          id: 2,
          cover: '/_nuxt/assets/images/mid_cover.jpg',
          count: 18,
          title: 'Название команды 2',
        },
      ]
    },
  }
};
</script>


<style lang="scss">
.chapters {
  display: flex;
  flex-direction: column;
  .chapter {
    height: 40px;
    margin: 4px 0;
    padding: 0 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 6px;
    position: relative;
    border: thin solid rgba(255, 255, 255, 0.12);
      &:hover {
        &:before {
          opacity: 0.1;
        }
      }
      &:before {
        @include before;
      }
    &__vol {
      margin: 0 12px 0 8px;
    }
    &__body {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__chapter {
        padding-right: 8px;
        overflow: hidden;
        text-decoration: none;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        &:hover {
          text-decoration: underline;
        }
      }
      &__publishers {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .publisher {
          white-space: nowrap;
        }
      }
      &__date {
        margin-left: 12px;
      }
    }
    &__score {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin: 0 8px 0 20px;
      span {
        margin-right: 6px;
      }
    }
  }
}
</style>
