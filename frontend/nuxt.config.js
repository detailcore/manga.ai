export default {
  // loading: false,
  ssr: false,
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
    { src: '~/plugins/click-outside', ssr: false },
    { src: '~/plugins/vue-material-design-icons', ssr: false },
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
  ],

  // Axios module configuration: https://github.com/nuxt-community/moment-module
  axios: {
    baseURL: process.env.API_DOMAIN,
    credentials: true,
    headers: {
      'Accept': 'application/json',
    },
    // retry: { retries: 2 }
  },

  // "Auth-next" module
  auth: {
    strategies: {
      local: {
          endpoints: {
              login: { 
                  url: 'login', 
                  method: 'post',
                  withCredentials: true, 
                  headers: {
                    'Accept': 'application/json',
                  } 
              },
              user: { 
                  url: 'user', 
                  method: 'get', 
                  propertyName: false,
                  withCredentials: true, 
                  headers: {
                    'Accept': 'application/json',
                  }
              }
          },
          user: {
            property: false
          },
          tokenRequired: false,
          tokenType: false
      },
      localStorage: false
    },
    // strategies: {
    //   'local': {
    //     endpoints: {
    //       login: { url: '/api/login', method: 'post', propertyName: false },
    //       user: { url: '/api/user', method: 'get', propertyName: false }
    //     },
    //     tokenRequired: false,
    //     tokenType: false
    //   }
    // },
    // localStorage: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // .env config
  publicRuntimeConfig: {
    urlCoverTeam: process.env.FILES_DOMAIN + 'teams/',
    urlCoverTitle: process.env.FILES_DOMAIN + 'titles/',
    apiDomain: process.env.API_DOMAIN,
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.TEST
  }
}
