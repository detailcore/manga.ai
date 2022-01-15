import { 
    chapterGetById,
    chapterListGetById,
  } from '~/services/api'
  
  export const state = () => ({
    alias: null,
    chapter: [],
    pageMax: 0,
    pageCurrent: 1,
    chapterList: [],
    readerSetting: {
      isOpen: false,
      mode: '',
    },
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
    SET_PAGE_CURRENT(state, payload) {
      state.pageCurrent = payload
    },
    SET_PAGE_MAX(state, payload) {
      state.pageMax = payload
    },
    SET_CHAPTER_LIST(state, payload) {
      state.chapterList = payload
    },
    SET_ALIAS(state, payload) {
      state.alias = payload
    },
    SET_MODE(state, payload) {
      state.readerSetting.mode = String(payload)
    },
    SET_OPEN_SETTING(state, payload) {
      state.readerSetting.isOpen = payload
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
      try {
        const res = await chapterListGetById(params)
        commit('SET_CHAPTER_LIST', res)
  
      } catch (err) {
        console.log(err)
      }
    },
  }
  
  export const getters = {
    GET_POST(state) {
      if(state.chapter.post) return state.chapter.post
      return null
    },
    GET_CHAPTER_NAME(state) {
      if(state.chapter.name) return state.chapter.name
      return null
    },
    GET_CHAPTER(state) {
      return state.chapter
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
    GET_PAGE_MAX(state) {
      return state.pageMax
    },
    GET_TEAMS_CURREN(state) {
      if(state.chapter.teams) return state.chapter.teams
      return null
    },
    GET_CHAPTER_CURRENT(state) {
      return { 
        id: state.chapter.id,
        volume: state.chapter.volume,
        chapter: state.chapter.chapter,
      }
    },
    GET_CHAPTER_LIST(state) {
      return state.chapterList
    },
    GET_MODE(state) {
      return state.readerSetting.mode
    },
    GET_OPEN_SETTING(state) {
      return state.readerSetting.isOpen
    },
  }