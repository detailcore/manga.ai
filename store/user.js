import { getUserById } from '~/services/api'

export const state = () => ({
  user: [],
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
  SET_COVER(state, payload) {
    state.user.cover = payload
  },
  SET_COVER_BG(state, payload) {
    state.user.cover_bg = payload
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
}
