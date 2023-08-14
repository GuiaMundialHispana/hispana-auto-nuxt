<template>
  <!-- Featured propertys -->
  <div class="mt-10">
    <div class="flex items-center justify-between">
      <h1 class="text-[28px] leading-[28px] font-medium">Propiedades <span class="text-primary-100">destacadas</span></h1>
      <nav class="flex gap-4">
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-left"
          :icon-size=15
        />
        <AtomsButtons
          btn-type="btn-icon"
          btn-size="xsmall"
          btn-style="outline-gray"
          icon-name="arrows/arrow-right"
          :icon-size=15
        />
      </nav>
    </div>
    <!-- <Swiper
      class="relative mt-10"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      slidesPerView="auto"
      :loop="true"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }">
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="vip" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="exclusive" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="silver" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="vip" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="vip" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="exclusive" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="silver" />
      </SwiperSlide>
      <SwiperSlide>
        <MoleculesFeaturedProperties plantype="vip" />
      </SwiperSlide>
    </Swiper> -->
  </div>
</template>

<script>
export default {
  name: 'SearchFeatured'
}
</script>

<style lang="postcss" scoped>
.swiper-slide { @apply md:w-max; }
</style>