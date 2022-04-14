export default {
  // loading: false,
  ssr: false,

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/scss/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/filepond', ssr: false },
    { src: '~/plugins/vue-headroom', ssr: false },
    { src: '~/plugins/click-outside', ssr: false },
    { src: '~/plugins/vue-multiselect', ssr: false },
    // { src: '~/plugins/tui-image-editor', ssr: false },
    { src: '~/plugins/vue-material-design-icons', ssr: false },
    { src: '~/plugins/notify-ssr', ssr: true },
    { src: '~/plugins/notify-client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/style-resources',
    // https://www.npmjs.com/package/@nuxtjs/moment
    ['@nuxtjs/moment', { timezone: true, defaultTimezone: 'Europe/Samara', defaultLocale: 'ru', locales: ['ru'], }]
  ],

  styleResources: {
    // your settings here
    scss: [
      '~/assets/scss/main.scss',
      '~/assets/scss/_fonts.scss',
      '~/assets/scss/_mixins.scss'
    ],
    hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
   },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/laravel-echo-module
    // '@nuxtjs/laravel-echo',
    // https://nuxt-socket-io.netlify.app/installation
    // 'nuxt-socket-io',
  ],

  // echo: {
  //   plugins: [ '~/plugins/echo.js' ],
  // },

  // io: {
  //   sockets: [ // Required
  //     { // At least one entry is required
  //       name: 'home',
  //       url: 'http://manga.ai:3000',
  //       default: true,
  //       vuex: { /* see section below */ },
  //       namespaces: { /* see section below */ }
  //     },
  //   ]
  // },

  // Axios module configuration: https://github.com/nuxt-community/moment-module
  axios: {
    baseURL: process.env.API_DOMAIN + '/api/',
    credentials: true,
    headers: {
      'Accept': 'application/json',
    },
    // retry: { retries: 2 }
  },

  // "Auth-next" module
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_DOMAIN,
        endpoints: {
          login: {
            url: '/api/login' // зависит от Fortify
          },
          logout: {
            url: '/api/logout' // зависит от Fortify
          },
          user: {
            url: '/api/user' // независимо от Fortify
          }
        },
        user: {
          property: false
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: false,
    },

    // strategies: {
    //   local: {
    //     scheme: 'refresh',
    //     token: {
    //       property: 'token',
    //       maxAge: 1800, // 30 min
    //       global: true,
    //     },
    //     refreshToken: {
    //       property: 'refresh_token',
    //       data: 'refresh_token',
    //       maxAge: 60 * 60 * 24 * 30 // 30 day
    //     },
    //     user: {
    //       property: false
    //     },
    //     endpoints: {
    //       login: {
    //         url: '/login'
    //       },
    //       logout: {
    //         url: '/logout'
    //       },
    //       user: {
    //         url: '/user'
    //       }
    //     },
    //   },
    // },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // .env config
  publicRuntimeConfig: {
    urlManga: '/manga/',
    urlCoverUser: process.env.FILES_DOMAIN + 'users/',
    urlCoverTeam: process.env.FILES_DOMAIN + 'teams/',
    urlCoverTitle: process.env.FILES_DOMAIN + 'titles/',
    urlMangaReader: process.env.FILES_DOMAIN + 'manga/',
    jsDomain: process.env.JS_DOMAIN,
    apiDomain: process.env.API_DOMAIN,
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.TEST
  }
}
