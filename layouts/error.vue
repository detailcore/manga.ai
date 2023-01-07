<template>
  <div class="error" >

    <div class="__code">{{ code }}</div>
    <div class="__title">{{ body.title }}</div>

    <div class="__msg">
      <div class="first">{{ body.msg }}</div>
      <div class="last" v-show="code == 404">Перейдите, пожалуйста, на <NuxtLink to="/">главную страницу</NuxtLink> сайта.</div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['error'],

    layout: 'error',

    computed: {
      code() {
        return this.error.statusCode
      },
      body() {
        switch (this.code) {
          case 403:
            return { title: 'Возможно требуется авторизация', msg: 'Контент на этой странице удалён, либо гостям сайта доступ к этой странице запрещён.' };
          case 404:
            return { title: 'Страница не найдена', msg: 'Страница на которую вы перешли отсутствует, перенесена или удалена' };
          case 500:
            return { title: 'Внутренняя ошибка сервера', msg: 'На сервере возникла какая-то ошибка, и он бедненький не знает как с ней быть...' };
          default:
            return { title: 'Произошла неизвестная ошибка', msg: 'Если вы увидели это сообщение, то сообщите пожалуйста об этом админу' };
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .error {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 0;
    height: calc(100vh - 165px);
    overflow: hidden;
    position: relative;
    text-align: center;
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    background-image: url('~/assets/images/error-page.webp');
    &::after {
      content: '';
      background-color: #000;
      opacity: .8;
      min-height: 100vh;
      width: 100vw;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: -1;
    }
    .__code,
    .__title,
    .__msg {
      position: inherit;
    }
    a,
    .__code {
      color: #ff6820;
    }
    .__code {
      font-size: 140px;
      font-weight: bold;
    }
    .__title {
      font-size: 50px;
      font-weight: bold;
      text-transform: uppercase;
    }
    .__msg {
      margin-top: 12px;
      font-size: 18px;
      line-height: 28px;
      .last {
        margin-top: 12px;
      }
    }
  }
</style>
