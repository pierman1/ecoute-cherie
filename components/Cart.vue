<template>
  <div class="cart font-serif">
    <transition name="fade">
      <div class="background" v-if="showCart" @click="closeCart"></div>
    </transition>

    <transition name="slide">
      <div v-if="showCart" class="panel bg-white">
        <h1 class="font-bold text-xl mb-4">Cart</h1>
        <button class="absolute top-3 right-0 mt-3 mr-3 text-sm" @click="closeCart">close</button>

        <div class="scroll-outer">
          <div class="scroll-inner">

            <div v-if="cart.lineItems && cart.lineItems.edges.length" class="line-items">
              <div
                v-for="(line, index) in cart.lineItems.edges"
                :key="`line_${index}`"
                @key="line.node.id"
                class="mb-4 flex flex-row border-t"
              >

                <div class="w-32 h-32">
                  <img class="object-cover h-full" :src="line.node.variant.image.src" alt="">
                </div>

                <div class="flex flex-col w-full px-2 font-sans text-sm">
                  <span class="text-xl font-serif">
                    {{ line.node.title }}
                  </span>
                  <span class="text-xl font-serif">
                    €{{ line.node.variant.price * line.node.quantity }}
                  </span>
                  <div class="flex justify-between mt-auto">
                    <button
                      class="bg-black text-white px-4 py-2"
                      @click="updateCartItem(line.node.variant.id, -1)">
                      -
                    </button>
                    <div class="flex items-center">{{ Number(line.node.quantity) }}x</div>
                    <button
                      class="bg-black text-white px-4 py-2"
                      @click="updateCartItem(line.node.variant.id, 1)">
                      +
                    </button>
                  </div>
                  <div
                    @click="removeCartItem(line.node.id)"
                    class="text-xs text-red-400 cursor-pointer"
                    >
                    remove
                  </div>
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
import CartService from '~/service/cartService.js'
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
      CartService.getCart(this.checkoutId)
      .then(response => {
        this.$store.commit('SET_CART', response.data.data.node)
      }).catch(error => {
        console.log('error', error)
      })
    },
    updateCartItem (variantId, quantity) {
      CartService.updateCartItem(this.checkoutId, variantId, quantity)
        .then(response => {
          this.$store.commit('SET_CART', response.data.data.checkoutLineItemsAdd.checkout)
        })
        .catch(error => {
          console.log('error', error)
        })
    },
    removeCartItem (lineItemId) {
      CartService.removeCartItem(this.checkoutId, lineItemId)
        .then(response => {
          this.$store.commit('SET_CART', response.data.data.checkoutLineItemsRemove.checkout)
        })
        .catch(error => {
          console.log('error', error)
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
      this.$axios.$post('https://ecoute-cherie.myshopify.com/api/graphql', {
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
