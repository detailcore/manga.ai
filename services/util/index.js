

/**
 * Для добавления комментария ч/з store
 * Find comment by id.
 * @param  {Array} comments
 * @param  {Number} id
 * @return {Object}
 */
export function findComment(comments, id) {
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
 * Для удаления комментария ч/з store
 * @param  {Array} comments
 * @param  {Number} id
 * @return {Object}
 */
export function removeComment(comments, id) {
  comments.forEach((item, index) => {
    if (item.id === id) {
      comments.splice(index, 1)
      return false
    }
    removeComment(item.replies, id)
  })
  return false
}


/**
 * Рекурсия для древовидных коментов
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


/**
 * Получить куку
 * @param  {String}  name
 * @return {String}
 */
export function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


/**
 * Определить язык ввода, рус или другой
 * @param  {String}  text
 * @return {Boolean}
 */
export function isCyrillic(text) {
  return /[а-яё]/i.test(text)
}


/**
 * Уведомление от сервера (всплывашка)
 * @param  {Object}  { status: 'ok', msg: 'text' }
 * @return {Object}  { text: 'str', type: 'success' }
 */
export function notify({ status, msg }) {
  switch (status) {
    case 'ok':
      return { text: msg, type: 'success' }
    case 'warn':
      return { text: msg, type: 'warn' }
    case 'error':
      return { text: msg, type: 'error' }
    case 'failed':
      return { text: msg, type: 'error' }
  }
}


/**
 * Ширина экрана
 */
//  export function getWidthViewport() {
//   return window.innerWidth
// }


/**
 * Объединить одинаковые тома и главы в массив
 * @param [Array] []
 * @return [Array] []
 */
export function mergeDuplicates(arr) {
  let sortVol = [], sortCh = [], result = []

  if(arr) {
    // Сортировка по томам
    sortVol = Object.values(
      arr.reduce((prev, cur) => {
        const vol = 'h' + cur['volume']; // символ "h" добавлен, чтобы автоматически не сортировало по цифровым ключам
        (prev[vol] = prev[vol] || []).push(cur)
        return prev
      }, {})
    )

    // Сортировка по главам
    for (const chapters of sortVol) {
      sortCh = Object.values(
        chapters.reduce((prev, cur) => {
          const ch = 'k' + cur['chapter']; // символ "k" добавлен, чтобы автоматически не сортировало по цифровым ключам
          (prev[ch] = prev[ch] || []).push(cur)
          return prev
        }, {})
      )

      result.push(sortCh)
    }
  }

  return result.flat()
}


/**
 * Перезагрузить страницу 1 раз, если слетела авторизация, но есть токен!
 */
// export function reloadPage() {
//   let storage = localStorage.getItem('auth._token.laravelSanctum'),
//       loggedIn = window.$nuxt.$store.state.auth.loggedIn;

//   if(storage === 'true' && loggedIn == false) {

//     if (!localStorage.getItem("reload")) {
//       localStorage.setItem("reload", "true")
//       location.reload()
//     }
//     else {
//       localStorage.removeItem("reload")
//     }
//   }
// }
