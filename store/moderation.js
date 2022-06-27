import { moderationGetCount, moderationGetContent } from '~/services/api'

export const state = () => ({
  count: {},
  content: [],
  pagination: {
    pageMax: 0,
    pageCurrent: 1,
    links: [],
  }
})

export const mutations = {
  SET_COUNT(state, payload) {
    state.count = payload
  },
  SET_CONTENT(state, payload) {
    state.content = payload
  },
  SET_REMOVE_CONTENT(state, id) {
    state.content = state.content.filter(item => item.id !== id)
  },
  SET_PAGINATION(state, { current_page, last_page, links }) {
    state.pagination.pageMax = last_page
    state.pagination.pageCurrent = current_page
    links.shift() // удаляем первый элемент массива
    links.pop() // удаляем последний элемент массива
    state.pagination.links = links
  },
  SET_PAGE(state, payload) {
    state.pagination.pageCurrent = payload
  },
  SET_UPDATE_COUNT(state, { id, type, oldStatus, newStatus }) {
      state.count[type][oldStatus] -= 1
      state.count[type][newStatus] += 1
  },
  SET_UPDATE_CONTENT(state, { id, type, oldStatus, newStatus }) {
    if(oldStatus !== newStatus) {
      state.content = state.content.filter(item => item.id !== id)
    }
  },
}

export const actions = {
  async FETCH_COUNT({ commit }) {
    const res = await moderationGetCount()
    commit('SET_COUNT', res)
  },
  async FETCH_CONTENT({ commit }, { type, status, page }) {
    const {
      data,
      current_page,
      last_page,
      links
    } = await moderationGetContent(type, status, page)
    commit('SET_CONTENT', data)
    commit('SET_PAGINATION', { current_page, last_page, links })
  },
}

export const getters = {
  GET_COUNT(state) {
    return state.count
  },
  GET_CONTENT(state) {
    return state.content
  },
  GET_PAGINATION(state) {
    return state.pagination
  },
}
