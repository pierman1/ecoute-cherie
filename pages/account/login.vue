<template>
  <section>
    <div class="w-full py-8 max-w-xs mx-auto">
      <h1 class="font-bold text-xl mb-4">
        Login
      </h1>
      <user-form
        @formsubmit="login"
        submitButtonText="Login">

        <p>
          Don't have an account?
          <nuxt-link
            class="font-bold"
            to="/account/register">
            Register
          </nuxt-link>
        </p>
      </user-form>
    </div>
  </section>
</template>

<script>
import UserForm from '@/components/form/UserForm.vue'

export default {
  components: {
    UserForm
  },
  data () {
    return {
      customer: null
    }
  },
  methods: {
    login (customer) {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          customerAccessTokenCreate(input: {
            email: "${customer.email}",
            password: "${customer.password}"}
          ) {
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


          if (response.data.customerAccessTokenCreate.customerAccessToken && response.data.customerAccessTokenCreate.customerAccessToken.accessToken) {
            this.$store.commit('SET_CUSTOMER_ACCESS_TOKEN', response.data.customerAccessTokenCreate.customerAccessToken.accessToken)
            this.$toasted.show('Succesfully logged in!', {
              type: 'success',
              duration: 5000
            })
            this.$router.push('/account')

            return 
          }

          console.log('response', response.data.customerAccessTokenCreate)
          
          if (response.data.customerAccessTokenCreate.customerUserErrors && response.data.customerAccessTokenCreate.customerUserErrors[0]) {
            this.$toasted.show(response.customerAccessTokenCreate.customerUserErrors[0].message, {
              type: 'error',
              duration: 5000
            })

            return
          }
        })
    }
  }
}
</script>
