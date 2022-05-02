import { apiAny } from '.'

/**
 * Manga API service with backend
 */

//* Каталог (Библиотека)

// Получить начальную страницу
export async function libraryInit() {
    return await apiAny.get(`library`)
}

// Получить краткое описание
export async function libraryLoadShotStory(id) {
    return await apiAny.get(`library/${id}`)
}

// Получить резальтат фильтра
export async function libraryGetFilter(page, data) {
    return await apiAny.post(`library?page=${page}`, data)
}
