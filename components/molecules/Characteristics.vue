<template>
  <div class="flex items-center gap-x-5">
    <!--  -->
    <div class="flex items-center">
      <AtomsIcon name="general/bed" :size=20 class="text-primary-100 mr-2" />
      <p class="text-sm text-neutral-black">{{bedroom}}</p>
    </div>
    <div class="flex items-center">
      <AtomsIcon name="general/bathtub" :size=20 class="text-primary-100 mr-2" />
      <p class="text-sm text-neutral-black">{{bath}}</p>
    </div>
    <div class="flex items-center">
      <AtomsIcon name="general/car" :size=20 class="text-primary-100 mr-2" />
      <p class="text-sm text-neutral-black">{{parking}}</p>
    </div>
    <div class="flex items-center">
      <AtomsIcon name="general/area" :size=20 class="text-primary-100 mr-2" />
      <p class="text-sm text-neutral-black">{{area}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characteristics',
  props: {
    bedroom: {
      type: Number,
      default: 0
    },
    bath: {
      type: Number,
      default: 0
    },
    parking: {
      type: Number,
      default: 0
    },
    area: {
      type: Number,
      default: 0
    }
  }
}
</script>