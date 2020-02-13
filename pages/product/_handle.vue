<template>
  <section v-if="product">
    <div class="mx-auto">
      <div
        v-for="(image, index) in product.images.edges"
        :key="image.node.id"
        style="display: inline-flex;"
      >
        <img v-if="index === 0" :src="image.node.src" :alt="image.node.alt" class="w-full sm:w-1/2 md:w-1/4 mb-4">
      </div>
    </div>
    <div class="mx-auto px-8">

      <h1 class="font-bold text-xl">{{ product.title }}</h1>
      <!-- <div class="text-sm mb-4">{{ product.vendor }}</div> -->

      <div class="flex mb-4">
        <select name="" id="" v-model="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <select name="" id="" v-model="variant" v-show="product.variants.edges.length > 1">
          <option
            v-for="variant in product.variants.edges"
            :key="variant.node.id"
            :value="variant.node.id">
            {{ variant.node.title }}
          </option>
        </select>

        <button
          @click="addToCart"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
          add to cart
        </button>
      </div>

      <div class="text-sm mb-4">{{ product.description }}</div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      product: false,
      quantity: 1,
      variant: ''
    }
  },
  computed: mapState({
    cart: state => state.cart,
    checkoutId: state => state.checkoutId
  }),
  asyncData ({ $axios, params }) {
    return $axios.$post(`https://pierttt.myshopify.com/api/graphql`, {
        query: `{
          productByHandle(handle: "${params.handle}") {
            id
            handle
            title
            description
            vendor
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                }
              }
            }
            images(first: 10) {
              edges {
                node {
                  id
                  src
                  altText
                }
              }
            }
          }
        }`
      })
      .then((response) => {
        return { product: response.data.productByHandle }
      })
  },
  methods: {
    addToCart () {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          checkoutLineItemsAdd(lineItems: [{ variantId: "${this.variant}", quantity: ${this.quantity} }], checkoutId: "${this.checkoutId}") {
            checkout {
              webUrl
              subtotalPrice
              totalTax
              totalPrice
              lineItems (first:250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
                    id
                    title
                    variant {
                      id
                      title
                      image {
                        src
                      }
                      price
                    }
                    quantity
                  }
                }
              }
            }
          }
        }`})
        .then(response => {
          this.$store.commit('SET_CART', response.data.checkoutLineItemsAdd.checkout)
          this.$store.commit('SHOW_CART')
        })
    },
    selectFirstVariant () {
      this.variant = this.product.variants.edges[0].node.id
    }
  },
  mounted () {
    this.selectFirstVariant()
  }
}
</script>
