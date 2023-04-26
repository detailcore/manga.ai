<template>
  <div class="profile team">
    <div class="profile__header team">
      <div class="cover" :style="{ backgroundImage: `url(${bgCover})` }">
        <div class="shadow"></div>
        <div class="container user_info">
          <div class="cover__avatar" :style="{ backgroundImage: `url(${avatar})` }"></div>
          <div class="user_line">
            <span class="login">{{ team.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container content_team">
      <div class="contacts">
        <div class="inner">
          <div class="block__title">Контакты</div>
          <div class="links">
            <a :href="team.link_vk" target="_blank" rel="noopener nofollow noreferrer" class="btn" v-show="team.link_vk"> <IconsVk /> </a>
            <a :href="team.link_site" target="_blank" rel="noopener nofollow noreferrer" class="btn" v-show="team.link_site"> <IconsEarth /> </a>
            <a :href="team.link_discord" target="_blank" rel="noopener nofollow noreferrer" class="btn" v-show="team.link_discord"> <IconsDiscord /> </a>
            <span v-show="(team.link_vk == null && team.link_site == null && team.link_discord == null)"> Контакты не указаны </span>
          </div>
          <!-- <div class="block__title">Состав</div> -->
          <!-- <div class="people_team"> -->
            <!-- <span class="no_users" v-show="users.length == 0"> Список пуст <br> (в разработке) </span> -->
            <!-- <Nuxt-link class="people" to="/user/260">
              <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
              <div class="info">
                <span class="login">User_login_1</span>
                <span class="role">Админ_команды</span>
              </div>
            </Nuxt-link>
            <Nuxt-link class="people" to="/user/261">
              <div class="cover" :style="{ backgroundImage: `url(/_nuxt/assets/images/mid_cover.jpg)` }"></div>
              <div class="info">
                <span class="login">User_login_2</span>
                <span class="role">Аплодер</span>
              </div>
            </Nuxt-link> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="content_team__inner">
        <!-- <div class="nav-line">
          <div class="item">Информация</div>
          <div class="item">Обновления</div>
        </div> -->

        <div class="btn__line">
          <Nuxt-link class="btn__line__button" to="" :class="{ 'nuxt-link-exact-active' : page===''}">
            <mdi-ImageText title="Описание" />
            <span>Описание</span>
          </Nuxt-link>
          <Nuxt-link class="btn__line__button" to="?page=posts">
            <mdi-FormatListText title="Переводы" />
            <span>Наши переводы ({{ team.titles }})</span>
          </Nuxt-link>
          <Nuxt-link class="btn__line__button" to="?page=settings" v-if="canEdit">
            <mdi-Cog title="Дополнительные настройки" />
            <span>Настройки</span>
          </Nuxt-link>
        </div>

        <div class="description" v-if="page === ''">
          <div class="block__title">Описание</div>
          <div class="description__text">
            {{ team.description }}
          </div>
          <div class="stat">
            <!-- <div class="item">
              <div class="count">{{ team.likes }}</div>
              <div class="item__text">лукасов</div>
            </div> -->
            <div class="item">
              <div class="count">{{ team.titles }}</div>
              <div class="item__text">тайтлов</div>
            </div>
            <div class="item">
              <div class="count">{{ team.chapters }}</div>
              <div class="item__text">глав</div>
            </div>
          </div>
        </div>

        <LazyTeamPosts v-if="page === 'posts'" />
        <LazyTeamSetting v-if="viewEdit" />
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'

export default {
  head() {
    return {
      title: 'Переводчик ' + this.team.name + ', перевод манги',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Команда переводчика(ов) - ' + this.team.name + '. ' + (this.team.description ? this.team.description.slice(0, 110).replace(/(<([^>]+)>)/ig, '') : '')
        }
      ]
    }
  },

  async asyncData({store, params}) {
    await store.dispatch('team/FETCH_TEAM', params.id)
  },

  data() {
    return {
      users: [],
      descTeam: '',
      maxText: 512,
      tabTwo: false,
      changePassword: {
        current: '',
        new: '',
        reNew: '',
      }
    }
  },
  computed: {
    ...mapGetters('team', { team: 'GET_TEAM' }),

    page(){
      return (this.$route.query.page) ? this.$route.query.page : ''
    },

    lengthText() {
      return this.descTeam.length
    },

    avatar() {
      return this.team.cover.avatar ? (this.$config.urlCoverTeam + this.team.id +'/'+ this.team.cover.avatar + '.webp') : ''
    },
    bgCover() {
      return this.team.cover.bg ? (this.$config.urlCoverTeam + this.team.id +'/'+ this.team.cover.bg + '.webp') : ''
    },
    canEdit() {
      return (this.$store.state.auth.user ? this.$store.state.auth.user.id : false ) == this.team.id_owner ||
              ((this.$store.state.auth.user ? this.$store.state.auth.user.id_role : 0 ) === 1 ||
              (this.$store.state.auth.user ? this.$store.state.auth.user.id_role : 0 ) === 2)
    },
    viewEdit() {
      return this.page === 'settings' && this.canEdit
    },
  },
};
</script>


