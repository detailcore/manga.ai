import { 
  getBookmark,
  createBookmark,
  deleteBookmark,
  getBookmarksList,
  getUserBookmarks,
} from '~/services/api'

export const state = () => ({
  bookmarks: [],
  selectedBookmark: {},
  userBookmarkPosts: [],
})
  
export const mutations = {
  SET_BOOKMARK(state, payload) {
    state.selectedBookmark = payload
  },
  SET_CREATE_BOOKMARK(state, payload) {
    state.selectedBookmark = {} // преобразуем строку в объект
    state.bookmarks.filter(item => {
      if(+item.id === +payload.id_bookmark) {
        state.selectedBookmark.id = +payload.id
        state.selectedBookmark.name = item.name
      }
    })
  },
  SET_BOOKMARK_LIST(state, payload) {
    state.bookmarks = payload
  },
  SET_BOOKMARK_DELETE(state, payload) {
    state.selectedBookmark = payload
  },
  SET_USER_BOOKMARKS(state, payload) {
    if(payload.data) {
      payload.data.forEach(item => {
        item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
        item.cover = item.cover ? item.cover.mid : ''
        item.type = item.type ? item.type.name : ''
        delete item.title_rus
        delete item.title_eng
        return item
      })
    }
    state.userBookmarkPosts = payload
  },
}

export const actions = {
  async FETCH_BOOKMARK({ commit }, data) { // текущая закладка
    const res = await getBookmark(data)
    commit('SET_BOOKMARK', res)
  },
  async FETCH_BOOKMARK_LIST({ commit }) { // список закладок
    const res = await getBookmarksList()
    commit('SET_BOOKMARK_LIST', res)
  },
  async FETCH_CREATE_BOOKMARK({ commit }, data) { // создать/изменить закладку
    const res = await createBookmark(data)
    commit('SET_CREATE_BOOKMARK', res)
  },
  async FETCH_DELETE_BOOKMARK({ commit }, id) {
    const res = await deleteBookmark(id)
    if(res === 1) {
      commit('SET_BOOKMARK_DELETE', '')
    }
  },
  async FETCH_USER_BOOKMARKS({ commit }, { id, type }) {
    const res = await getUserBookmarks(id, type)
    commit('SET_USER_BOOKMARKS', res)
  },
}

export const getters = {
  GET_BOOKMARK(state) {
    return state.selectedBookmark
  },
  GET_BOOKMARK_LIST(state) {
    return state.bookmarks
  },
  GET_USER_BOOKMARKS(state) {
    return state.userBookmarkPosts
  },
}