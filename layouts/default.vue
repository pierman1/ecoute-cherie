<template>
  <div>
    <layout-header />
    <nuxt class="main" />
    <layout-footer />
    <cart />
  </div>
</template>

<script>
import Cart from '@/components/Cart'
import LayoutFooter from '@/components/LayoutFooter'
import LayoutHeader from '@/components/LayoutHeader'

export default {
  components: {
    Cart,
    LayoutFooter,
    LayoutHeader
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  padding-top: 60px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.main {
  min-height: 100vh;
}
</style>
