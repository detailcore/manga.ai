<template>
  <div class="comment__add">

    <textarea v-model="newText" :maxlength="maxText" class="comment__add__text"></textarea>

    <div class="comment__add__action">
      <div class="limit">{{ lengthText }}/{{ maxText }} символов</div>
      <div class="send">
        <span class="btn" @click="close">
          <mdi-Close title="Закрыть" />
        </span>
        <div class="btn__action" @click="sendComment">Изменить</div>
      </div>
    </div>

  </div>
</template>

<script>
import { updateComment } from '~/services/api'

export default {
  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
  },

  data() {
    return {
      newText: this.text,
      maxText: 512,
    }
  },

  computed: {
    lengthText() {
      return this.newText.length
    },
  },

  methods: {
    async sendComment() {
      if(this.newText.length < 9) {
        this.$notify({
          text: `Длинна комментария не может быть меньше 10 символов`,
          type: 'error',
        })
        return false
      }
      this.$store.commit('comments/SET_EDIT', { id: this.id, text: this.newText })
      this.close()
      await updateComment({ id: this.id, content: this.newText })
    },
    close() {
      this.$store.commit('comments/SET_OPEN_EDIT', { id: this.id, value: false })
    },
  },
}
</script>

<style lang="scss">
  .comment__add {
    &__text {
      width: 100%;
      color: #fff;
      background: #1e1e1e;
      padding: 8px 12px;
      font-size: inherit;
      border-radius: 6px;
      min-height: 104px;
      outline: none;
      border: thin solid rgba(255, 255, 255, 0.01);
      &:hover,
      &:focus {
        outline: none;
        border: thin solid rgba(255, 255, 255, 0.12);
      }
      &:focus {
        box-shadow: inset 0 0 2px 0px #fff;
      }
    }
    &__action {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      .limit {
        font-weight: 300;
        font-size: 0.9rem;
        margin-left: 10px;
      }
      .send {
        display: flex;
        align-items: center;
        flex-direction: row;
        .decorator {
          text-decoration: line-through;
        }
      }
    }
  }
</style>
