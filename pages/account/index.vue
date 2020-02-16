<template>
  <section>
    <div class="container mx-auto px-8 py-8">
      <h1 class="font-bold text-xl mb-4 font-serif">Account</h1>

      <ul v-if="$store.state.customer">
        <li>
          Customer name: {{ $store.state.customer.firstName  || '-' }}
        </li>
        <li>
          Customer last name: {{ $store.state.customer.lastName || '-' }}
        </li>
        <li>
          Email: {{ $store.state.customer.email || '-' }}
        </li>
      </ul>

      <account-form />

      <order-history />

      <logout />

    </div>

  </section>
</template>

<script>
import AccountForm from '@/components/form/AccountForm.vue'
import OrderHistory from '@/components/orders/History.vue'
import Logout from '@/components/account/Logout.vue'

export default {
  components: {
    AccountForm,
    AccountForm,
    OrderHistory,
    Logout
  },
  data () {
    return {
      customer: null
    }
  },
  methods: {
    getCustomer () {
      const token = window.localStorage.getItem('shopify_customer_access_token')

      this.$axios.$post('https://ecoute-cherie.myshopify.com/api/graphql', {
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
          if (!response.data.customer) {
            this.$router.push('/account/login')
          }

          this.customer = response.data.customer
          this.$store.commit('SET_CUSTOMER', this.customer)
        })
    }
  },
  mounted () {
    this.getCustomer()
  }
}
</script>
