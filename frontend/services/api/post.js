import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */

export async function postGetById(id_post) {
    return await get(`post/${id_post}`)
}

export async function relatedGetById(id_post) {
    return await get(`post/${id_post}/relateds`)
}