import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Отредактировать пост
export async function editPostById(id, data) {
  return await apiAny.post(`post/${id}`, data)
}

// Отредактировать главу
export async function editChapterById(id, data) {
  return await apiAny.post(`chapter/${id}`, data)
}

// Загрузка страниц в главу
export async function editUploadPages(id, data) {
  return await apiAny.post(`chapter/${id}/upload_page`, data)
}

// Удалить страницу в главе
export async function editRemovePageInChapter(id, data) {
  return await apiAny.post(`chapter/page/${id}/delete`, data)
}

// Удалить главу целиком
export async function editRemoveAllChapter(id) {
  return await apiAny.delete(`chapter/${id}/delete`)
}

// Получить данные для главы
// export async function createChapterGetInfo(idPost) {
//   return await get(`create/chapter?manga=${idPost}`)
// }

// Загрузить главу
// export async function createChapterDownload(data) {
//   return await post(`create/chapter`, data)
// }

// Поиск людей
// export async function createSearchPeople(name) {
//   return await get(`search/peoples/${name}`)
// }