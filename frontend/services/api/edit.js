import { post } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Отредактировать пост
export async function updatePostById(id, data) {
  return await post(`post/${id}`, data)
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