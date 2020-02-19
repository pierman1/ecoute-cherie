<template>
  <section v-if="blog">

    <article>
      <div
        class="hero h-64"
        :style="{ 'background-image': `url(${blog.fields.heroImage.fields.file.url})` }"
      >
      </div>

      <nuxt-link to="/blog" class="m-4 block">
        Back to blog overview
      </nuxt-link>


      <div class="article-inner container mt-12 max-w-xl mx-auto">
        <h1 class="font-bold text-xl">{{ blog.fields.title }}</h1>
        {{ blog.fields.body }}
      </div>

    </article>

  </section>
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
