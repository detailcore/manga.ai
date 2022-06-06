import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Создать публикацию
// export async function createManga(data) {
//   return await post(`post`, data)
// }

// Получить кол-во всего что есть
export async function moderationGetCount() {
  return await apiAny.get(`moderation/count_everything`)
}

// Получить публикации в зависимости от статуса
export async function moderationGetContent(type, status, page) {
  return await apiAny.get(`moderation/content?type=${type}&statuses=${status}&page=${page}`)
}

// Создать причину модерации
export async function moderationCreateReason(params) {
  return await apiAny.post(`moderation/reason`, params)
}

// Обновить статус
export async function moderationUpdateStatus(params) {
  return await apiAny.post(`moderation/update`, params)
}

// Получить данные для главы
// export async function createChapterGetInfo(idPost) {
  // return await get(`create/chapter?manga=${idPost}`)
// }