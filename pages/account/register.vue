<template>
  <section>
    <div class="w-full py-8 max-w-xs mx-auto">
      <h1 class="font-bold text-xl mb-4">
        Register
      </h1>
      <user-form
        @formsubmit="register"
        type="register"
        submitButtonText="Register">
        <p>
          Already have an account?
          <nuxt-link
            class="font-bold"
            to="/account/login">
            Login
          </nuxt-link>
        </p>
      </user-form>
    </div>
  </section>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import UserForm from '@/components/form/UserForm'
import CustomerRegister from '@/graphql/customer/CustomerRegister.gql'

export default {
  components: {
    UserForm
  },
  data () {
    return {
      customer: {},
      newCustomer: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register (customer) {
      this.$apollo.mutate({
        mutation: CustomerRegister,
        variables: {
          input: {
            email: customer.email,
            password: customer.password
          }
        }
      }).then(response => {
        this.customer = this.customer
        if (response.data.customerCreate && response.data.customerCreate.customer) {
            this.$router.push('/account/login')
            this.$toasted.show('New customer created!', {
              type: 'success',
              duration: 5000
            })
          }

          if (response.data.customerCreate.userErrors[0]) {
            this.$toasted.show(response.data.customerCreate.userErrors[0].message, {
              type: 'error',
              duration: 5000
            })
          }
      })
    }
  }
}
</script>
