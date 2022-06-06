import {
  getAdminRoles,
  setAdminRoles,
  deleteAdminRoles,
  setAdminUsersRole,
  getAdminUserSearch,
  getAdminPermissions,
  setAdminPermissions,
  deleteAdminPermissions,
  setPermissionsForRole,
  deletePermissionsForRole,
} from '~/services/api'


export const state = () => ({
  role: {
    new: null,
    old: null,
  },
  roles: [],
  permissions: [],
  users: [],
})


export const mutations = {
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_PERMISSIONS(state, payload) {
    state.permissions = payload
  },
  SET_ADD_PERMISSIONS(state, names) {
    names.forEach(name => {
      state.permissions.push(name)
    })
  },
  SET_REMOVE_PERMISSIONS(state, i) {
    state.permissions.splice(i, 1)
  },
  SET_USER_SEARCH(state, payload) {
    state.users = payload
  },
  SET_USER_ROLE(state, payload) {
    state.role.new = payload
  },
}


export const actions = {
  async FETCH_ROLES({ commit }) {
    const res = await getAdminRoles()
    commit('SET_ROLES', res.data)
  },
  async FETCH_ADD_ROLES({ commit }, names) {
    await setAdminRoles(names)
  },
  async FETCH_REMOVE_ROLES({ commit }, id) {
    await deleteAdminRoles(id)
  },
  async FETCH_PERMISSIONS({ commit }) {
    const res = await getAdminPermissions()
    commit('SET_PERMISSIONS', res.data)
  },
  async FETCH_ADD_PERMISSIONS({ commit }, names) {
    await setAdminPermissions(names)
  },
  async FETCH_REMOVE_PERMISSIONS({ commit }, { i, id }) {
    let res = await deleteAdminPermissions(id)
    if(+res === 1) {
      commit('SET_REMOVE_PERMISSIONS', i)
    }
  },
  async FETCH_USER_SEARCH({ commit }, query) {
    const res = await getAdminUserSearch(query)
    commit('SET_USER_SEARCH', res)
  },
  async FETCH_USER_SET_ROLE({ commit }, data) {
    const res = await setAdminUsersRole(data)
    commit('SET_USER_ROLE', res)
  },
  async FETCH_ADD_PERMISSIONS_FOR_ROLE({ commit }, { id_role, id_permission }) {
    await setPermissionsForRole(id_role, id_permission)
  },
  async FETCH_REMOVE_PERMISSIONS_FOR_ROLE({ commit }, { id_role, id_permission }) {
    await deletePermissionsForRole(id_role, id_permission)
  },
}


export const getters = {
  GET_ROLES(state) {
    return state.roles
  },
  GET_PERMISSIONS(state) {
    return state.permissions
  },
  GET_USER_SEARCH(state) {
    return state.users
  },
  GET_USER_ROLE(state) {
    return state.role
  },
}