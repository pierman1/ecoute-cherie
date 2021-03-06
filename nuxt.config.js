const contentfulConfig = require('./.contentful.json')
require('dotenv').config()

export default {
  mode: 'universal',

  /*
  ** Env
  */
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/transitions.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/contentful.js' },
    { src: '~/plugins/main.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo'
  ],
  apollo: {
    clientConfigs: {
      default: {
        ssr: true,
        httpEndpoint: process.env.SHOPIFY_STORE_FRONT_HTTP_ENDPOINT,
        httpLinkOptions: {
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STORE_FRONT_ACCES_TOKEN
          }
        }
      }
    }
  },
  webfontloader: {
    custom: {
      families: [
        'Playfair+Display'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Playfair+Display&display=swap',
      ]
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Acception for vee-validate
    */
    transpile: [
      "vee-validate/dist/rules"
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
