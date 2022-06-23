import { setClient } from "~/services/api"


export default function ({ app, $axios, redirect }) {
  setClient(app.$axios) // для работы Axios за пределами Vue/Nuxt, к примеру при использовании с файле '~/services/api/post.js' и т.д.


  /**
   * Тут можно сделать кастомный запрос для всех запросов (interceptor)
   */
  $axios.onRequest(conf => {
    // console.log('Making request to ' + conf.url)
    const reqConfig = { ...conf }

    if(!reqConfig.url) {
      throw new Error({
        source: 'axiosInterceptorsCustomError',
        message: 'В запросе не указан URL'
      })
    }

    if(!reqConfig.method) {
      reqConfig.method = 'get'
    }

    reqConfig.method = reqConfig.method.toLowerCase()

    if(reqConfig.method === 'get') {
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



  /**
   * При статусах 2хх отдаём только data, но в этом случае не работает Авторизация
   */
  $axios.onResponse(res => {
    // console.log('Response to ', res)
    if(
      res.status.toString().charAt(0) === '2' &&
      res.config.url.replace(res.config.baseURL, '') !== 'user' //? исключение, фикс бага с авторизованным пользователем (костыль так-то)
    ) {
      return res.data
    }
  })


  /**
   * Редирект на кастомную страницу ошибок при получении ошибки на стороне API сервера
   */
  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 404) {
  //     redirect('/404')
  //   }
  // })
}
