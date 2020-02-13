<template>
  <div class="product-cell">
    {{ data.node.title }}
    <!-- {{ data.node.images }} -->
    <!-- {{ data.node.priceRange }} -->
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    data: {
      type: [Object, Array]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-cell {
  color: #000;
  margin-bottom: 10px;
}
</style>
