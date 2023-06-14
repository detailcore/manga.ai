import { apiAny } from '.'

/**
 * Manga API service with backend
 */

// Создать жалобу
export async function complaintCreate(data) {
  return await apiAny.post(`complaint`, data)
}
