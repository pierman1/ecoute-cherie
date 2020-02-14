<template>
  <section>
    <div class="container mx-auto px-8 py-8">
      <h1 class="font-bold text-xl mb-4 font-serif">Account</h1>
      <ul v-if="customer">
        {{customer.id}}
        <li>
          Customer name: {{ customer.firstName  || '-' }}
        </li>
        <li>
          Customer last name: {{ customer.lastName || '-' }}
        </li>
        <li>
          Email: {{ customer.email || '-' }}
        </li>
      </ul>

      <button @click="updateCustomer">
        click
      </button>
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
            id
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
    },
    updateCustomer () {
      const token = window.localStorage.getItem('shopify_customer_acces_token')

      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          customerUpdate(
            customerAccessToken: "${token}",
            customer: {
              
            }
          ) {
            userErrors {
              field
              message
            }
            customer {
              id
            }
          }
        }`})
        .then(response => {
          console.log('response',  response)
        })
    }
  },
  mounted () {
    this.getCustomer()
  }
}
</script>
