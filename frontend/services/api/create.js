import { post, get } from '~/services/axios'

/**
 * Manga API service with backend
 */

// Создать публикацию
export async function createManga(data) {
  return await post(`post`, data)
}

// Создать персону (автора/художника)
export async function createPeople(data) {
  return await post(`people`, data)
}

// Создать издателя
export async function createPublisher(data) {
  return await post(`publisher`, data)
}

// Получить данные для публикации
export async function createMangaGetInfo() {
  return await get(`create/post`)
}

// Получить данные для главы
export async function createChapterGetInfo(idPost) {
  return await get(`create/chapter?manga=${idPost}`)
}

// Загрузить главу
export async function createChapterDownload(data) {
  return await post(`create/chapter`, data)
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