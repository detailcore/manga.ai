import { createMangaGetInfo, createSearchTeam } from '~/services/api'

export const state = () => ({
  info: null,
  chapters: [],
  chapterTeams: [],
})
  
export const mutations = {
  SET_INFO(state, payload) {
    state.info = payload
  },
  // SET_CHAPTER_TEAMS(state, payload) {
  //   state.chapterTeams = payload
  // },
  SET_CHAPTERS(state, payload) {
    state.chapters.push(payload)
  },
  SET_CHAPTER_VOLUME(state, { id, vol }) {
    state.chapters[id].vol = +vol
  },
  SET_CHAPTER_CHAPTER(state, { id, ch }) {
    state.chapters[id].ch = +ch
  },
  SET_CHAPTER_NAME(state, { id, name }) {
    state.chapters[id].name = name
  },
  SET_CHAPTER_TEAMS(state, { id, teams }) {
    state.chapters[id].teams = teams
  },
  SET_CHAPTER_FILE(state, { id, file }) {
    state.chapters[id].file = file
  },
  SET_REMOVE_CHAPTER(state, id) {
    state.chapters = state.chapters.filter((item) => item.id !== id)
  },
}

export const actions = {
  async FETCH_INFO({ commit }) {
    const res = await createMangaGetInfo()
    commit('SET_INFO', res)
  },
  // async FETCH_CHAPTER_TEAMS({ commit }) {
  //   const res = await createSearchTeam()
  //   commit('SET_CHAPTER_TEAMS', res)
  // },
}

export const getters = {
  GET_INFO(state) {
    return state.info
  },
  GET_CHAPTER_TEAMS(state) {
    return state.chapterTeams
  },
  GET_CHAPTERS(state) {
    return state.chapters
  },
}