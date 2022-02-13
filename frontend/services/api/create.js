import { post, get } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Создать публикацию
export async function createManga(data) {
  return await post(`post`, data)
}

// Получить данные для публикации
export async function createMangaGetInfo() {
  return await get(`create/post`)
}

// Поиск людей
export async function createSearchPeople(name) {
  return await get(`search/peoples/${name}`)
}

// Поиск издателей
export async function createSearchPublisher(name) {
  return await get(`search/publishers/${name}`)
}

// Поиск команды
export async function createSearchTeam(name) {
  return await get(`search/teams/${name}`)
}