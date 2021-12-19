import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Команда переводчиков
// Получить пост по ID
export async function teamGetById(id) { 
    return await get(`team/${id}`)
}

export async function teamPostsGetById(id) { 
    return await get(`team/${id}/posts`)
}