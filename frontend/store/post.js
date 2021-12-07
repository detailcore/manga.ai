import { 
  postGetById, 
  relatedGetById,
} from '~/services/api'

export const state = () => ({
  id: 0,
  post: [],
  relateds: [],
  similars: [],
})
  
export const mutations = {
  SET_POST(state, payload) {
    state.post = payload
  },
  SET_RELATED(state, payload) {
    state.id = payload.id
    state.relateds = payload.data
  },
}

export const actions = {
  async FETCH_POST({ commit }, params) {
    try {
      console.log(753)
      const res = await postGetById(params)
      commit('SET_POST', res)

    } catch (err) {
      console.log(err)
    }
  },
  async FETCH_RELATED({ commit }, params) {
    try {
      console.log(123)
      const res = await relatedGetById(params)
      commit('SET_RELATED', { data: res, id: params })

    } catch (err) {
      console.log(err)
    }
  },
}

export const getters = {
  GET_POST(state) {
    return state.post
  },
  GET_RELATED(state) {
    return state.relateds
  },
}