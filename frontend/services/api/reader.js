import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Читалка
// Получить пост по алиасу
export async function chapterGetById(id_chapter) { 
    return await get(`chapter/${id_chapter}`)
}
// Получить спиоск глав по id Поста
export async function chapterListGetById(id_post) { 
    return await get(`chapters/${id_post}/list`)
}