import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Получить ленту последних обновлений главной страницы
export async function getHomeLatestData(page='') {
  return await get(`/home/latest${page}`)
}

// Получить новые релизы
export async function getHomeNew() {
  return await get(`home/releases/new`)
}

// Получить популярные релизы
export async function getHomeTop() {
  return await get(`home/releases/top`)
}
