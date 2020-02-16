<template>
  <div class="mini-menu" @click="toggleMenu">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MiniMenu',
  computed: mapState({
    showMenu: state => state.showMenu
  }),
  methods: {
    toggleMenu () {
      this.$store.commit('SHOW_MENU')
    }
  }
}
</script>

<style lang="scss" scoped>
.mini-menu {
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;

  span {
    width: 100%;
    height: 1px;
    background-color: black;
    display: block;
    position: absolute;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2) {
      top: 7px;
    }

    &:nth-child(3) {
      top: 14px;
    }
  }
}
</style>
