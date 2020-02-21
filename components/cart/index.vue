<template>
  <div class="cart font-sans">
    <transition name="fade">
      <div class="background" v-if="showCart" @click="closeCart"></div>
    </transition>

    <transition name="slide">
      <div v-if="showCart" class="panel bg-white">
        <div class="flex justify-between w-full h-16 px-5 items-center">
          <h1 class="font-bold text-xl">Cart</h1>
          <button class="text-sm" @click="closeCart">close</button>
        </div>

        <div class="scroll-outer">
          <div class="scroll-inner">

            <div v-if="cart.lineItems && cart.lineItems.edges.length" class="line-items">
              
              <cart-item
                v-for="(item, index) in cart.lineItems.edges"
                :key="`cart_item_${index}`"
                :item="item"
              />

            </div>
            <div class="p-4" v-else>
              <strong>Your cart is empty</strong>
            </div>

          </div>
        </div>

        <div class="bg-gray-700 text-white p-4">
          Subtotal € {{ cart.subtotalPrice }}
        </div>
        <!-- <div>Total tax € {{ cart.totalTax }}</div> -->
        <div class="bg-gray-100 text-black p-4">Total price € {{ cart.totalPrice }}</div>

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
import CartItem from './CartItem'


import InitCheckout from '@/graphql/checkout/InitCheckout.gql'
import GetCart from '@/graphql/cart/GetCart.gql'
import CheckoutLineItemsAdd from '@/graphql/cart/CheckoutLineItemsAdd.gql'
import CheckoutLineItemsRemove from '@/graphql/cart/CheckoutLineItemsRemove.gql'

export default {
  components: {
    CartItem
  },
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
      this.$apollo.query({
        query: GetCart,
        variables: {
          checkoutId: this.checkoutId
        }
      })
    },
    updateCartItem (variantId, quantity) {
      this.$apollo.mutate({
        mutation: CheckoutLineItemsAdd,
        variables: {
          variantId: variantId,
          quantity: quantity,
          checkoutId: this.checkoutId
        }
      }).then(response => {
        this.$store.commit('SET_CART', response.data.data.checkoutLineItemsAdd.checkout)
      })
    
    },
    removeCartItem (lineItemId) {
      this.$apollo.query({
        query: CheckoutLineItemsRemove,
        variable: {
          lineItemId: lineItemId,
          checkoutId: this.checkoutId
        }
      }).then(response => {
        this.$store.commit('SET_CART', response.data.data.checkoutLineItemsRemove.checkout)
      })
    },
    initCart () {
      this.checkoutId = window.localStorage.getItem('ec_shopify_checkout_id_v1')
      if (!this.checkoutId) {
        this.initCheckout()
      } else {
        this.$store.commit('SET_CHECKOUT_ID', this.checkoutId)
        this.getCart()
      }
    },
    initCheckout() {
      this.$apollo.mutate({
        mutation: InitCheckout
      }).then((response) => {
        this.checkoutId = response.data.checkoutCreate.checkout.id
        this.$store.commit('SET_CHECKOUT_ID', response.data.checkoutCreate.checkout.id)
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
    text-align: center;
    background: #000;
    color: #fff;
    text-decoration: none;
  }
</style>
