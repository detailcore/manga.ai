import { get } from '~/services/axios'

/**
 * Manga API service with backend
 */



export async function csrf() { 
    return await get(`sanctum/csrf-cookie`)
}