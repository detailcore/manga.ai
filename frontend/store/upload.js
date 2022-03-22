// import { createMangaGetInfo, createSearchTeam } from '~/services/api'

export const state = () => ({
  pages: [],
})
  
export const mutations = {
  SET_UPLOAD_PAGES(state, file) {
    state.pages.push(file)
  },
  SET_UPLOAD_NUM_PAGE(state, { num, name }) {
    for (const page of state.pages) {
      if(page.name === name) {
        page.page = +num
      }
    }
  },
  SET_UPLOAD_REMOVE_PAGE(state, index) {
    state.pages.splice(index, 1)
  },
  SET_UPLOAD_REMOVE_ALLPAGE(state) {
    state.pages = []
  },
}

export const actions = {
  // async FETCH_INFO({ commit }) {
  //   const res = await createMangaGetInfo()
  //   commit('SET_INFO', res)
  // },
  // async FETCH_CHAPTER_TEAMS({ commit }) {
  //   const res = await createSearchTeam()
  //   commit('SET_CHAPTER_TEAMS', res)
  // },
}

export const getters = {
  GET_UPLOAD_PAGES(state) {
    return state.pages
  },
}