import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

export default function () {
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPost: process.env.VUE_APP_WEBSOCKETS_PORT,
    forceTLS: false,
    disableStats: true
  })
}
