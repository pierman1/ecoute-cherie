<template>
  <section class="h-full">
    <div class="w-full mt-12 max-w-xs mx-auto">
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
import CustomerLogin from '@/graphql/customer/CustomerLogin.gql'

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
      this.$apollo.mutate({
        mutation: CustomerLogin,
        variables: {
          input: {
            email: customer.email,
            password: customer.password
          }
        }
      }).then(response => {
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

          if (response.data.customerAccessTokenCreate.customerUserErrors && response.data.customerAccessTokenCreate.customerUserErrors[0]) {
            this.$toasted.show(response.data.customerAccessTokenCreate.customerUserErrors[0].message, {
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
