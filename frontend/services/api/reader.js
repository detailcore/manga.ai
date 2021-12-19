import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Читалка
// Получить пост по алиасу
export async function chapterGetById(id_chapter) { 
    return await get(`chapter/${id_chapter}`)
}