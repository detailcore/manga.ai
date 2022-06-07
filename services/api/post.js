import { apiAny } from '.'

/**
 * Manga API service with backend
 */

//* Посты
// Получить пост по алиасу
export async function postGetByAlias(alias) {
    return await apiAny.get(`post/${alias}`)
}
// Получить похожее и связанное по id поста
export async function relatedGetById(id_post) {
    return await apiAny.get(`post/${id_post}/relateds`)
}
// Получить похожее и связанное по id поста
export async function similarGetById(id_post) {
    return await apiAny.get(`post/${id_post}/similars`)
}
// Получить список глав в описании
export async function chaptersGetById(id_post, sort='desc', page=1) {
    return await apiAny.get(`post/chapters/${id_post}?order=${sort}&page=${page}`)
}

//* Жалобы по всему сайту
export async function setComplaint(params) {
    return await apiAny.post(`complaint/${params}`)
}

//* Поиск постов по названиям
export async function postSearchByTitles(title, lang) {
    return await apiAny.get(`posts/search/?lang=${lang}&q=${title}`)
}

//* Выстовить/изменить рейтинг публикации
export async function postSetRating(data) {
    return await apiAny.post(`post/${data.id}/rating`, data)
}