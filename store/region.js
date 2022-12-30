export const state = () => ({
  header: {
    isOpenLogin:false,
  }
})

export const mutations = {
  SET_OPEN_LOGIN(state, payload) {
    state.header.isOpenLogin = payload
  },
}

// export const actions = {
// }

export const getters = {
  GET_OPEN_LOGIN(state) {
    return state.header.isOpenLogin
  },
}
