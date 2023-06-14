import {
  teamGetById,
  teamRestore,
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
  SET_TEAM_UPDATE(state, payload) {
    let { cover, name, name_alt, description, link_site, link_vk, link_discord, } = payload
    state.team.cover.bg = cover.bg
    state.team.cover.avatar = cover.avatar
    state.team.name = name
    state.team.name_alt = name_alt
    state.team.description = description
    state.team.link_site = link_site
    state.team.link_vk = link_vk
    state.team.link_discord = link_discord
  },
  SET_TEAM_POSTS(state, payload) {
    state.teamPosts = payload
  },
  SET_UNDO_REMOVE(state, payload) {
    if(payload) state.team.deleted_at = null
  },
}

export const actions = {
  async FETCH_UNDO_REMOVE_TEAM({ commit }, id) {
    const res = await teamRestore(id)
    commit('SET_UNDO_REMOVE', res)
  },
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
