import { get, post } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Посты
// Получить пост по алиасу
export async function postGetByAlias(alias) { 
    return await get(`post/${alias}`)
}
// Получить похожее и связанное по id поста
export async function relatedGetById(id_post) {
    return await get(`post/${id_post}/relateds`)
}
// Получить похожее и связанное по id поста
export async function similarGetById(id_post) {
    return await get(`post/${id_post}/similars`)
}
// Получить список глав в описании
export async function chaptersGetById(id_post, sort, page) {
    return await get(`post/chapters/${id_post}?order=${sort}&page=${page}`)
}

//* Жалобы по всему сайту
export async function setComplaint(params) {
    return await post(`complaint/${params}`)
}