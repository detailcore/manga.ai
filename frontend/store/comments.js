import { getComments, } from '~/services/api'

export const state = () => ({
  comments: [],
  id_root: null,
  id_parent: null,
})
  
export const mutations = {
  SET_COMMENTS(state, payload) {
    state.comments = payload
  },
  SET_COMMENT_SCORE(state, payload) {
    state.comments.forEach(item => {
      if(item.id == payload.id) {
        switch (payload.str) {
          case 'up': ++item.upvotes
          break;
          case 'down': ++item.downvotes
          break;
        }
      }
    })
  },
}

export const actions = {
  async FETCH_COMMENTS({ commit }, params) {
    try {
      const { comments } = await getComments(params)
      commit('SET_COMMENTS', comments)

    } catch (err) {
      console.log(err)
    }
  },
}

export const getters = {
  GET_COMMENTS(state) {
    return state.comments
  },
}