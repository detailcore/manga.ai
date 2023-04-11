import { getUserById } from '~/services/api'

export const state = () => ({
  user: {},
  auth: {
    login: '',
    password: ''
  },
  roles: [
    { id: 1, name: 'Администратор' },
    { id: 2, name: 'Модератор' },
    { id: 3, name: 'Переводчик' },
    { id: 4, name: 'Доверенный' },
    { id: 5, name: 'Пользователь' },
  ],
})

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_AUTH_LOG(state, payload) {
    state.auth.login = payload
  },
  SET_AUTH_PASS(state, payload) {
    state.auth.password = payload
  },
  SET_COVER(state, payload) {
    state.user.cover = payload
  },
  SET_COVER_BG(state, payload) {
    state.user.cover_bg = payload
  },
  SET_USER_INFO({ user }, { name, email, gender, site, residence, about }) {
    if(user.name != name) user.name = name
    if(user.email != email) user.email = email
    if(user.gender != gender) user.gender = gender
    if(user.site != site) user.site = site
    if(user.residence != residence) user.residence = residence
    if(user.about != about) user.about = about
  },
}

export const actions = {
  async FETCH_USER({ commit }, id) {
    const res = await getUserById(id)
    commit('SET_USER', res)
  },
}

export const getters = {
  GET_USER(state) {
    return state.user
  },
  GET_AUTH(state) {
    return state.auth
  },
}
