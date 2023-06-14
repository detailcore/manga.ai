import { complaintCreate } from '~/services/api'

  export const state = () => ({
    complaint: {
      text: '',
      id_user: 0,
      id_sender: 0,
      id_content: 0,
      type: '',
      content: '',
      cause: '',
      link: '',
    },
    complaintIsOpen: {
      id: null,
      value: false,
    },
  })

  export const mutations = {
    SET_COMPLAINT(state, payload) {
      state.complaint = payload
    },
    SET_COMPLAINT_OPEN(state, payload) {
      state.complaintIsOpen = payload
    },
    SET_ID_COMPLAINT(state, payload) {
      state.oneId = payload
    },
  }

  export const actions = {
    async FETCH_COMPLAINT({ commit }, params) {
      const res = await complaintCreate(params)
      commit('SET_COMPLAINT', {
        text: res.text,
        cause: res.cause,
        link: res.link,
        type: res.type,
        id_user: res.id_user,
        id_sender: res.id_sender,
        id_content: res.id_content,
        content: res.content,
      })
      commit('SET_COMPLAINT_OPEN', false)
    },
  }

  export const getters = {
    GET_COMPLAINT_OPEN(state) {
      return state.complaintIsOpen
    },
  }
