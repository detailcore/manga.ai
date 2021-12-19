import { 
  teamGetById,
  teamPostsGetById,
} from '~/services/api'

export const state = () => ({
  team: [],
  teamPosts: {},
})
  
export const mutations = {
  SET_TEAM(state, payload) {
    state.team = payload
  },
  SET_TEAM_POSTS(state, payload) {
    state.teamPosts = payload
  },
}

export const actions = {
  async FETCH_TEAM({ commit }, params) {
    try {
      const res = await teamGetById(params)
      commit('SET_TEAM', res)

    } catch (err) {
      console.log(err)
    }
  },
  async FETCH_TEAM_POSTS({ commit }, params) {
    try {
      const res = await teamPostsGetById(params)
      commit('SET_TEAM_POSTS', res)

    } catch (err) {
      console.log(err)
    }
  },
}

export const getters = {
  GET_TEAM(state) {
    return state.team
  },
  GET_TEAM_POSTS(state) {
    return state.teamPosts
  },
}