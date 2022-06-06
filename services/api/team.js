import { apiAny } from '.'

/**
 * Manga API service with backend
 */

//* Команда переводчиков
// Получить пост по ID
export async function teamGetById(id) { 
    return await apiAny.get(`team/${id}`)
}

export async function teamPostsGetById(id) { 
    return await apiAny.get(`team/${id}/posts`)
}

// Создать команду
export async function teamCreate(data) { 
    return await apiAny.post(`team`, data)
}

// Редактировать команду
export async function teamUpdate(id, data) { 
    return await apiAny.post(`team/${id}`, data)
}