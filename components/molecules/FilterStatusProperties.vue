<template>
  <div class="flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none">
    <NuxtLink class="btn" :class="{active: $route.query.type === 'All'}" to="/search?type=All">Todos</NuxtLink>
    <NuxtLink class="btn" :class="{active: $route.query.type === 'Used'}" to="/search?type=Used">Usados</NuxtLink>
    <NuxtLink class="btn" :class="{active: $route.query.type === 'New'}" to="/search?type=New">Nuevo</NuxtLink>
  </div>
</template>

<style lang="postcss" scoped>
.btn { @apply flex justify-center items-center text-neutral-black border-none bg-neutral-white relative hover:bg-primary-90 hover:text-neutral-white hover:border-primary-50 rounded-none;
  &.active {
    @apply bg-primary-100 text-neutral-white font-semibold !important;
  }
}
</style>