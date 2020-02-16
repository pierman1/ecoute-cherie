<template>
  <div class="menu font-serif">
    <transition name="fade">
      <div
        v-if="showMenu"
        class="background"
        @click="closeMenu">
      </div>
    </transition>

    <transition name="slide-left">
      <div
        v-if="showMenu"
        class="panel bg-white"
      >
        <div class="menu-header flex justify-between items-center px-6 py-4">
          <h1 class="font-serif tracking-widest text-sm" @closeMenu="">menu</h1>

          <button
            class="text-sm tracking-widest"
            type="button"
            name="button" @click="closeMenu">
            close
          </button>
        </div>

        <div
          v-if="!$store.state.customer.email"
          class="text-md px-6 py-4 font-bold font-serif tracking-widest">
          Login
        </div>
        <ul
          v-if="!$store.state.customer.email"
          class="mb-4 border-t">
          <li
            class="flex items-center flexs"
            v-for="(item, index) in loginMenuItems"
            :key="`item_${index}`"
          >
            <nuxt-link :to="item.path" class="font-sans px-6 py-4 border-b w-full md:text-sm">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>

        <div
          class="text-md px-6 py-4 font-bold font-serif tracking-widest"
          v-if="$store.state.customer">
          Account
        </div>
        <ul
          v-if="$store.state.customer" class="font-sans mb-4 border-t">
          <li
            class="flex items-center flexs"
            v-for="(item, index) in accountMenuItems"
            :key="`item_${index}`"
          >
            <nuxt-link :to="item.path" class="font-sans px-6 py-4 border-b w-full md:text-sm">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>

        <div
          class="text-md px-6 py-4 font-bold font-serif tracking-widest">
          More
        </div>
        <ul class="font-sans mb-4 border-t">
          <li
            class="flex items-center flexs"
            v-for="(item, index) in moreMenuItems"
            :key="`item_${index}`"
          >
            <nuxt-link :to="item.path" class="font-sans px-6 py-4 border-b w-full md:text-sm">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>

      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  computed: mapState({
    showMenu: state => state.showMenu
  }),
  data () {
    return {
      loginMenuItems: [
        {
          name: 'Login',
          path: '/account/login'
        },
        {
          name: 'Register',
          path: '/account/register'
        }
      ],
      accountMenuItems: [
        {
          name: 'Account',
          path: '/account'
        },
        {
          name: 'Orders',
          path: '/account/orders'
        }
      ],
      moreMenuItems: [
        {
          name: 'Privacy',
          path: '/privacy-policy'
        },
        {
          name: 'Terms & conditions',
          path: '/terms-and-conditions'
        },
        {
          name: 'Shipments',
          path: '/account/orders'
        },
        {
          name: 'Contact',
          path: '/contact'
        }
      ]
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('CLOSE_MENU')
    }
  },
  watch: {
    '$route' (to, from){
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 998;
  background: rgba(70,75,79, 0.8);
}

.panel {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 350px;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu-header {
  height: 60px;
}
</style>
