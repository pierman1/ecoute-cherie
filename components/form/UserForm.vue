<template>
  <form class="bg-white rounded pt-6 pb-8 mb-4" @submit.prevent="formsubmit">
    <div class="mb-4">
      <validation-provider rules="required" v-slot="{ errors }">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': errors[0] }"
          id="email"
          v-model="user.email"
          type="text"
          placeholder="Username">

        <span
          class="text-red-500 text-xs italic"
          v-if="errors"
        >
          {{ errors[0] }}
        </span>
      </validation-provider>
    </div>
    <div class="mb-6">
      <validation-provider rules="required" v-slot="{ errors }">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
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
