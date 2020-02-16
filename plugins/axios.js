export default function ({ $axios, app, store }) {
  $axios.onRequest(config => {
    config.headers.common['X-Shopify-Storefront-Access-Token'] = '39595aa67bff7dd0c791ecd8bb438f02'
    config.headers.common['Content-Type'] = 'application/graphql'
    config.headers.common['Accept'] = 'application/json'
  })
}
