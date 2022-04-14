import { 
  libraryInit,
  createMangaGetInfo,
} from '~/services/api'

export const state = () => ({
  posts: [],
  filter: [],
  lastPage: false,
})
  
export const mutations = {
  SET_POSTS(state, { data, add }) {
    // data = Array.isArray(data) ? data : Object.values(data)
    let tmp = data.filter(item => {
      item.title = item.title_rus ? item.title_rus : (item.title_eng ? item.title_eng : '')
      item.cover = item.cover ? item.cover.mid + '.webp' : ''
      item.type = item.type ? item.type.name : ''
      delete item.title_rus
      delete item.title_eng
      return item
    })

    if(add) {
      tmp.filter(item => {
        state.posts.push(item)
      })
      
    } else {
      state.posts = tmp
    }
  },
  SET_LAST_PAGE(state, payload) {
    state.lastPage = payload
  },
  SET_FILTER(state, payload) {
    state.filter = payload
  },
  SET_FILTER_CLEAR(state) {
    for (const key of Object.keys(state.filter)) {
      state.filter[key].filter(item => {
        if(item.value !== 0) {
          item.value = 0
        }
      })
    }
  },
  SET_FILTER_SELECTED(state, { id, type, value }) {
    state.filter[type].filter(item => {
      if(item.id === id) {
        item.value = value
      }
    })
  },
}

export const actions = {
  async FETCH_POSTS({ commit }) { // первоначальная загрузка каталога
    const res = await libraryInit()
    commit('SET_POSTS', { data: res, add: false })
  },
  async FETCH_FILTER({ commit }) {
    const res = await createMangaGetInfo() // начальные данный для фильтрации
    commit('SET_FILTER', res)
  },
}

export const getters = {
  GET_POSTS(state) {
    return state.posts
  },
  GET_FILTER(state) {
    return state.filter
  },
  GET_LAST_PAGE(state) {
    return state.lastPage
  },
}