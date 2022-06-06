<template>
  <div class="checkbox">
    <input type="radio" :name="type+ '_' +id" value="1" v-model="selectedValue" @change.prevent="setGenre">
    <input type="radio" :name="type+ '_' +id" value="-1" v-model="selectedValue" @change.prevent="setGenre">
    <input type="radio" :name="type+ '_' +id" value="0" v-model="selectedValue" @change.prevent="setGenre">

    <span class="mark"></span>

    <span class="name"> {{ name }} </span>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    name: { type: String, default: '' },
    type: { type: String, required: true },
    reset: { type: Boolean, default: false }
  },

  data() {
    return {
      selectedValue: 0,
    }
  },

  watch: {
    reset() {
      this.selectedValue = 0
    },
  },

  methods: {
    async setGenre() {
      this.$store.commit('library/SET_FILTER_SELECTED', { id: this.id, type: this.type, value: this.selectedValue })
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  margin: 5px 10px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: row;
  border-radius: 3px;
  &:hover {
    background-color: #282829;
    transition: .1s ease;
  }
  .name {
    overflow: hidden;
    margin-left: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > input[type="radio"] {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 20px;
    cursor: pointer;
    opacity: 0;
    &:first-child {
      z-index: 10;
      &:checked {
        z-index: 0;
      }
    }
    &:checked {
      & + input[type="radio"] {
        z-index: 10;
      }
    }
  }

  input[value="-1"]:checked~.mark {
    &:before {
      left: -2px;
      top: -2px;
      right: -2px;
      bottom: -2px;
      background-color: #920909;
    }
    &:after {
      left: 3px;
      top: 7px;
      width: 10px;
      height: 0px;
      border-left: none;
      border-bottom: solid 3px;
      transform: rotate(0);
    }
  }

  input[value="0"]:checked~.mark {
    &:before {
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: 1px;
    }
  }

  input[value="1"]:checked~.mark {
    &:before {
      left: -2px;
      top: -2px;
      right: -2px;
      bottom: -2px;
      background-color: #5cb85c;
    }
    &:after {
      left: 2px;
      top: 4px;
      width: 14px;
      height: 5px;
      border-left: solid 3px;
      border-bottom: solid 3px;
      transform: rotate(-45deg);
    }
  }

  .mark {
    width: 20px;
    height: 20px;
    position: relative;
    display: inline-block;
    vertical-align: top;
    border-radius: 3px;
    background-color: #fff;
    border: solid 2px #bdbdbd;
    transition: all 0.3s;
    &:before,
    &:after {
      display: block;
      content: "";
      position: absolute;
    }
    &:before {
      border-radius: 3px;
    }
    &:after {
      color: white;
    }
  }
}
</style>