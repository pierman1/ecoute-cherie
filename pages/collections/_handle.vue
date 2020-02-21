<template>
  <div class="container mx-auto px-6 py-6">
    <h1 class="font-serif font-bold text-xl mb-4 tracking-widest">
      Collection</h1>
    <breadcrumbs />

    <div
      v-if="collection.products"
      class="w-full flex flex-row flex-wrap mx-auto"
    >
      <cell
      class="w-full sm:w-1/2 mb-4"
      v-for="(product, index) in collection.products.edges"
      :key="`product_${index}`"
      :product="product"
      />

    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/breadcrumbs/index.vue'
import Cell from '@/components/product/Cell'
import CollectionByHandle from '@/graphql/collection/CollectionByHandle.gql'

export default {
  scrollToTop: true,
  components: {
    Breadcrumbs,
    Cell
  },
  data () {
    return {
      collection: {}
    }
  },
  apollo: {
    collection: {
      prefetch: true,
      query: CollectionByHandle,
      loadingKey: 'loading',
      variables () {
        return {
          handle: this.$route.params.handle
        }
      },
      update (data) {
        return data.collectionByHandle
      } 
    }
  }
}
</script>
