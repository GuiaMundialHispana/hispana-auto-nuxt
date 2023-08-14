<template>
  <span class="w-44">
    <AtomsIcon name="general/share-location" class="mr-2" />
    {{ reduceString }}
  </span>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      default: 'Location'
    },
  },
  computed: {
    reduceString() {
      if(this.location.length > 10) {
        return this.location.substring(0,20)+"...";
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
span {
  @apply bg-neutral-black bg-opacity-50 text-neutral-white text-xs p-1 rounded-lg flex items-center font-normal;
}
</style>