<style lang="scss">
.profile {
  position: relative;
  min-height: 100vh;
  min-height: calc(100vh - 165px);
  &__header.team {
    .cover {
      height: 330px;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
      .shadow {
        background: linear-gradient(180deg,rgba(6,13,34,0) 40%,rgba(6,13,34,.6));
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
      .user_info {
        height: 100%;
        display: flex;
        position: relative;
        align-items: flex-end;
        .cover__avatar {
          min-width: 200px;
          min-height: 200px;
          border-radius: 6px;
          margin-bottom: -50px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .user_line {
          height: 60px;
          display: flex;
          margin-left: 16px;
          align-items: center;
          flex-direction: row;
          .login {
            font-weight: 600;
            font-size: 1.6rem;
          }
          .settings {
            cursor: pointer;
            margin-left: 8px;
          }
        }
      }
    }
  }
  .content_team {
    display: flex;
    .contacts {
      min-width: 200px;
      margin-top: 50px;
      .inner {
        top: 0;
        position: sticky;
        .links {
          display: flex;
          justify-content: center;
        }
      }

      .people_team {
        display: flex;
        flex-direction: column;
        .no_users {
          text-align: center;
        }
        .people {
          display: flex;
          padding: 4px;
          margin-bottom: 8px;
          align-items: center;
          flex-direction: row;
          position: relative;
          &:hover {
            border-radius: 6px;
            text-decoration: none;
            &:before {
              opacity: 0.1;
            }
          }
          &:before {
            @include before;
          }
          .cover {
            min-width: 36px;
            min-height: 36px;
            margin-right: 12px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
          }
          .info {
            display: flex;
            overflow: hidden;
            flex-direction: column;
            .login {
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
            .role {
              color: #919191;
              font-weight: 300;
              font-size: 0.9rem;
              text-transform: uppercase;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    &__inner {
      width: 100%;
      .block__title {
        padding: 4px 8px;
        background-color: #252525;
      }
      .description {
        display: flex;
        margin: 12px 6px;
        overflow: hidden;
        border-radius: 6px;
        flex-direction: column;
        padding-bottom: 12px;
        border: thin solid rgba(255, 255, 255, 0.12);
        .block__title {
        }
        &__text {
          padding: 4px 8px;
          line-height: 1.5rem;
          white-space: pre-wrap;
        }
        .stat {
          display: flex;
          justify-content: space-evenly;
          .item {
            .count {
              text-align: center;
            }
            &__text {
              color: #919191;
              font-weight: 300;
              text-align: center;
            }
          }
        }
      }

      .btn__line {
        @include btn_line_full;
      }

      .posts {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
}
</style>
