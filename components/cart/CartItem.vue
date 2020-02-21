<template>
  <div class="p-4 mb-4 flex flex-row border-t">

    <div class="w-32 h-32">
      <img class="object-cover h-full" :src="item.node.variant.image.src" alt="">
    </div>

    <div class="flex flex-col w-full px-2 font-sans text-sm">
      <span class="text-xl font-serif">
        {{ item.node.title }}
      </span>
      <span class="text-xl font-serif">
        €{{ item.node.variant.price * item.node.quantity }}
      </span>
      <div class="flex justify-between mt-auto">
        <button
          class="bg-black text-white px-4 py-2"
          @click="updateCartItem(item.node.variant.id, -1)">
          -
        </button>
        <div class="flex items-center">{{ Number(item.node.quantity) }}x</div>
        <button
          class="bg-black text-white px-4 py-2"
          @click="updateCartItem(item.node.variant.id, 1)">
          +
        </button>
      </div>
      <div
        @click="removeCartItem(item.node.id)"
        class="text-xs text-red-400 cursor-pointer"
        >
        remove
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object
    }
  }
}
</script>
