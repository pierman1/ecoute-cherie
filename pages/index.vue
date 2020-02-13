<template>
  <main>
    <section>
      <hero />
    </section>
    <section>
      <div class="mx-auto px-6 py-6">
        <h1 class="font-bold text-xl mb-4 text-center">Collections</h1>
        <div class="flex flex-row flex-wrap -mx-2">
          <article
            class="w-full sm:w-1/2 md:w-1/4 mb-4 px-2"
          >

            <div class="flex flex-row">

              <cell
                v-for="(product, index) in collection.products.edges"
                :key="`product_${index}`"
                :data="product"
              />

            </div>

          </article>
          <!-- <article
            v-for="(collection, index) in collections"
            :key="index"
            @key="collection.node.handle"
            class="w-full sm:w-1/2 md:w-1/4 mb-4 px-2"
          >
            <nuxt-link
              :to="`/collections/${collection.node.handle}`"
              class="block relative bg-white rounded border p-4"
            >
              {{ collection.title }}
            </nuxt-link>

            <pre>
              {{ collection.products }}
            </pre>
          </article> -->
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Hero from '@/components/hero'
import Cell from '@/components/product/Cell'

export default {
  components: {
    Hero,
    Cell
  },
  data () {
    return {
      collection: []
    }
  },
  // asyncData ({ $axios }) {
  //   return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
  //       query: `{
  //         collections(first:250) {
  //           edges {
  //             node {
  //               handle
  //               title
  //               id
  //             }
  //           }
  //         }
  //       }`
  //     })
  //     .then((response) => {
  //       return { collections: response.data.collections.edges }
  //     })
  // }
  asyncData ({ $axios, params }) {
    return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
        query: `{
          collectionByHandle(handle: "frontpage") {
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
