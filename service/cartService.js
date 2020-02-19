
const API_URL = 'https://ecoute-cherie.myshopify.com/api/graphql'
class CartService {

  updateCartItem ($axios, checkoutId, variantId, quantity) {
    console.log('q', quantity)
    return $axios.$post(API_URL, {
      query: `mutation {
        checkoutLineItemsAdd(lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }], checkoutId: "${checkoutId}") {
          checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  variant {
                    id
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }`})
    }

  getCart ($axios, checkoutId) {
    return $axios.$post('https://ecoute-cherie.myshopify.com/api/graphql', {
      query: `{
        node(id: "${checkoutId}") {
          ... on Checkout {
            webUrl
            subtotalPrice
            totalTax
            totalPrice
            lineItems (first:250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  variant {
                    id
                    title
                    image {
                      src
                    }
                    price
                  }
                  quantity
                }
              }
            }
          }
        }
      }`
    })
  }

}

export default new CartService()
