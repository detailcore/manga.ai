import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Создать публикацию
export async function createManga(data) {
  return await apiAny.post(`post`, data)
}

// Создать персону (автора/художника)
export async function createPeople(data) {
  return await apiAny.post(`people`, data)
}

// Создать издателя
export async function createPublisher(data) {
  return await apiAny.post(`publisher`, data)
}

// Получить данные для публикации
export async function createMangaGetInfo() {
  return await apiAny.get(`create/post`)
}

// Получить данные для главы
export async function createChapterGetInfo(idPost) {
  return await apiAny.get(`create/chapter?manga=${idPost}`)
}

// Загрузить главу
export async function createChapterDownload(data) {
  return await apiAny.post(`create/chapter`, data)
}

// Поиск людей
export async function createSearchPeople(name) {
  return await apiAny.get(`search/peoples/${name}`)
}

// Поиск издателей
export async function createSearchPublisher(name) {
  return await apiAny.get(`search/publishers/${name}`)
}

// Поиск команды
export async function createSearchTeam(name) {
  return await apiAny.get(`search/teams/${name}`)
}