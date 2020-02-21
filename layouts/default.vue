<template>
  <div>
    <layout-header />
    <transition name="fade">
      <nuxt class="main" />
    </transition>
    <layout-menu />
    <layout-footer />
    <cart />
  </div>
</template>

<script>
import Cart from '@/components/cart'
import LayoutFooter from '@/components/LayoutFooter'
import LayoutHeader from '@/components/LayoutHeader'
import LayoutMenu from '@/components/menu'

export default {
  components: {
    Cart,
    LayoutFooter,
    LayoutHeader,
    LayoutMenu
  }
}
</script>

<style lang="scss">
html {
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

.page-enter-active, .page-leave-active {
  transition: opacity 1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in .4s;
}
.slide-leave-active {
  animation: slide-in .2s reverse;
}
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.slide-left-enter-active {
  animation: slide-in-left .4s;
}
.slide-left-leave-active {
  animation: slide-in-left .2s reverse;
}
@keyframes slide-in-left {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
