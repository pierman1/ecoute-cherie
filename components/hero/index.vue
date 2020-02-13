<template>
  <div class="hero">
    <div class="flex flex-wrap">
      <div class="w-1/3 ml-auto py-6 h-full">
        <div class="inner h-full bg-gray-500 overflow-hidden">
          <img class="object-cover" src="~/assets/images/dhm.jpeg" alt="">
        </div>
      </div>
      <div class="w-1/3 mr-auto py-6 h-full">
        <div class="inner h-full bg-gray-500 overflow-hidden">
          <img class="object-cover" src="~/assets/images/dhm-3.jpeg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
}
</script>

<style lang="scss" scoped>
.hero {
  height: calc(100vh - 90px);
  overflow: hidden;

  img {
    height: 100%;
  }
}
</style>
