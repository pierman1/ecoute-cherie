<template>
  <section>
    <div class="container mx-auto px-8 py-8">
      <h1 class="font-bold text-xl mb-4 font-serif">Account</h1>

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/4">
          <div class="text-md font-serif tracking-widest">
            Personal details
          </div>
          <ul class="text-sm" v-if="$store.state.customer">
            <li>
               Name: {{ $store.state.customer.firstName  || '-' }}
            </li>
            <li>
              Lastname: {{ $store.state.customer.lastName || '-' }}
            </li>
            <li>
              E-mail: {{ $store.state.customer.email || '-' }}
            </li>
          </ul>
        </div>
        <div class="w-full md:w-3/4">
          <account-form class="md:mt-6" />
          <order-history />
          <logout />
        </div>
      </div>
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
                  id
                  name
                  totalPrice
                  processedAt
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
