export const state = () => ({
  cart: {},
  showCart: false,
  showMenu: false,
  checkoutId: null,
  customerAccessToken: null,
  customer: ''
})

export const mutations = {
  CLOSE_CART (state) {
    state.showCart = false
    document.querySelector('body').classList.remove('cart-open')
    document.querySelector('html').classList.remove('cart-open')
  },
  SHOW_CART (state) {
    state.showCart = true
    document.querySelector('body').classList.add('cart-open')
    document.querySelector('html').classList.add('cart-open')
  },
  CLOSE_MENU (state) {
    state.showMenu = false
    document.querySelector('body').classList.remove('cart-open')
    document.querySelector('html').classList.remove('cart-open')
  },
  SHOW_MENU (state) {
    state.showMenu = true
    document.querySelector('body').classList.add('cart-open')
    document.querySelector('html').classList.add('cart-open')
  },
  SET_CART (state, cart) {
    state.cart = cart
  },
  SET_CHECKOUT_ID (state, id) {
    state.checkoutId = id
    window.localStorage.setItem('shopify_checkout_id', id)
  },
  SET_CUSTOMER_ACCESS_TOKEN (state, token) {
    state.customerAccessToken = token
    window.localStorage.setItem('shopify_customer_access_token', token)
  },
  SET_CUSTOMER (state, customer) {
    state.customer = customer
  },
  REMOVE_CUSTOMER (state) {
    state.customer = {}
    console.log('removedddd')
  }
}
