import { createMangaGetInfo } from '~/services/api'

export const state = () => ({
  info: null,
})
  
export const mutations = {
  SET_INFO(state, payload) {
    state.info = payload
  },
}

export const actions = {
  async FETCH_INFO({ commit }) {
    const res = await createMangaGetInfo()
    commit('SET_INFO', res)
  },
}

export const getters = {
  GET_INFO(state) {
    return state.info
  },
}