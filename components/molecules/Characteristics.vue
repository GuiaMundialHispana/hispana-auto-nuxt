<template>
  <div class="flex items-center flex-wrap gap-4">
    <div class="flex items-center w-fit bg-neutral-10 rounded-lg px-2">
      {{year}}
    </div>
    <div class="flex items-center">
      <AtomsIcon name="general/mileage" :size=24 class="text-primary-90 mr-1" />
      <p class="text-sm text-[#828282] whitespace-nowrap">{{showParsedMlieage(mileage)}} km</p>
    </div>
    <div class="flex items-center">
      <AtomsIcon name="general/car_location" :size=24 class="text-primary-90 mr-1" />
      <p class="text-sm text-[#828282]">{{location}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'characteristics',
  props: {
    year: {
      type: Number,
      default: 2023
    },
    mileage: {
      type: Number,
      default: 5248
    },
    location: {
      type: String,
      default: 'Santo Domingo'
    },
  },
  methods: {
    showParsedMlieage(mileage) {
      return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}
</script>