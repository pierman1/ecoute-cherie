<template lang="html">
  <div class="py-2">
    <div
      v-for="(item, i) in crumbs"
      :key="i"
      :class="item.classes"
      class="text-xs"
    >
      <nuxt-link :to="item.path">
        / {{ item.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumb: {
      type: String
    }
  },
  computed: {
    crumbs() {
      const crumbs = []
      this.$route.matched.map((item, i, { length }) => {
        const crumb = {}
        crumb.path = item.path
        crumb.name = item.name

        // is last item?
        if (i === length - 1) {
          // is param route? .../.../:id
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ''),
              name: item.name.replace(/-[^-]*$/, '')
            })
            crumb.path = this.$route.path
            crumb.name = this.$route.name
          }
          crumb.classes = 'is-active'
        }

        crumbs.push(crumb)
      })

      return crumbs
    }
  }
}
</script>

<style lang="css">
</style>
