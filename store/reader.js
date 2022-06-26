import {
    getComments,
    chapterGetById,
    chapterListGetById,
  } from '~/services/api'

  export const state = () => ({
    alias: null,
    remove: [],
    chapter: [],
    pageCurrent: 1,
    chapterList: [],
    chapterListSelected: [],
    pageNumbers: [],
    readerSetting: {
      mode: '',
      isOpen: false,
      comments: '',
      openComments: false,
    },
    duplicateIdPages: [],
  })

  export const mutations = {
    SET_CHAPTER(state, payload) {
      state.chapter = payload

      let teams = state.chapter.teams
      if(teams.length > 0) {
        teams.forEach(item => {
          item.cover = this.$config.urlCoverTeam + item.id +'/'+ item.cover
        })
      }
    },
    SET_RESET_PAGE(state) {
      state.pageCurrent = 1
    },
    SET_PAGE_CURRENT_VERTICALLY(state, num) {
      // if(state.readerSetting.comments === 'show' && // вкл отображение
      if(state.pageCurrent !== num &&               // страница не одна и та же
         state.readerSetting.openComments) {        // открыто окно коментов
        this.dispatch('reader/FETCH_CHAPTER_COMMENTS', num) // хз на сколько это правильно
      }
      state.pageCurrent = num
    },
    SET_PAGE_CURRENT(state, { num, id, alias }) {
      // if(state.readerSetting.comments === 'show') {
        this.dispatch('reader/FETCH_CHAPTER_COMMENTS', num) // хз на сколько это правильно
      // }

      state.pageCurrent = num
      this.$router.push({  // добавляем хеш в url при перелистывании страницы
        hash:"#" + num,
        params: { id: `ch${id}`, alias: alias },
      })
    },
    SET_PAGE_NUMBERS(state) {
      let numbers = [],
          pages = state.chapter.pages;
      pages.forEach(item => numbers.push(item.page))
      state.pageNumbers = [...new Set(numbers)] // удаляет дубликаты
    },

    SET_CHAPTER_LIST(state, payload) {
      state.chapterList = payload
    },

    SET_ALIAS(state, payload) {
      state.alias = payload
    },
    SET_SETTING_MODE(state, payload) {
      state.readerSetting.mode = String(payload)
    },
    SET_SETTING_COMMENTS(state, payload) {
      state.readerSetting.comments = String(payload)
    },
    SET_OPEN_SETTING(state, payload) {
      state.readerSetting.isOpen = payload
    },
    SET_OPEN_COMMENTS(state, payload) {
      state.readerSetting.openComments = payload
    },
    SET_CHAPTER_PAGE_EDIT(state, payload) {
      if(payload.ids.length > 1) {
        state.chapter.pages.forEach(item => {
          payload.ids.forEach(id => {
            if(+id === +item.id) {
              item.page = payload.num
            }
          })
        })
      } else {
        state.chapter.pages.forEach(item => {
          if(+payload.ids[0] === +item.id) {
            item.page = payload.num
          }
        })
      }
    },
    SET_CHAPTER_PAGE_DUPLICATE_STATUS(state, { ids }) {
      state.duplicateIdPages = ids
    },
    SET_EDIT_CHAPTER_VOLUME(state, payload) {
      state.chapter.volume = payload
    },
    SET_EDIT_CHAPTER_CHAPTER(state, payload) {
      state.chapter.chapter = payload
    },
    SET_EDIT_CHAPTER_NAME(state, payload) {
      state.chapter.name = payload
    },
    SET_EDIT_CHAPTER_STATUS(state, num) {
      state.chapter.id_status = num
    },
    SET_EDIT_CHAPTER_TEAMS(state, payload) {
      state.chapter.teams = payload
    },
    SET_EDIT_CHAPTER_REMOVE_PAGE(state, ids) {
      if(!state.chapter.remove) { // создать если нету
        state.chapter.remove = []
      }
      ids.forEach(id => {
        state.chapter.pages.forEach(item => {
          // массив для отправки на сервер для удаления
          if(+id === +item.id) {
            state.chapter.remove.push(+id)
          }
        })
        // удаление из массива
        state.chapter.pages = state.chapter.pages.filter(item => item.id !== id)
      })
    },
  }

  export const actions = {
    async FETCH_CHAPTER({ commit }, params) {
      try {
        const res = await chapterGetById(params)
        commit('SET_CHAPTER', res)
      } catch (err) {
        console.log(err)
      }
    },
    async FETCH_CHAPTER_LIST({ commit }, params) {
      const res = await chapterListGetById(params)
      commit('SET_CHAPTER_LIST', res)
    },
    async FETCH_CHAPTER_COMMENTS({ commit, state }, pageNum) {
        const comments = await getComments({
          type: 'reader',
          page_id: pageNum,
          commentable_id: state.chapter.id,
        })
        this.commit('comments/SET_COMMENTS', comments)
    },
  }

  export const getters = {
    GET_POST(state) {
      if(state.chapter.post) return state.chapter.post
      return null
    },
    GET_CHAPTER(state) {
      return state.chapter
    },
    GET_CHAPTER_NAME(state) {
      if(state.chapter.name) return state.chapter.name
      return null
    },
    GET_CHAPTER_CURRENT(state) {
      return {
        id: state.chapter.id,
        volume: state.chapter.volume,
        chapter: state.chapter.chapter,
        teams: state.chapter.teams ? state.chapter.teams.map(item => item.id) : [],
      }
    },
    GET_CHAPTER_LIST(state) {
      return state.chapterList
    },
    GET_CHAPTER_PAGES(state) {
      return state.chapter.pages
    },
    GET_ID_POST(state) {
      if(state.chapter.post) return state.chapter.post.id
      return null
    },
    GET_ID_CHAPTER(state) {
      if(state.chapter.id) return state.chapter.id
      return null
    },
    GET_PAGE_CURRENT(state) {
      return state.pageCurrent
    },
    GET_PAGE_NUMBERS(state) {
      return state.pageNumbers
    },
    GET_TEAMS_CURREN(state) {
      if(state.chapter.teams) return state.chapter.teams
      return null
    },
    GET_MODE(state) {
      return state.readerSetting.mode
    },
    GET_SETTING_COMMENTS(state) {
      return state.readerSetting.comments
    },
    GET_OPEN_SETTING(state) {
      return state.readerSetting.isOpen
    },
    GET_OPEN_COMMENTS(state) {
      return state.readerSetting.openComments
    },
  }
