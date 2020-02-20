<template>
  <main>
    <section>
      <hero />
    </section>
    <section>
      <div class="mx-auto px-6 py-6">
        <h1 class="font-serif tracking-widest text-xl mb-4 text-center">
          <nuxt-link to="/collections/frontpage">
            show collections
          </nuxt-link>
        </h1>
        <article
          class="w-full mb-4"
          >

          <div class="w-full flex flex-row flex-wrap">
<!--
            <cell
              class="w-full sm:w-1/2"
              v-for="(product, index) in collection.products.edges"
              :key="`product_${index}`"
              :product="product"
            /> -->

          </div>

        </article>

      </div>
    </section>
  </main>
</template>

<script>
import Hero from '@/components/hero'
import Cell from '@/components/product/Cell'
import AllCollections from '@/graphql/AllCollections.gql'

export default {
  scrollToTop: true,
  components: {
    Hero,
    Cell
  },
  data () {
    return {
      collection: []
    }
  },
  apollo: {
    collections: {
      query: AllCollections,
      loadingKey: 'loading',
      update (data) {
        return data.collections.edges
      }
    }
  }
}
</script>
