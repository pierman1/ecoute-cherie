<template>
  <form class="bg-white pt-6 pb-8 mb-4" @submit.prevent="formsubmit">
    <!-- <div class="mb-4" v-if="type === 'register'">
      <validation-provider>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
          First name
        </label>
        <input
          class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          v-model="user.firstName"
          type="text"
          placeholder="Username">
      </validation-provider>
    </div>
    <div class="mb-4" v-if="type === 'register'">
      <validation-provider>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
          Last name
        </label>
        <input
          class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lastName"
          v-model="user.lastName"
          type="text"
          placeholder="Username">
      </validation-provider>
    </div> -->
    <div class="mb-4">
      <validation-provider>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Username">
      </validation-provider>
    </div>
    <div class="mb-6">
      <validation-provider rules="required" v-slot="{ errors }">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          :class="{ 'border-red-500': errors[0] }"
          v-model="user.password"
          type="password"
          placeholder="******************">
        <span class="text-red-500 text-xs italic">
          {{ errors[0] }}
        </span>
      </validation-provider>
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        type="submit">
        {{ submitButtonText }}
      </button>
    </div>
    <div class="text-center mt-4 text-sm">
      <slot />
    </div>
  </form>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  name: 'UserForm',
  components: {
    ValidationProvider
  },
  props: {
    submitButtonText: {
      type: String,
      default: 'Continue'
    },
    type: {
      type: String,
      default: 'login'
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  methods: {
    formsubmit () {
      this.$emit('formsubmit', this.user)
    }
  }
}
</script>
