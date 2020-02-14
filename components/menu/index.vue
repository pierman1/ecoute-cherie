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
        <h1 class="font-bold text-xl mb-4">Menu</h1>

        <div class="text-xl font-bold">
          Account
        </div>
        <ul>
          <li
            class="h-12 flex items-center"
            v-for="(item, index) in accountMenuItems"
            :key="`item_${index}`"
          >
            <nuxt-link :to="item.path">
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
      accountMenuItems: [
        {
          name: 'Login',
          path: '/account/login'
        },
        {
          name: 'Register',
          path: '/account/register'
        }
      ]
    }
  },
  methods: {
    closeMenu () {
      this.$store.commit('CLOSE_MENU')
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
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
}
</style>
