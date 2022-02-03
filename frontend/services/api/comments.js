import { post, get, put, _delete } from '~/services/axios'

/**
 * Manga API service with backend
 */

//* Комментарии

// Создать
export async function commentCreate(params) {
  console.log(params)
  return await post(`comments`, params)
}

// Получить
export async function getComments(params) {
  return await get(`comments`, params)
}

// Плюс голос
export async function setUpVoteComment(id) {
  return await post(`/comments/${id}/upvote`)
}

// Минус голос
export async function setDownVoteComment(id) {
  return await post(`/comments/${id}/downvote`)
}

// Редактировать
export async function updateComment(params) {
  let { id, content } = params
  return await put(`/comments/${id}`, content)
}

// Удалить
export async function deleteComment(id) {
  return await _delete(`/comments/${id}`)
}