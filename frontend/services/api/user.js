import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Регистрация
export async function register(params) {
  return await get(`register`, params)
}

// Загрузка изображения
export async function uploadCover(params) {
  return await post(`user/upload_cover`, params)
}