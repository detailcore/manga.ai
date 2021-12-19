import { 
    chapterGetById,
  } from '~/services/api'
  
  export const state = () => ({
    chapter: [],
    pageCurrent: 1,
    pageMax: 0,
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
  }
  
  export const getters = {
    GET_POST(state) {
      return state.chapter.post
    },
    GET_CHAPTER_NAME(state) {
      return state.chapter.name
    },
    GET_CHAPTER(state) {
      return state.chapter
    },
    GET_PAGE_CURRENT(state) {
      return state.pageCurrent
    },
    GET_PAGE_MAX(state) {
      return state.pageMax
    },
    GET_TEAMS_CURREN(state) {
      return state.chapter.teams
    },
  }