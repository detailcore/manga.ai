import { 
  getHomeNew,
  getHomeTop,
  getHomeLatestData,
} from '~/services/api'

export const state = () => ({
  new: [],
  top: [],
  latest: [],
  created_at: 0, // время запроса, ms
  nextPageUrl: '',
})
  
export const mutations = {
  SET_LATEST(state, payload) {
    let data = payload.data.filter(item => {
      item.type = item.type ? item.type.name : ''
      item.cover = item.cover ? item.cover.low + '.webp' : ''
      item.adult_rank = item.adult_rank ? item.adult_rank.name : ''
      item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
      delete item.title_rus
      delete item.title_eng
      return item
    })

    if(state.latest.length === 0) {
      state.latest = data
    } else {
      state.latest = [...state.latest, ...data]
    }
    state.nextPageUrl = payload.next_page_url
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
  async FETCH_LATEST({ commit, state }) {
    const { data, next_page_url } = await getHomeLatestData(state.nextPageUrl)
    commit('SET_LATEST', { data, next_page_url })
  },
  async FETCH_NEW({ commit }) {
    const res = await getHomeNew()
    commit('SET_NEW', res)
  },
  async FETCH_TOP({ commit }) {
    const res = await getHomeTop()
    commit('SET_TOP', res)
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