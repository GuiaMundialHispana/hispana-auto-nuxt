<template>
  <div class="dropdown-wrapper scrollbar">
    <label :for="options.name" class="checkbox-labels">
      <input
        type="checkbox"
        class="checkbox"
        :id="options.name"
      >
      {{ options.name }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array
  }
});
</script>


<style lang="postcss" scoped>
.dropdown-wrapper {
  @apply bg-neutral-white border-2 border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex items-center font-normal text-sm leading-[22px] mb-3;

  & .checkbox {
    @apply relative appearance-none flex-none w-4 h-4 border border-gray-300 rounded-sm mr-2 cursor-pointer hover:bg-primary-90 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none
    after:w-full
    after:h-full
    after:absolute
    after:bg-no-repeat
    after:bg-center
    after:bg-[length:10px]
    after:bg-[url('~/assets/icons/general/check.svg')];
  }
}

.scrollbar {
  &::-webkit-scrollbar {
    @apply w-7;
  }

  &::-webkit-scrollbar-track {
    @apply bg-neutral-white rounded-full;
  }

  &::-webkit-scrollbar-thumb {
    @apply border-[10px] border-solid border-neutral-white rounded-full bg-[#C1C1C1];
  }
}
</style> 