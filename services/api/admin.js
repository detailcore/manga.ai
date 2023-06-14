import { apiAny } from '.'

/**
 * Manga API service with backend
 */


//? Роли
// Список ролей
export async function getAdminRoles() {
  return await apiAny.get(`admin/roles`)
}
// Добавить новую роль
export async function setAdminRoles(names) {
  return await apiAny.post(`admin/roles/create`, names)
}
// Удалить роль
export async function deleteAdminRoles(id) {
  return await apiAny.delete(`admin/roles/delete/${id}`)
}


//? Разрешения
// Список разрешений
export async function getAdminPermissions() {
  return await apiAny.get(`admin/permissions`)
}
// Добавить новые разрешения
export async function setAdminPermissions(names) {
  return await apiAny.post(`admin/permissions/create`, names)
}
// Удалить разрешение
export async function deleteAdminPermissions(id) {
  return await apiAny.delete(`admin/permissions/delete/${id}`)
}


//? Роли и Разрешения
// Добавить разрешение к роли
export async function setPermissionsForRole(id_role, id_permission) {
  return await apiAny.post(`admin/setPermissionsForRole`, { id_role, id_permission })
}
// Удалить разрешение у роли
export async function deletePermissionsForRole(id_role, id_permission) {
  return await apiAny.delete(`admin/deletePermissionsForRole/${id_role}/${id_permission}`)
}


//? Пользователи
// Список пользователей
export async function getAdminUsers() {
  return await apiAny.get(`admin/users`)
}
// Назначить роль пользователю
export async function setAdminUsersRole(data) {
  return await apiAny.post(`admin/users/set_role`, data)
}
// Поиск пользователей
export async function getAdminUserSearch(query) {
  return await apiAny.get(`admin/users/${query}`)
}


//? Жалобы
// Получить жалобу
export async function complaintsGet(type='post') {
  return await apiAny.get(`admin/complaint?type=${type}`)
}
// Удалить жалобу
export async function complaintRemove(id) {
  return await apiAny.delete(`admin/complaint/${id}`)
}
