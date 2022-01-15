<template>
  <div class="loading">
    <span v-show="!text">
      Идёт загрузка...
    </span>
    <span v-show="text">
      {{ text }}...
    </span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="150px"
      height="150px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M5 50A45 45 0 0 0 95 50A45 47 0 0 1 5 50"
        fill="#ff6820"
        stroke="none"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51;360 50 51"
        ></animateTransform>
      </path>
    </svg>

  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
.loading {
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    text-align: center;
  }
}
</style>
