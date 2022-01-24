import { get, post, put } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Получить информацию о пользователе
export async function getUserById(id) {
  return await get(`user/${id}`)
}

// Регистрация
export async function register(params) {
  return await post(`register`, params)
}

// Обновить информацию профиля
export async function updateUser(params) {
  return await put(`user/profile_information`, params)
}