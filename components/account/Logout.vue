<template lang="html">
  <div>
    <h1 class="font-bold text-xl mb-4 font-serif">Logout</h1>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" @click="logOut">
      Log out
    </button>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    logOut () {
      window.localStorage.setItem('shopify_customer_access_token', '-')
    }
  }
}
</script>

<style lang="css">
</style>
