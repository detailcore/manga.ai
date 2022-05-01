import { get, post, _delete } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Получить список закладок
export async function getBookmarksList() {
  return await get(`bookmark/list`)
}

// Получить текущую закладку
export async function getBookmark(data) {
  return await post(`bookmark`, data)
  // return await post(`bookmark?id=${id}`)
}

// Получить закладки пользователя
export async function getUserBookmarks(id_user, id_type) {
  return await get(`bookmark/${id_user}/${id_type}/posts`)
}
// Создать закладку
export async function createBookmark(data) {
  return await post(`bookmark/create`, data)
}

// Удалить закладку
export async function deleteBookmark(id) {
  return await _delete(`bookmark/${id}/delete`)
}
