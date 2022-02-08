import { getComments, } from '~/services/api'
import { hierarchical, findComment } from '~/services/util'

export const state = () => ({
  total: 0,
  page: null,
  comments: [],
  pagination: null,
  writeComment: {
    id: null,
    value: false,
  },
})
  
export const mutations = {
  SET_WRITE_COMMENT(state, payload) {
    state.writeComment = payload
  },
  SET_COMMENTS(state, { comments, total, pagination }) {
    comments.forEach(comment => {
      comment.replies = hierarchical(comment.replies, comment.id)
    })

    state.total = total
    state.comments = comments
    state.pagination = pagination
    state.page = pagination.current_page
  },
  SET_ADD_COMMENT(state, payload) {
    ++state.total
    if (payload.parent_id) {
      const parent = findComment(state.comments, payload.parent_id)
      if (parent) {
        parent.replies.unshift(payload)
      }
    } else {
      state.comments.unshift(payload)
    }
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
      const comments = await getComments(params)
      commit('SET_COMMENTS', comments)

    } catch (err) {
      console.log(err)
    }
  },
}

export const getters = {
  GET_WRITE_COMMENT(state) {
    return state.writeComment
  },
  GET_COMMENTS(state) {
    return state.comments
  },
}