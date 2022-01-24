import { 
  getUserById,
} from '~/services/api'

export const state = () => ({
  user: [],
})
  
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_COVER(state, payload) {
    state.user.cover = payload
  },
  SET_COVER_BG(state, payload) {
    state.user.cover_bg = payload
  },
}

export const actions = {
  async FETCH_USER({ commit }, id) {
    try {
      const res = await getUserById(id)
      commit('SET_USER', res)

    } catch (err) {
      console.log(err)
    }
  },
}

export const getters = {
  GET_USER(state) {
    return state.user
  },
}