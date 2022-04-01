import { get, post } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Каталог (Библиотека)

// Получить начальную страницу
export async function libraryInit() {
    return await get(`library`)
}

// Получить краткое описание
export async function libraryLoadShotStory(id) {
    return await get(`library/${id}`)
}

// Получить резальтат фильтра
export async function libraryGetFilter(page, data) {
    return await post(`library?page=${page}`, data)
}
