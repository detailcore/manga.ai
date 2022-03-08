<template>
  <div class="modal">
    <div class="header"> Изменить статус </div>

    <div class="main">
      <div class="point">
        <textarea v-model="text" :maxlength="maxText" rows="5" placeholder="Уточните причину изменения статуса"></textarea>
        <div class="limit">{{ lengthText }}/{{ maxText }} символов максимум</div>
      </div>

      <div class="statuses">
        <div class="status">
          <input type="radio" id="one" value="1" v-model="currentStatus">
          <label for="one">Опубликовано</label>
        </div>
        <div class="status">
          <input type="radio" id="two" value="2" v-model="currentStatus">
          <label for="two">Проверяется</label>
        </div>
        <div class="status">
          <input type="radio" id="three" value="3" v-model="currentStatus">
          <label for="three">Черновик</label>
        </div>
        <div class="status">
          <input type="radio" id="four" value="4" v-model="currentStatus">
          <label for="four">Снято</label>
        </div>
        <div class="status">
          <input type="radio" id="five" value="5" v-model="currentStatus">
          <label for="five">Отклонено</label>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="modal_btn" @click="send"> Отправить </div>
    </div>
  </div>
</template>

<script>
import { moderationCreateReason, moderationUpdateStatus } from '~/services/api'

export default {
  props: {
    id: { type: Number, defualt: null },
  },

  data() {
    return {
      text: '',
      maxText: 300,
      currentStatus: null,
    }
  },

  computed: {
    lengthText() {
      return this.text.length
    },
    selectedStatus() {
      return (this.currentStatus === null) ? +this.$route.query.statuses : +this.currentStatus
    },
  },

  methods: {
    async send() {
      if(this.text === '' && (+this.selectedStatus !== 1)) {
        this.text = 'Причина не указана'
      }
      if(+this.selectedStatus !== 1) {
        await moderationCreateReason({
          text: this.text,
          id_entry: this.id,
          type: this.$route.query.type,
          id_user: this.$store.state.auth.user.id,
        })
      }
      if(+this.$route.query.statuses !== +this.selectedStatus) {
        await moderationUpdateStatus({
          id: +this.id,
          type: this.$route.query.type,
          id_status: +this.selectedStatus,
        })
      }
      this.$store.commit('moderation/SET_UPDATE_COUNT', {
        id: +this.id,
        type: this.$route.query.type,
        oldStatus: +this.$route.query.statuses,
        newStatus: +this.selectedStatus,
      })
      this.$store.commit('moderation/SET_UPDATE_CONTENT', {
        id: +this.id,
        type: this.$route.query.type,
        oldStatus: +this.$route.query.statuses,
        newStatus: +this.selectedStatus,
      })
    },
  },
}
</script>

<style lang="scss">
  @include modal_window;
  .limit {
    font-weight: 300;
    font-size: 0.9rem;
  }
  .modal {
    .main {
      .statuses {
        display: flex;
        margin: 10px 0;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        .status {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          align-items: center;
          margin-right: 12px;
          &:last-of-type {
            margin-right: 0;
          }
          input {
            margin-right: 4px;
          }
          input,
          label {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>