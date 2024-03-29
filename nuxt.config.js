export default async () => ({
  // loading: false,
  loading: {
    height: '5px',
    color: '#ff6820', // оранжевый
    // throttle: 200, // задержка перед показом полоски
  },
  ssr: false,
  modern: true, // true = создаёт 2 бандла клиента, 1 для старых браузеров, другой для новых

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: 'frontend',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    // link: [
    //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    // ]
  },

  router: {
    prefetchLinks: false // отключить предварительную загрузку компонента, глобально (для nuxt-link)
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '~/assets/scss/main.scss',
      lang: 'scss',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-headroom', ssr: false },
    { src: '~/plugins/click-outside', ssr: false },
    { src: '~/plugins/vue-multiselect', ssr: false },
    { src: '~/plugins/axios', ssr: false },
    { src: '~/plugins/vue-mdi', ssr: false },
    { src: '~/plugins/notify-ssr', ssr: true },
    { src: '~/plugins/notify-client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: {
    //   analyzerMode: 'static'
    // },
    extractCSS: true,
    splitChunks: { // деление компонентов
      layouts: true,
      pages: true,
      commons: true
    },
    // cache: true,
    extend (config, ctx) {
      if (ctx && ctx.isClient) {
        config.optimization.splitChunks.maxSize = 249856
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        preserveLineBreaks: false,
        collapseWhitespace: true,
      },
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://www.npmjs.com/package/@nuxtjs/moment
    // '@nuxtjs/moment',
    // https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
  ],

  pwa: {
    icon: {
      purpose: 'any'
    },
    meta: {
      author: false,
      ogType: false,
      ogTitle: false,
      ogSiteName: false,
    },
    manifest: {
      lang: 'ru',
      name: 'MangaClub Reincarnated',
      short_name: 'MangaClub Re',
      background_color: '#121212',
    },
  },

  // moment: {
  //   plugin: true, // Отключение плагина false | true
  //   locales: ['ru'],
  //   defaultLocale: 'ru',
  //   timezone: true,
  //   defaultTimezone: 'Europe/Moscow',
  //   timezone: {
  //     startYear: 2021,
  //     endYear: 2025
  //   }
  // },

  styleResources: {
    scss: [
      // '~/assets/scss/main.scss',
      // '~/assets/scss/_fonts.scss',
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_variables.scss',
    ],
    // hoistUseStatements: true  // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/Developmint/nuxt-purgecss
    // ['nuxt-purgecss', { safelist: ['material-design-icon', 'material-design-icon__svg'] }], //! т.к. удаляет лишнее (нужно переделывать вёрстку либо, добавлять много исключений)
    // https://github.com/frenchrabbit/nuxt-precompress
    ['nuxt-precompress'],
    // https://gitlab.com/broj42/nuxt-lazy-load
    ['nuxt-lazy-load', {
      loadingClass: 'isLazyLoading', // в процессе загрузки
      loadedClass: 'isLazyLoaded', // загружено
      appendClass: 'lazyLoad', // не загружено
      directiveOnly: true,
      defaultImage: process.env.JS_DOMAIN + '/_nuxt/assets/images/loading.gif',
      // defaultImage: '~/assets/images/no-image.png.webp',
    }],
    // https://image.nuxtjs.org/getting-started/installation
    // '@nuxt/image',
  ],

  nuxtPrecompress: {
    enabled: true, // Enable in production
    report: false, // set true to turn one console messages during module init
    test: /\.(js|css|html|txt|xml|svg|ttf|eot|otf)$/, // files to compress on build
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: false,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip'],
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]', // middleware will look for this filename
      threshold: 4096, // Only assets bigger than this size are processed. In bytes.
      minRatio: 1, // Only assets that compress better than this ratio are processed (minRatio = Compressed Size / Original Size).
      compressionOptions: { level: 9 }, // You can change this from 1–9.
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]', // middleware will look for this filename
      compressionOptions: { level: 9 }, // You can change this from 1–11. 4–9 offers good performance balance.
      threshold: 4096, // Only assets bigger than this size are processed. In bytes.
      minRatio: 1, // Only assets that compress better than this ratio are processed (minRatio = Compressed Size / Original Size).
    },
  },

  // Axios module configuration
  axios: {
    // baseURL: process.env.NODE_ENV === 'production' ? process.env.API_DOMAIN + '/api/' : 'http://127.0.0.1:8000/api/',
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


  // .env config
  publicRuntimeConfig: {
    urlManga: '/manga/',
    urlCoverUser: process.env.FILES_DOMAIN + 'users/',
    urlCoverTeam: process.env.FILES_DOMAIN + 'teams/',
    urlCoverTitle: process.env.FILES_DOMAIN + 'titles/',
    urlMangaReader: process.env.IMG_DOMAIN + '/',
    jsDomain: process.env.JS_DOMAIN,
    apiDomain: process.env.API_DOMAIN,
    noImage: process.env.FILES_DOMAIN + 'no-image.png.webp',
  },
  privateRuntimeConfig: {
  }
})
