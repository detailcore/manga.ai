import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Получить информацию о пользователе, на странице пользователя
export async function getUserById(id) {
  return await apiAny.get(`user/${id}`)
}

// Регистрация
export async function register(params) {
  return await apiAny.post(`register`, params)
}
// Найти пользователя и установить ему роль
export async function findUserAndSetRole(data) {
  return await apiAny.post(`register/set_role`, data)
}

// Обновить информацию профиля
export async function updateUser(params) {
  return await apiAny.put(`user/profile_information`, params)
}

// Загрузить аватарку
export async function userUploadCover(data) {
  return await apiAny.post(`user/upload_cover`, data)
}

// Загрузить фон профиля
export async function userUploadBackground(data) {
  return await apiAny.post(`user/upload_cover_bg`, data)
}