<template lang="html">
  <div class="order-history">
    <h1 class="text-md font-serif tracking-widest">
      Order history
    </h1>

    <div v-if="$store.state.customer && $store.state.customer.orders && $store.state.customer.orders.edges">

      <order
        v-for="(order, index) in $store.state.customer.orders.edges"
        :order="order"
        :key="`order_${index}`"
      />

    </div>

    <div v-else>
      <p>
        No order history, <nuxt-link to="/">start shoping</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import Order from './Order.vue'
export default {
  name: 'History',
  components: {
    Order
  }
}
</script>

<style lang="css">
</style>
