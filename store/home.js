import {
  getHomeAll,
  getHomeMore,
  // getHomeSide,
  getHomeLatestData,
} from '~/services/api'

export const state = () => ({
  new: [],
  top: [],
  latest: [],
  created_at: 0, // время запроса, ms
})

export const mutations = {
  SET_LATEST(state, { data }) {
    const items = data.filter(item => {
      item.type = item.type ? item.type.name : ''
      item.type = item.type == 'Комикс западный' ? 'Комикс' : item.type
      item.cover = item.cover ? item.cover.low : ''
      item.adult_rank = item.adult_rank ? item.adult_rank.name : ''
      item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
      delete item.title_rus
      delete item.title_eng
      return item
    })

    if(state.latest.length === 0) {
      state.latest = items
    } else {
      state.latest = [...state.latest, ...items]
    }
  },
  SET_NEW(state, payload) {
    state.new = payload
  },
  SET_TOP(state, payload) {
    state.top = payload
  },
  SET_TIME(state, payload) {
    state.created_at = payload
  },
}

export const actions = {
  async FETCH_ALL({ commit }) {
    const { latest, side } = await getHomeAll()
    commit('SET_LATEST', { data: latest })
    commit('SET_TOP', side.top_releases)
    commit('SET_NEW', side.new_releases)
  },
  async FETCH_MORE({ commit, state }) {
    const data = await getHomeMore()
    if(data.status == 200) {
      commit('SET_LATEST', { data: data })
    }
  },
}

export const getters = {
  GET_LATEST(state) {
    return state.latest
  },
  GET_NEW(state) {
    return state.new
  },
  GET_TOP(state) {
    return state.top
  },
  GET_TIME(state) {
    return state.created_at
  },
}
