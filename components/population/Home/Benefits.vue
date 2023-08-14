<template>
  <section class="flex flex-col items-center w-full px-4 md:px-4 mt-11 lg:mt-16 pb-4 md:pb-[50px]">
    <p class="leading-10 bg-primary-50 text-primary-100 text-sm font-semibold px-2.5 w-fit rounded-lg">Beneficios</p>
    <h2 class="mt-[34px] text-[28px] font-medium leading-7 text-center">¿Conoces los beneficios de<br hidden class="md:block"> <span class="text-primary-100">utilizar Hispana Home?</span></h2>
    <div class="flex flex-wrap pt-12 md:gap-8 lg:gap-[52px] justify-center">
      <div class="benefit-container">
        <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/property" :size=45 />
        </div>
        <h4>Comprar un inmueble</h4>
        <p>Hispana Home puede ayudarte a encontrar la propiedad perfecta para ti. Con nuestro buscador de inmuebles en línea, podrás buscar entre una amplia selección de propiedades en todo momento.</p>
      </div>
      <div class="benefit-container">
        <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/sell-tag" :size=45 />
        </div>
        <h4>Vender un inmueble</h4>
        <p>Hispana Home puede ayudarte. Ofrecemos una variedad de herramientas y recursos para ayudarte a listar tu propiedad y atraer a los compradores adecuados.</p>
      </div>
      <div class="benefit-container">
        <div class="icon-container">
          <AtomsIcon class="text-primary-100" name="general/house" :size=45 />
        </div>
        <h4>Alquilar un inmueble</h4>
        <p>Hispana Home te ofrece una amplia selección de propiedades para alquilar en todo momento.</p>
      </div>
    </div> 
  </section>
</template>
<style lang="postcss" scoped>
.benefit-container{
  @apply flex flex-col items-center text-center w-[370px] pb-4 lg:pb-0 px-4;
  & h4{
    @apply text-xl font-semibold pt-3;
  } & p{
    @apply leading-[22px] pt-3 text-sm font-normal;
  }
}
.icon-container{
  @apply bg-primary-50 rounded-full flex items-center justify-center w-[90px] h-[90px] md:w-[118px] md:h-[118px];
}
</style>