<script lang="ts" setup>
import { usePostsStore } from '~/stores/Post';
const use_posts = usePostsStore();
const emit = defineEmits(['nexts'])
</script>

<template>
  <div class="flex flex-col text-center items-center justify-center">
    <h4 class="my-20">
      <span class="text-primary-100">Vamos a comenzar</span>
      <br>
      ¿Vas a vender o alquilar?
    </h4>
    <div class="flex gap-2.5">
      <label class="option" :class="[{checked: use_posts.option_selected === 'sale'}]">
        Vender
        <input
          type="radio"
          value="sale"
          name="sale"
          @click="use_posts.option_selected = 'sale'"
        >
      </label>
      <label class="option" :class="[{checked: use_posts.option_selected === 'rent'}]">
        Alquilar
        <input
          type="radio"
          value="rent"
          name="rent"
          @click="use_posts.option_selected = 'rent'"
          >
      </label>
    </div>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsLink btn-style="outline-primary" link-to="/profile?tab=anuncio">
      Cancelar
    </AtomsLink>
    <AtomsButtons :disabled="use_posts.option_selected === ''" @click="emit('nexts')">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }
.option {
  @apply sm:w-56 w-36 text-center text-base mb-14 cursor-pointer select-none flex items-center justify-center font-normal leading-[22px] border h-10 border-gray-300 rounded-md hover:bg-primary-100 hover:text-neutral-white hover:border-none;

  &.checked {
    @apply bg-primary-100 text-neutral-white font-semibold text-lg hover:bg-primary-90 !important;
  }

  & input { @apply appearance-none; }
}
</style>
