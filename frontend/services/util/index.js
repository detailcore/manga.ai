/**
 * Для добавления комментария ч/з store
 * Find comment by id.
 * @param  {Array} comments
 * @param  {Number} id
 * @return {Object}
 */
 export function findComment (comments, id) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === id) {
      return comments[i]
    }

    const comment = findComment(comments[i].replies, id)

    if (comment) {
      return comment
    }
  }
}

/**
 * Рекурсия
 * @param  {Array}  comments
 * @param  {Number} parentId
 * @return {Array}
 */
 export function hierarchical (comments, parentId) {
  const result = []

  comments.forEach(comment => {
    if (comment.parent_id === parentId) {
      comment.replies = hierarchical(comments, comment.id)
      result.push(comment)
    }
  })

  return result
}