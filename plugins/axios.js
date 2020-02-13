export default function ({ $axios, app, store }) {
  $axios.onRequest(config => {
    config.headers.common['X-Shopify-Storefront-Access-Token'] = '2b4766c086010e7da98aaa33fc1adaec'
    config.headers.common['Content-Type'] = 'application/graphql'
    config.headers.common['Accept'] = 'application/json'
  })
}
