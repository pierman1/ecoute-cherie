<template>
  <main>
    <section>
      <hero />
    </section>
    <section>
      <div class="mx-auto px-6 py-6">
        <h1 class="font-serif tracking-widest text-xl mb-4 text-center">
          <nuxt-link to="/collections/frontpage">
            show collection
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
  asyncData ({ $axios }) {
    return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
        query: `{
          collections(first:250) {
            edges {
              node {
                handle
                title
                id
              }
            }
          }
        }`
      })
      .then((response) => {
        return { collections: response.data.collections.edges }
      })
  }
  // asyncData ({ $axios, params }) {
  //   return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
  //       query: `{
  //         collectionByHandle(handle: "frontpage") {
  //           id,
  //           title,
  //           products(first: 250) {
  //             edges {
  //               node {
  //                 handle
  //                 title
  //                 vendor
  //                 images(first: 10) {
  //                   edges {
  //                     node {
  //                       id
  //                       src
  //                       altText
  //                     }
  //                   }
  //                 }
  //                 priceRange {
  //                   minVariantPrice {
  //                     amount
  //                     currencyCode
  //                   }
  //                   maxVariantPrice {
  //                     amount
  //                     currencyCode
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }`
  //     })
  //     .then((response) => {
  //       return { collection: response.data.collectionByHandle }
  //     })
  // }
}
</script>
