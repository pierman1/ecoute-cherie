<template>
  <section v-if="product">
    <div class="container flex flex-column md:flex-row md:items-end flex-wrap mx-auto px-6 py-6">

      <div class="w-full md:w-1/2 mb-4">
          <breadcrumbs :breadcrumb="`/collections/${product.collections.edges[0].node.handle}`" />

          <div
          v-for="(image, index) in product.images.edges"
          :key="`image_${image.node.id}`"
          >
          <img v-if="index === 0" :src="image.node.src" :alt="image.node.alt" class="w-full">
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pl-12">
        <h1 class="font-bold text-xl">{{ product.title }}</h1>

        <span>
          € {{ product.priceRange.minVariantPrice.amount }}
        </span>

        <div class="flex mb-4">
          <select name="" id="" v-model="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <select name="" id="" v-model="variant" v-show="product.variants.edges.length > 1">
            <option
              v-for="variant in product.variants.edges"
              :key="`variant_${variant.node.id}`"
              :value="variant.node.id">
              {{ variant.node.title }}
            </option>
          </select>

          <button
            @click="addToCart"
            class="bg-transparent text-black font-semibold hover:text-white hover:bg-black py-2 px-4 border border-blue hover:border-transparent">
            add to cart
          </button>
        </div>

        <div class="text-sm mb-4">{{ product.description }}</div>
      </div>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CartService from '~/service/cartService.js'
import Breadcrumbs from '@/components/breadcrumbs/index.vue'

export default {
  components: {
    Breadcrumbs
  },
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
    return $axios.$post(`https://ecoute-cherie.myshopify.com/api/graphql`, {
        query: `{
          productByHandle(handle: "${params.handle}") {
            id
            handle
            title
            description
            vendor
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
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
        }`
      })
      .then((response) => {
        return { product: response.data.productByHandle }
      })
  },
  methods: {
    addToCart () {
      CartService.updateCartItem(
        this.checkoutId,
        this.variant,
        this.quantity)
      .then(response => {
        this.$store.commit('SET_CART', response.data.data.checkoutLineItemsAdd.checkout)
        this.$store.commit('SHOW_CART')
      })
      .catch(error => {
        console.log('error', error)
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
