<template>
  <section class="container mt-12 max-w-xl mx-auto">
    <h1 class="font-bold font-serif text-xl mb-10 tracking-widest">
      Blog
    </h1>
    <div
      class="blog-item mb-10"
      v-for="(blog, index) in blogs"
      :key="`blog_link_${index}`"
    >
      <nuxt-link :to="`/blog/${blog.fields.slug}`">
        <img
          v-if="blog.fields.heroImage.fields.file"
          :src="blog.fields.heroImage.fields.file.url"
          alt=""
        >
        <h2 class="font-bold text-xl">
          {{ blog.fields.title }}
        </h2>

        <p
          v-if="blog.fields.description"
          class="text-sm"
        >
          {{blog.fields.description}}
        </p>

      </nuxt-link>
    </div>
  </section>
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
