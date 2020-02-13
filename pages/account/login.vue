<template>
  <section>
    <div class="mx-auto px-8">
      <h1 class="font-bold text-xl mb-4">Login</h1>
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
    login () {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          customerAccessTokenCreate(input: {email: "mail@markdevri.es", password: "mamamama"}) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              code
              field
              message
            }
          }
        }`})
        .then(response => {
          this.customer = response
          this.$store.commit('SET_CUSTOMER_ACCESS_TOKEN', response.data.customerAccessTokenCreate.customerAccessToken.accessToken)
        })
    }
  },
  mounted () {
    this.login()
  }
}
</script>
