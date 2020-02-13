<template>
  <div class="product-cell md:px-2">
    <nuxt-link
      :to="`/product/${product.node.handle}`">
      <img :src="product.node.images.edges[0].node.src" alt="">
      <h2 class="font-serif text-lg">
        {{ product.node.title }}
      </h2>
      <div
        class="text-sm">
        {{ product.node.priceRange.minVariantPrice.currencyCode }}
        {{ product.node.priceRange.minVariantPrice.amount }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    product: {
      type: [Object, Array]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-cell {
}
</style>
