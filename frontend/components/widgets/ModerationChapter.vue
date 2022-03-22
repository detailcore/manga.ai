<template>
  <div class="moderation_chapter">
    <div class="chapter" v-if="item.post">

      <div class="chapter__item">
        <Nuxt-link :to="aliasTitle"> {{ nameTitle }} </Nuxt-link>
        <mdi-MenuRight title="" />
        <Nuxt-link :to="aliasChapter"> Том {{ item.volume }} Глава {{ item.chapter }} {{ nameChapter }} </Nuxt-link>
      </div>

      <div class="chapter__info">
        <Nuxt-link :to="'/user/' + item.id_user"> {{ userName }} </Nuxt-link>
        <div class="date">
          {{ updateTime }}
        </div>
        <div class="btn" :class="{ active: isOpenStatus }" @click.prevent="openEditStatus(item.id)">
          <mdi-ExclamationThick />
        </div>
        <div class="btn" @click.prevent="editChapter">
          <mdi-Pencil />
        </div>
      </div>
    </div>

    <WidgetsModerationStatus v-if="isOpenStatus" :id="item.id" />

  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      isOpenStatus: false,
    }
  },

  computed: {
    nameTitle() {
      return this.item.post ? this.item.post.title_rus : this.item.post.title_eng
    },
    nameChapter() {
      return this.item.name ? ' - ' + this.item.name : ''
    },
    aliasTitle() {
      return this.item.post ? '/manga/' + this.item.post.alias : null
    },
    aliasChapter() {
      return this.aliasTitle ? this.aliasTitle +'/ch'+ this.item.id : null
    },
    userName() {
      return this.item.user ? this.item.user.name : ''
    },
    updateTime() {
      let time = this.item.updated_at
      if(time != null) {
        let timeReplace = time.replace('.000000Z', '')
        return this.$moment(timeReplace).fromNow()
      }
      return 'Когда-то...'
    },
  },

  methods: {
    openEditStatus(id) {
      if(id === this.item.id) {
        this.isOpenStatus = !this.isOpenStatus
      }
    },
    editChapter() {
      this.$router.push({
        path: `${this.aliasChapter}/edit`
      })
    },

    async removeAll() {
      let res = await editRemoveAllChapter(this.chapter.id)

      if(res.status === 'ok') {
        this.$router.push({
          name: 'manga-alias',
          params: {
            alias: this.$route.params.alias,
          }
        })
        this.$notify({
          text: res.msg,
          type: 'success',
        })
      } else {
        this.$notify({
          text: res.msg,
          type: 'error',
        })
      }
    },
  },
};
</script>

<style lang="scss">
.moderation_chapter {
  margin: 8px 0;
  .chapter {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    &__item {
      display: flex;
      padding-left: 8px;
      align-items: center;
    }
    &__info {
      display: flex;
      align-items: center;
      .date {
        width: 65px;
        font-size: .85rem;
        font-weight: 200;
        text-align: right;
      }
      .btn.active {
        &:before {
          opacity: 0.1;
        }
      }
    }
  }
}
</style>
