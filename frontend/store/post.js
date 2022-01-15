import { 
  setComplaint,
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
  complaint: {
    text: '',
    cause: 0, //причина
    route: '',
    isOpen: false,
  }
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
  SET_COMPLAINT(state, payload) {
    state.complaint = payload
  },
  SET_COMPLAINT_OPEN(state, payload) {
    state.complaint.isOpen = payload
  },
}

export const actions = {
  async FETCH_POST({ commit }, params) {
    try {
      const res = await postGetByAlias(params)
      commit('SET_POST', res)

    } catch (err) {
      console.log(err)
    }
  },
  async FETCH_CHAPTERS({ commit }, { id, sort, page }) {
    try {
      const res = await chaptersGetById(id, sort, page)
      commit('SET_CHAPTERS', {res, id})

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
  async FETCH_COMPLAINT({ commit }, params) {
    console.log(871)
    console.log('params => ', params)
    // const res = await setComplaint(params)
    // console.log(res)
    // commit('SET_COMPLAINT', {
    //   text: res.text,
    //   cause: res.cause,
    //   route: res.route,
    // })
  },
}

export const getters = {
  GET_POST(state) {
    return state.post
  },
  GET_CHAPTERS(state) {
    return state.chapters
  },
  GET_RELATED(state) {
    return state.relatedsAndSimilars
  },
  GET_COMPLAINT_OPEN(state) {
    return state.complaint.isOpen
  },
}