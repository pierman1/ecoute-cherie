<template lang="html">
  <div class="flex flex-row justify-between">
    <div class="flex flex-col">

      <div>
        {{ order.node.name }}
      </div>
      <div>
        {{ order.node.totalPrice }}
      </div>

    </div>
    <div>
      {{ order.node.processedAt }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'Order',
  props: {
    order: {
      type: Object
    }
  }
}
</script>

<style lang="css">
</style>
