<template>
  <div class="flex items-center overflow-hidden rounded-lg border-2 border-gray-100 bg-neutral-white text-[#232323] shadow-sm w-fit flex-none">
    <NuxtLink class="btn" :class="{active: $route.query.type === 'All'}" to="/search?type=All">Todo</NuxtLink>
    <NuxtLink class="btn btn-2" :class="{active: $route.query.type === 'Sale'}" to="/sales?type=Sale">Compra</NuxtLink>
    <NuxtLink class="btn" :class="{active: $route.query.type === 'Rent'}" to="/rent?type=Rent">Rentar</NuxtLink>
  </div>
</template>

<style lang="postcss" scoped>
.btn { @apply flex justify-center items-center text-neutral-black border-none bg-neutral-white relative hover:bg-primary-90 hover:text-neutral-white hover:border-primary-50 rounded-none;
  &.active {
    @apply bg-primary-100 text-neutral-white font-semibold !important;
  }
}

.btn-2 { @apply border-l-2 border-r-2 border-solid border-primary-100 !important ; }
</style>