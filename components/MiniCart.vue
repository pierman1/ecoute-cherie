<template>
  <button
    @click="showCart"
    class="flex"
  >
    <span class="invisible md:visible font-serif text-sm flex mr-2 tracking-widest">
      cart
    </span>
    <span v-if="cart && cart.lineItems && cart.lineItems.edges" class="font-serif inline-block border-solid border border-black rounded-full h-6 w-6 flex items-center justify-center">
      {{ cart.lineItems.edges.length || 0 }}
    </span>
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    cart: state => state.cart
  }),
  methods: {
    showCart () {
      this.$store.commit('SHOW_CART')
    }
  }
}
</script>
