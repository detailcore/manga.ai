
/**
 *! ЭТОТ ФАЙЛ МОЖНО УДАЛИТЬ, УЖЕ НЕ ИСПОЛЬЗУЕТСЯ
 * *FIX
 */

import Vue from 'vue'
import axios from 'axios'

const config = {
  baseURL: 'http://api.manga.ai/api/',
  timeout: 5 * 10000,
  crossDomain: true,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
  validateStatus(status) {
    return status >= 200 && status < 500
  }
}

export const _axios = axios.create(config)
const newAxios = axios.create(config)

_axios.interceptors.request.use(originConfig => {
  const reqConfig = { ...originConfig }

  // step1: отказоустойчивая обработка
  if (!reqConfig.url) {
    throw new Error({
      source: 'axiosInterceptors',
      message: 'request need url'
    })
  }

  // Использовать запрос get по умолчанию
  if (!reqConfig.method) {
    reqConfig.method = 'get'
  }

  // Случай
  reqConfig.method = reqConfig.method.toLowerCase()

  if (reqConfig.method === 'get') {
    if (!reqConfig.params) {  // Предотвратить неправильное использование полей
      reqConfig.params = reqConfig.data || {}
    }
  } else if (reqConfig.method === 'post') {
    if (!reqConfig.data) {
      reqConfig.data = reqConfig.params || {}
    }

    let hasFile = false
    Object.keys(reqConfig.data).forEach(key => {
      if (typeof reqConfig.data[key] === 'object') {
        if (reqConfig.data[key] instanceof FileList || reqConfig.data[key] instanceof File || reqConfig.data[key] instanceof Blob) {
          hasFile = true
        } else if (reqConfig.data[key].constructor === Object) {
          reqConfig.data[key] = JSON.stringify(reqConfig.data[key])
        }
      }
    })

    if (hasFile) {
      const formData = new FormData()
      Object.keys(reqConfig.data).forEach(key => {
        formData.append(key, reqConfig.data[key])
      })
      reqConfig.data = formData
    }
  }

  return reqConfig
}, error => {
  Promise.reject(error)
})

_axios.interceptors.response.use(async (res) => {
  if (res.status.toString().charAt(0) === '2') {
    return res.data
  }
}, error => {
  // eslint-disable-next-line no-console
  console.log(error)
})

const Plugin = {}

Plugin.install = function (Vue) {
  Vue.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

if (!Vue.axios) {
  Vue.use(Plugin)
}

// Экспорт часто используемых функций
export function post(url, data = {}, params = {}) {
  return _axios({
    method: 'post',
    url,
    data,
    params
  })
}

export function get(url, params = {}) {
  return _axios({
    method: 'get',
    url,
    params
  })
}
export function getNew(url, params = {}) {
  return newAxios({
    method: 'get',
    url,
    params
  })
}

export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data
  })
}

export function putNew(url, data = {}, params = {}) {
  return newAxios({
    method: 'put',
    url,
    params,
    data
  })
}

export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params
  })
}
