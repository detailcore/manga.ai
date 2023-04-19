<template>
  <div class="modal__social">
    <!-- <div class="item">
      <IconsTwiiter />
    </div>
    <div class="item">
      <IconsFacebook />
    </div> -->
    <div class="item" @click="socialLogin('vkontakte')">
      <IconsVk />
    </div>
    <div class="item" @click="socialLogin('google')">
      <IconsGoogle />
    </div>
    <div class="item" @click="socialLogin('yandex')">
      <IconsYandex />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async socialLogin(service) {
      window.location.href = `${this.$config.apiDomain}/api/auth/login/${service}`
    },
  },
}
</script>

<style lang="scss">
  .modal__social {
    display: flex;
    .item {
      width: 25%;
      padding: 0;
      display: flex;
      cursor: pointer;
      margin: 12px 8px;
      align-items: center;
      flex-direction: column;
      &:hover {
        text-decoration: underline;
      }
      svg {
        max-height: 20px;
      }
    }
  }
</style>
