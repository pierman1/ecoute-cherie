<template>
  <div class="mx-auto px-6 py-6">
    <h1 class="font-bold text-xl mb-4">{{ collection.title }}</h1>
    <div
      v-if="collection.products"
      class="flex flex-row flex-wrap -mx-2"
    >
      <div
        v-for="(product, index) in collection.products.edges"
        :key="`product_${index}`"
        @key="product.node.handle"
        class="w-full sm:w-1/2 md:w-1/4 mb-4 px-2"
      >
        <nuxt-link
          :to="`/product/${product.node.handle}`"
          class="block relative bg-white rounded border p-4"
        >
          <img :src="product.node.images.edges[0].node.src" :alt="product.node.images.edges[0].node.alt" style="max-width: 100%;">
          <h2 class="font-bold">{{ product.node.title }}</h2>
          <div class="text-sm">{{ product.node.vendor }}</div>
          <div class="text-sm">{{ product.node.priceRange.minVariantPrice.currencyCode }} {{ product.node.priceRange.minVariantPrice.amount }}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collection: {}
    }
  },
  asyncData ({ $axios, params }) {
    return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
        query: `{
          collectionByHandle(handle: "${params.handle}") {
            id,
            title,
            products(first: 250) {
              edges {
                node {
                  handle
                  title
                  vendor
                  images(first: 10) {
                    edges {
                      node {
                        id
                        src
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }`
      })
      .then((response) => {
        return { collection: response.data.collectionByHandle }
      })
  }
}
</script>
