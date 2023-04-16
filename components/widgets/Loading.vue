<template>
  <div class="loading" :class="{ error: isError }">
    <span v-show="!text && !isError">
      Идёт загрузка...
    </span>
    <span v-show="text && !isError">
      {{ text }}...
    </span>

    <span v-show="isError">
      {{ text }}
    </span>

    <svg v-show="isError"
      :width=widthStr
      :height=heightStr
      viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M18,20H6V18H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V18H18V20M14,2H6A2,2 0 0,0 4,4V12H6V4H14V8H18V12H20V8L14,2M11,16H8V14H11V16M16,16H13V14H16V16M3,14H6V16H3V14M21,16H18V14H21V16Z" />
    </svg>

    <svg v-show="!isError"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width=widthStr
      :height=heightStr
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
    width: { type: Number, default: 150 },
    height: { type: Number, default: 150 },
    isError: { type: Boolean, default: false },
  },

  computed: {
    widthStr () {
      return this.width + 'px'
    },
    heightStr () {
      return this.height + 'px'
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  &.error {
    padding: 16px;
  }
  span {
    text-align: center;
  }
}
</style>
