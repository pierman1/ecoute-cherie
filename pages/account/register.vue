<template>
  <section>
    <div class="mx-auto px-8">
      <h1 class="font-bold text-xl mb-4">Register</h1>
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
    register () {
      this.$axios.$post('https://pierttt.myshopify.com/api/graphql', {
        query: `mutation {
          customerCreate(input: {email: "mail+2@markdevri.es", password: "mamamama"}) {
            userErrors {
              field
              message
            }
            customer {
              id
            }
          }
        }`})
        .then(response => {
          this.customer = response
        })
    }
  },
  mounted () {
    this.register()
  }
}
</script>
