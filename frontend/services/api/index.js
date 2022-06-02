/**
 * API service with backend
 */

export * from '~/services/api/post'
export * from '~/services/api/team'
export * from '~/services/api/reader'
export * from '~/services/api/user'
export * from '~/services/api/complaint'
export * from '~/services/api/comments'
export * from '~/services/api/create'
export * from '~/services/api/moderation'
export * from '~/services/api/edit'
export * from '~/services/api/library'
export * from '~/services/api/bookmark'
export * from '~/services/api/home'
export * from '~/services/api/admin'



// Для работы Axios за пределами Vue и Nuxt, к примеру при использовании с файле '~/services/api/post' и т.д.
const requestMethods = [
  'request', 'delete', 'get', 'head', 'options', // url, config
  'post', 'put', 'patch' // url, data, config
]

let client = undefined
let apiNonVueFile = {}

export function setClient(newClient) {
  client = newClient
}

requestMethods.forEach(item => {
  apiNonVueFile[item] = function () {
    if(!client) throw new Error('apiNonVueFile file not installed')
    return client[item].  apply(null, arguments)
  }
})

export { apiNonVueFile as apiAny, }