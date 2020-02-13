<template>
  <div>
    <h1>Blog</h1>
    <div v-for="blog in blogs" class="blog">
      <nuxt-link :to="`/blog/${blog.fields.slug}`">
        <h2>{{ blog.fields.title }}</h2>
        {{ blog.fields.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  data () {
    return {
      blogs: false
    }
  },
  methods: {
    getBlogs () {
      client.getEntries({
        'content_type': 'blogPost',
        'order': 'sys.id'
      })
        .then(entries => {
          this.blogs = entries.items
        })
    }
  },
  created () {
    this.getBlogs()
  }
}
</script>
