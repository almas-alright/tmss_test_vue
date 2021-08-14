export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tmss-test-assignment',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    bodyAttrs: {
      class: 'bg'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css',
    '@/assets/css/bootstrap.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/mixins/validation',
    './plugins/mixins/user',
    './plugins/axios',
    {src: '~/plugins/select2.js', mode:'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  axios: {
    baseURL: 'http://127.0.0.1:8000/api/v1',
  },

  auth: {
    strategies: {
      local: {
        endpoints:{
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/auth/logout', method: 'get' },
          user: { url: '/auth/my-profile', method: 'get', propertyName: 'user' },
        }
      }
    },
    redirect:{
      home: '/',
      login: '/login'
    }
    // strategies: {
    //   local: {
    //     token: {
    //       property: 'access_token',
    //       global: true,
    //       maxAge: 1800,
    //       // required: true,
    //       type: 'bearer'
    //     },
    //     user: {
    //       property: false,
    //       autoFetch: true
    //     },
    //     endpoints: {
    //       login: {url: '/auth/login', method: 'post'},
    //       logout: {url: '/auth/logout', method: 'get'},
    //       refresh: {url: '/auth/refresh', method: 'get'},
    //       user: {url: '/auth/my-profile', method: 'get'},
    //     }
    //   }
    // },
    // redirect: {
    //   home: '/dashboard',
    //   login: '/' //use as login
    // }
  },
  router: {
    middleware: ['clearValidationErrors']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", {"loose": true}]
      ]
    }
  }
}
