<template>
  <main>
    <section>
      <hero />
    </section>
    <section>
      <div class="mx-auto px-6 py-6">
        <h1 class="font-bold text-xl mb-4">Collections</h1>
        <div class="flex flex-row flex-wrap -mx-2">
          <article
            v-for="(collection, index) in collections"
            :key="index"
            @key="collection.node.handle"
            class="w-full sm:w-1/2 md:w-1/4 mb-4 px-2"
          >
            <nuxt-link
              :to="`/collections/${collection.node.handle}`"
              class="block relative bg-white rounded border p-4"
            >
              {{ collection.node.title }}
            </nuxt-link>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Hero from '@/components/hero'

export default {
  components: {
    Hero
  },
  data () {
    return {
      collections: []
    }
  },
  asyncData ({ $axios }) {
    return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
        query: `{
          collections(first:250) {
            edges {
              node {
                handle,
                title
              }
            }
          }
        }`
      })
      .then((response) => {
        return { collections: response.data.collections.edges }
      })
  }
}
</script>
