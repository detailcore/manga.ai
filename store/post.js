import {
  postGetByAlias,
  relatedGetById,
  chaptersGetById,
} from '~/services/api'

export const state = () => ({
  post: [],
  chapters: [],
  similars: [],
  idByRelated: 0,
  idByChapter: 0,
  relatedsAndSimilars: [],
})

export const mutations = {
  SET_POST(state, payload) {
    state.post = payload
  },
  SET_CHAPTERS(state, payload) {
    state.idByChapter = payload.id
    state.chapters = payload.res
  },
  SET_RELATED(state, payload) {
    state.idByRelated = payload.id
    state.relatedsAndSimilars = payload.data
  },
  SET_COMM_CNT({ post }, payload) {
    post.comment_count = payload
  },
  SET_RATING(state, payload) {
    if(payload.oldRate === null && +payload.newRate !== 0) {
      state.post.rating.amount++
      state.post.rating.your = +payload.newRate
      state.post.rating[`star_count${+payload.newRate}`]++
    }
    if(payload.oldRate !== null && +payload.newRate !== 0) {
      state.post.rating[`star_count${+payload.oldRate}`]--
      state.post.rating[`star_count${+payload.newRate}`]++
      state.post.rating.your = +payload.newRate
    }
    if(+payload.newRate === 0) {
      state.post.rating.amount--
      state.post.rating.your = null
      state.post.rating[`star_count${+payload.oldRate}`]--
    }

    let sum = 0
    for (let i = 1; i <= 10; i++) { // 10 - пятизвёздочный
      let el = state.post.rating[`star_count${i}`]
      sum += (el * i)
    }
    state.post.rating.avg = (sum / state.post.rating.amount).toFixed(4)
  },
}

export const actions = {
  async FETCH_POST({ commit }, params) {
    const res = await postGetByAlias(params)
    commit('SET_POST', res)
  },
  async FETCH_CHAPTERS({ commit }, { id, sort, page }) {
    const res = await chaptersGetById(id, sort, page)
    commit('SET_CHAPTERS', {res, id})
  },
  async FETCH_RELATED({ commit }, params) {
    const res = await relatedGetById(params)
    commit('SET_RELATED', { data: res, id: params })
  },
}

export const getters = {
  GET_POST(state) {
    return state.post
  },
  GET_POST_ID(state) {
    return state.post.id
  },
  GET_CHAPTERS(state) {
    return state.chapters
  },
  GET_RELATED(state) {
    return state.relatedsAndSimilars
  },
}
