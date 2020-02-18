import axios from 'axios'
const API_URL = 'https://ecoute-cherie.myshopify.com/api/graphql'


class CartService {

  constructor() {
    let service = axios.create({
      headers: {
        'X-Shopify-Storefront-Access-Token': '39595aa67bff7dd0c791ecd8bb438f02',
        'Content-Type':'application/json'
      }
    })
    service.interceptors.response.use(this.handleSuccess, this.handleError)
    this.service = service;
  }

  handleSuccess(response) {
    return response
  }

  handleError = (error) => {
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, '/')
        break;
      case 404:
        this.redirectTo(document, '/404')
        break;
      default:
        this.redirectTo(document, '/500')
        break;
    }
    return Promise.reject(error)
  }

  getCart (checkoutId) {
    return this.service.post('https://ecoute-cherie.myshopify.com/api/graphql', {
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

  updateCartItem (checkoutId, variantId, quantity) {
    return this.service.post(API_URL, {
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

  removeCartItem (checkoutId, lineItemId) {
    return this.service.post('https://ecoute-cherie.myshopify.com/api/graphql', {
      query: `mutation {
        checkoutLineItemsRemove(lineItemIds: ["${lineItemId}"], checkoutId: "${checkoutId}") {,
          userErrors {
            message
            field
          }
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

}

export default new CartService()
