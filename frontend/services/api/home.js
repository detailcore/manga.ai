import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Получить latest и side за один запрос
export async function getHomeAll() {
  return await apiAny.get(`home/all`)
}

// Получить ленту последних обновлений главной страницы
export async function getHomeLatestData(page='') {
  return await apiAny.get(`/home/latest${page}`)
}

// Получить популярные и новые релизы
export async function getHomeSide() {
  return await apiAny.get(`home/side`)
}
