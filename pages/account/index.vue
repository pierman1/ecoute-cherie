<template>
  <section>
    <div class="mx-auto px-8">
      <h1 class="font-bold text-xl mb-4">Account</h1>
      {{ customer }}
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      customer: null
    }
  },
  methods: {
    getCustomer () {
      const token = window.localStorage.getItem('shopify_customer_access_token')

      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `{
          customer(customerAccessToken: "${token}") {
            firstName
            lastName
            email
            phone
            orders(first: 10) {
              edges {
                node {
                  totalPrice
                }
              }
            }
          }
        }`})
        .then(response => {
          this.customer = response.data.customer
        })
    }
  },
  mounted () {
    this.getCustomer()
  }
}
</script>
