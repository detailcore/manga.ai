import { apiAny } from '.'

/**
 * Manga API service with backend
 */

//* Комментарии

// Создать
export async function commentCreate(params) {
  return await apiAny.post(`comments`, params)
}

// Получить
export async function getComments({ page_id, commentable_id, type, page=1 }) {
  if(type === 'reader') {
    return await apiAny.get(
      `comments?page_id=${commentable_id}.${page_id}&commentable_id=${commentable_id}&commentable_type=${type}&page=${page}`
      )
    }
  if(type === 'post') {
    return await apiAny.get(
      `comments?page_id=${page_id}&commentable_id=${commentable_id}&commentable_type=${type}&page=${page}`
    )
  }
}

// Плюс голос
export async function setUpVoteComment(id) {
  return await apiAny.post(`/comments/${id}/upvote`)
}

// Минус голос
export async function setDownVoteComment(id) {
  return await apiAny.post(`/comments/${id}/downvote`)
}

// Редактировать
export async function updateComment(params) {
  let { id, content } = params
  return await apiAny.put(`/comments/${id}`, { content: content })
}

// Удалить
export async function deleteComment(id) {
  return await apiAny.delete(`/comments/${id}`)
}
