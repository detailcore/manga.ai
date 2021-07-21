<template>
  <footer class="region__footer">
    <div class="footer">
      <div class="footer__item">
        <span class="manga_club">MangaClub</span>
        <span class="text">Читать мангу онлайн на русском</span>
      </div>
      <div class="footer__item">
        <Nuxt-link to="/">Правила сайта</Nuxt-link>
        <Nuxt-link to="/">DMCA</Nuxt-link>
        <Nuxt-link to="/">Copyright</Nuxt-link>
      </div>
      <div class="footer__item">
        <span>Контакты / Contacts</span>
        <span>example@mail.net</span>
        <span>vk.com | Telega</span>
        <span>mangaclub.ai</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.region__footer {
  background-color: $dark_primary;
  border-top: thin solid rgb(255 255 255 / 12%);
  .footer {
    height: 100px;
    display: flex;
    padding: 0 15px;
    flex-direction: row;
    justify-content: space-between;
    .footer__item {
      width: 33.333333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      a,
      span {
        font-weight: 300;
        line-height: 20px;
        width: max-content;
        text-decoration: none;
      }
      .manga_club {
        font-weight: 500;
        font-size: 1.5rem;
        padding: 6px 0px;
      }
      .text {
      }
    }
  }
}
</style>
