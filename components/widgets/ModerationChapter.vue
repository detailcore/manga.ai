<template>
  <div class="moderation_chapter">
    <div class="chapter" v-if="item.post">

      <div class="chapter__item">
        <Nuxt-link class="name_title" :to="aliasTitle"> {{ nameTitle }} </Nuxt-link>
        <mdi-MenuRight title="" />
        <Nuxt-link class="name_chapter" :to="aliasChapter"> Том {{ item.volume }} Глава {{ item.chapter }} {{ nameChapter }} </Nuxt-link>
      </div>

      <div class="chapter__info">
        <Nuxt-link class="name_user" :to="'/user/' + item.id_user"> {{ userName }} </Nuxt-link>
        <div class="date">
          {{ updateTime }}
        </div>
        <div class="btn" :class="{ active: isOpenStatus }" @click.prevent="openEditStatus(item.id)">
          <mdi-ExclamationThick />
        </div>
        <div class="btn" @click.prevent="editChapter">
          <mdi-Pencil />
        </div>
        <div class="btn" v-if="$route.query.statuses == 5" @click.prevent="removeChapter">
          <mdi-TrashCan />
        </div>
      </div>
    </div>

    <WidgetsModerationStatus v-if="isOpenStatus" :id="item.id" />

  </div>
</template>

<script>
import { notify, showDate } from '~/services/util';
import { editRemoveAllChapter } from '~/services/api';

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
        return showDate(time)
        // return this.$moment(time).fromNow()
      }
      return 'Когда-то...'
    },
  },

  methods: {
    async removeChapter() {
      let res = await editRemoveAllChapter(this.item.id)
      this.$notify(notify(res))
      if(res.status === 'ok') {
        this.$store.commit('moderation/SET_REMOVE_CONTENT', this.item.id)
      }
    },
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
    .name_user,
    .name_title,
    .name_chapter {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .name_user {
      width: 70px;
      text-align: right;
    }
    &__item {
      display: flex;
      padding-left: 8px;
      align-items: center;
      overflow: hidden;
      min-width: 210px;
      max-width: calc(100% - 270px);
    }
    &__info {
      display: flex;
      align-items: center;
      max-width: 270px;
      .date {
        width: 65px;
        font-size: .75rem;
        font-weight: 200;
        text-align: right;
      }
      .btn {
        width: 32px;
        height: 32px;
        &.active {
          &:before {
            opacity: 0.1;
          }
        }
      }
    }
  }
}
</style>
