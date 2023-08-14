<template>
  <section class="md:px-14 px-4">
    <div class="grid md:grid-cols-12 grid-cols-1 gap-8 justify-center 2xl:max-w-[1440px] mx-auto">
      <div class="lg:col-span-8 col-span-12">
        <h1 class="text-[28px] leading-[28px] font-semibold md:mb-12 mb-8">{{ property.name }}</h1>
        <!-- Price -->
        <div class="flex md:items-center md:flex-row flex-col md:gap-6 gap-2 border-b border-gray-100 pb-4 mb-8">
          <p class="text-neutral-black text-base font-normal">
            Precio
            <br>
            <span class="text-primary-100 xl:text-[28px] text-xl xl:leading-[28px] font-semibold mt-2">US${{ showParsedPrice(property.price_us) }}</span>
            <!-- <br /> -->
            <!-- <span class="text-primary-100 xl:text-[28px] text-xl xl:leading-[28px] font-semibold mt-2">RD${{ showParsedPrice(property.price) }}</span> -->
          </p>
          <a href="#loan" class="btn-loan">
            <AtomsIcon class="mr-2.5" name="general/price" :size=18 />
            Calcula tu préstamo
          </a>
        </div>
        <!-- Caracteristicas -->
        <div class="md:flex xl:justify-start justify-center grid grid-cols-2 items-center flex-wrap xl:gap-x-16 md:gap-6 gap-2 md:mb-8 mb-2">
          <!--  -->
          <div class="flex items-center">
            <AtomsIcon name="general/bed" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">
              {{ property.bedroom }} Habitaciones
            </p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/bathtub" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">
              {{ property.bathroom }} Baños
            </p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/car" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">
              {{ property.parking }} Parqueos
            </p>
          </div>
          <div class="flex items-center">
            <AtomsIcon name="general/area" :size=20 class="text-primary-100 mr-1" />
            <p class="xl:text-base text-xs text-neutral-black font-semibold">
              {{property.solar_meters}} m2 de construcción
            </p>
          </div>
        </div>
        <!-- Estado -->
        <ul class="short-information">
          <li class="md:border-r border-primary-100 xl:pr-14 md:pr-8">
            <AtomsIcon name="general/share-location" :size=19 class="text-primary-100 mr-2.5" />
            {{ property.address }}
          </li>
          <li class="md:border-r border-primary-100 xl:px-14 md:px-8">
            <AtomsIcon name="general/status" :size=19 class="text-primary-100 mr-2.5" />
            Estado: {{ property.property_status === 'New' ? 'Nuevo' : 'Usado' }}
          </li>
          <li class="xl:pl-14 md:pl-8">
            <AtomsIcon name="general/calendar_month" :size=19 class="text-primary-100 mr-2.5" />
            Entrega: 2024
          </li>
        </ul>
      </div>
      <!-- User information -->
      <div class="lg:col-span-4 md:col-span-8 md:col-start-3 col-span-12 pb-4 border-b border-gray-100 h-max">
        <figure class="user-image">
          <img v-if="user.profile_pic != null" :src="`https://seal-app-4mhut.ondigitalocean.app/${user.profile_pic}`" :alt="user.name">
          <span v-else class="w-full h-full flex items-center justify-center font-bold text-primary-100 text-2xl uppercase bg-primary-50">
            {{user.name.charAt(0)}}{{ user.lastname.charAt(0) }}
          </span>
        </figure>
        <h6 class="user-name">{{ user.name }} {{ user.lastname }}</h6>
        <p class="user-position">Vendedor inmobiliario</p>
        <div class="flex justify-center">
          <a :href="`tel:${user.phone}`" class="contact-whatsapp mx-auto">
            <AtomsIcon name="general/mail" :size=18 class="mr-2.5"/>
            Contactar vendedor
          </a>
        </div>
        <a :href="`mailto:${user.email}`" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="general/mail" :size=18 class="mr-2.5"/>
          {{ user.email }}
        </a>
        <a v-if="user.cellphone != '' && user.cellphone != null" target="_blank" :href="`https://api.whatsapp.com/send?phone=${user.cellphone}`" class="hover:text-primary-100 flex items-center justify-center mt-4">
          <AtomsIcon name="social-media/whatsapp" :size=18 class="mr-2.5"/>
          {{ user.cellphone }}
        </a>
      </div>
    </div>
    <!-- Caracteristicas -->
    <div class="pb-[76px] md:pt-16 pt-8 2xl:max-w-[1440px] mx-auto" v-if="property.features.length > 0">
      <h2 class="text-[28px] leading-[28px] font-semibold md:mb-12 mb-8">Características</h2>
      <div class="grid lg:grid-cols-2 gap-4 overflow-hidden items-start">
        <!-- <ul class="characteristics-table">
          <li v-if="property.meters">
            <h3>Superficie total</h3>
            <p>{{property.meters}} m2</p>
          </li>
          <li v-if="property.terrace_meters">
            <h3>Superficie Construida</h3>
            <p>{{property.terrace_meters}} m2</p>
          </li>
          <li v-if="property.bedroom">
            <h3>Dormitorios</h3>
            <p>{{property.bedroom}}</p>
          </li>
          <li v-if="property.bathroom">
            <h3>Baños</h3>
            <p>{{property.bathroom}}</p>
          </li>
          <li v-if="property.parking">
            <h3>Parqueo</h3>
            <p>{{property.parking}}</p>
          </li>
        </ul> -->
        <ul class="characteristics-table">
          <li v-for="feat in property.features" :key="feat">
            <h3>{{feat.name}}</h3>
          </li>
        </ul>
      </div>
    </div>
    <!-- Description -->
    <div class="pb-12 md:pt-8 2xl:max-w-[1440px] mx-auto">
      <h2 class="text-[28px] leading-[28px] font-semibold mb-8">Descripción del inmueble</h2>
      <p class="text-sm text-neutral-black font-normal">{{ property.description }}</p>
    </div>
    <!-- Location -->
    <div class="2xl:max-w-[1440px] mx-auto">
      <h2 class="text-[28px] leading-[28px] font-semibold mb-7">Ubicación</h2>
      <ClientOnly>
        <iframe class="w-full rounded-lg h-96" :src="renderMap"></iframe>
      </ClientOnly>
      <!-- <iframe class="w-full rounded-lg h-96" :src="renderMap"></iframe> -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'PropertyInformation',
  props: {
    property: {
      type: Object,
      default: () => {}
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
      features: [],
      config: useRuntimeConfig()
    }
  },
  computed: {
    renderMap() {
      return  `https://maps.google.com/maps?q=${this.property.latitude},${this.property.longitude}&hl=es;z%3D14&amp&output=embed`;
    }
  },
  methods: {
    showParsedPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>

<style lang="postcss" scoped>
.user-image {
  @apply w-24 h-24 rounded-full border-4 border-solid border-primary-50 overflow-hidden mx-auto mb-2;
  & img { @apply w-full h-full bg-cover bg-center; }
}

.user-name { @apply text-neutral-black text-base font-semibold text-center; }
.user-position { @apply text-sm text-neutral-black text-center font-normal mb-4; }

.btn { @apply rounded-lg !important; }

.characteristics-table {
  @apply rounded-lg border border-[#ADADAD] max-w-sm;

  & li {
    @apply grid grid-cols-1;

    & h3 { @apply px-7 py-2.5 border-b border-[#ADADAD] font-semibold text-base text-neutral-black; }
    & p { @apply px-7 py-2.5 border-b border-gray-100 font-normal text-base text-neutral-black; }
  }

  & li:last-child h3 { @apply border-b-0; }
  & li:last-child p { @apply border-b-0; }
}

/* .characteristics-table {
  @apply rounded-lg border border-[#ADADAD];

  & li {
    @apply grid grid-cols-2;

    & h3 { @apply px-7 py-2.5 border-b border-r border-[#ADADAD] font-semibold text-base text-neutral-black; }
    & p { @apply px-7 py-2.5 border-b border-gray-100 font-normal text-base text-neutral-black; }
  }

  & li:last-child h3 { @apply border-b-0; }
  & li:last-child p { @apply border-b-0; }
} */

.btn-loan { 
  @apply md:ml-auto md:w-max w-full border-2 border-gray-100 rounded-lg h-10 flex items-center justify-center text-sm text-neutral-black font-normal px-2.5 hover:text-neutral-white hover:bg-primary-100 hover:font-semibold hover:border-primary-100;
}

.short-information {
  @apply max-w-4xl md:p-2.5 md:flex justify-center grid grid-cols-2 md:gap-0 gap-2 md:items-center md:flex-row flex-col bg-[#FFF6F6] rounded;

  & li {
    @apply md:h-11 h-8 flex items-center md:justify-center xl:text-base text-xs text-neutral-black font-semibold;
  }
}

.contact-whatsapp {
  @apply inline-flex rounded-lg justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none text-sm px-4 bg-primary-100 border hover:border-primary-90 hover:bg-primary-90 text-neutral-white h-8;
}
</style>