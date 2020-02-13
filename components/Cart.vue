<template>
  <div v-if="cart" class="cart font-serif">
    <transition name="fade">
      <div class="background" v-if="showCart" @click="closeCart"></div>
    </transition>

    <transition name="slide">
      <div v-if="showCart" class="panel bg-white">
        <h1 class="font-bold text-xl mb-4">Cart</h1>
        <button class="absolute top-0 right-0 mt-3 mr-3 text-sm" @click="closeCart">close</button>

        <div class="scroll-outer">
          <div class="scroll-inner">

            <div v-if="cart.lineItems && cart.lineItems.edges.length" class="line-items">
              <div
                v-for="line in cart.lineItems.edges"
                @key="line.node.id"
                class="mb-4"
              >
                {{ line.node.title }}
                <img :src="line.node.variant.image.src" alt="">
                <div class="flex">
                  <button>-</button>
                  <div>{{ line.node.quantity }}x</div>
                  <button>+</button>
                </div>
                <div
                  @click="removeCartItem(line.node.id)"
                  class="text-sm text-red-500 cursor-pointer"
                >
                  remove
                </div>
              </div>
            </div>
            <div v-else>
              <strong>Your cart is empty</strong>
            </div>

          </div>
        </div>

        <div>Subtotal € {{ cart.subtotalPrice }}</div>
        <div>Total tax € {{ cart.totalTax }}</div>
        <div>Total price € {{ cart.totalPrice }}</div>

        <a
          v-if="cart.webUrl && cart.lineItems && cart.lineItems.edges.length"
          :href="cart.webUrl"
          class="proceed"
        >
          Proceed to Checkout
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      checkoutId: null
    }
  },
  computed: mapState({
    cart: state => state.cart,
    showCart: state => state.showCart
  }),
  methods: {
    closeCart () {
      this.$store.commit('CLOSE_CART')
    },
    getCart () {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `{
          node(id: "${this.checkoutId}") {
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
      .then(response => {
        this.$store.commit('SET_CART', response.data.node)
      })
    },
    removeCartItem (lineItemId) {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          checkoutLineItemsRemove(lineItemIds: ["${lineItemId}"], checkoutId: "${this.checkoutId}") {,
            userErrors {
              message
              field
            }
            checkout {
              id
            }
          }
        }`})
      .then(response => {
        this.getCart()
      })
      .catch(errors => {
        window.console.log(errors)
      })
    },
    initCart () {
      this.checkoutId = window.localStorage.getItem('shopify_checkout_id')
      if (!this.checkoutId) {
        this.initCheckout()
      } else {
        this.$store.commit('SET_CHECKOUT_ID', this.checkoutId)
        this.getCart()
      }
    },
    initCheckout() {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          checkoutCreate(input: {}) {
            userErrors {
              message
              field
            }
            checkout {
              id
            }
          }
      }`})
      .then(response => {
        this.checkoutId = response.data.checkoutCreate.checkout.id
        this.$store.commit('SET_CHECKOUT_ID', response.data.checkoutCreate.checkout.id)
        this.getCart()
      })
    }
  },
  mounted () {
    this.initCart()
  }
}
</script>

<style scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 998;
    background: rgba(70,75,79, 0.8);
  }

  .panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 350px;
    max-width: 100%;
    height: 100vh;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
  }

  img {
    width: 80px;
  }

  .scroll-outer {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: calc(100% + 15px);
    flex: 2 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .scroll-inner {
    height: calc(100% + 1px);
  }

  .proceed {
    width: 100%;
    padding: 20px 0;
    margin-top: 20px;
    text-align: center;
    background: #000;
    color: #fff;
    text-decoration: none;
  }
</style>
