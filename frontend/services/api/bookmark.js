import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Получить список закладок
export async function getBookmarksList() {
  return await apiAny.get(`bookmark/list`)
}

// Получить текущую закладку
export async function getBookmark(data) {
  return await apiAny.post(`bookmark`, data)
}

// Получить закладки пользователя
export async function getUserBookmarks(id_user, id_type) {
  return await apiAny.get(`bookmark/${id_user}/${id_type}/posts`)
}
// Создать закладку
export async function createBookmark(data) {
  return await apiAny.post(`bookmark/create`, data)
}

// Удалить закладку
export async function deleteBookmark(id) {
  return await apiAny.delete(`bookmark/${id}/delete`)
}
