<template>
  <button
    @click="showCart"
    class="flex"
  >
    <!-- <span class="flex mr-2">
      Cart
    </span> -->
    <span v-if="cart.lineItems" class="inline-block bg-gray-700 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center">
      {{ cart.lineItems.edges.length }}
    </span>
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    cart: state => state.cart,
  }),
  methods: {
    showCart () {
      this.$store.commit('SHOW_CART')
    }
  }
}
</script>
