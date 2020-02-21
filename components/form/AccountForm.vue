<template lang="html">
  <ValidationObserver v-slot="{ handleSubmit }">
    <div class="max-w-xl">
      <h2 class="text-md font-serif tracking-widest">
        Update profile
      </h2>
      <form class="pt-2 pb-8 mb-4"  @submit.prevent="handleSubmit(updateCustomer)">
        <div class="mb-4">
          <validation-provider rules="required" v-slot="{ errors }">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
              First name
            </label>
            <input
              class="appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              v-model="user.firstName"
              type="text"
              :placeholder="$store.state.customer && $store.state.customer.firstName">
            <span class="text-red-500 text-xs italic">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
        <div class="mb-4">
          <validation-provider rules="required" v-slot="{ errors }">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
              Last name
            </label>
            <input
              class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              v-model="user.lastName"
              type="text"
              :placeholder="$store.state.customer && $store.state.customer.lastName">
            <span class="text-red-500 text-xs italic">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="submit">
            Update user details
          </button>
        </div>


      </form>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import CustomerUpdate from '@/graphql/customer/CustomerUpdate.gql'

extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      user: {
        firstName: '',
        lastName: ''
      }
    }
  },
  methods: {
    updateCustomer () {
      const token = window.localStorage.getItem('shopify_customer_access_token')
      this.$apollo.mutate({
        mutation: CustomerUpdate,
        variables: {
          customerAccessToken: token,
          firstName: this.user.firstName,
          lastName: this.user.lastName
        }
      }).then(response => {
        this.$toasted.show('Profile updated!', {
          type: 'success',
          duration: 5000
        })

        this.customer = response.data.customerUpdate.customer
        this.$store.commit('SET_CUSTOMER', this.customer)
      })
    }
  }
}
</script>

<style lang="css">
</style>
