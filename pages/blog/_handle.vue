<template>
  <div v-if="blog">
    <h1>{{ blog.fields.title }}</h1>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data () {
    return {
      blog: false
    }
  },
  methods: {
    getBlog () {
      client.getEntries({
        'content_type': 'blogPost',
        'fields.slug[in]': this.$route.params.handle,
      })
        .then(entries => {
          this.blog = entries.items[0]
        })
    }
  },
  created () {
    this.getBlog()
  }
}
</script>
