<template lang="html">
  <div class="order-history">
    <h1 class="font-bold text-xl mb-4 font-serif">Order history</h1>

    <pre>
      {{ $store.state.customer.orders }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'History'
}
</script>

<style lang="css">
</style>
