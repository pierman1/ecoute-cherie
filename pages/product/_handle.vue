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
import Breadcrumbs from '@/components/breadcrumbs/index.vue'
import ProductByHandle from '@/graphql/ProductByHandle.gql'
import CheckoutLineItemsAdd from '@/graphql/CheckoutLineItemsAdd.gql'

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
  apollo: {
    product: {
      prefetch: true,
      query: ProductByHandle,
      loadingKey: 'loading',
      variables () {
        return {
          handle: this.$route.params.handle
        }
      },
      update (data) {
        return data.productByHandle
      }
    }
  },
  methods: {
    addToCart () {
      this.$apollo.mutate({
        mutation: CheckoutLineItemsAdd,
        variables: {
          variantId: this.product.variants.edges[0].node.id,
          quantity: Number(this.quantity),
          checkoutId: this.checkoutId
        }
      })
      .then(({ data }) => {
        this.$store.commit('SET_CART', data.checkoutLineItemsAdd.checkout)
        this.$store.commit('SHOW_CART')
      })
    }
  }
}
</script>
