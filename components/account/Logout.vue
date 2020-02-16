<template lang="html">
  <div class="mt-6">
    <h1 class="text-md font-serif tracking-widest">
      Logout
    </h1>

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
      this.$store.commit('REMOVE_CUSTOMER')
      this.$router.push('/account/login')
    }
  }
}
</script>

<style lang="css">
</style>
