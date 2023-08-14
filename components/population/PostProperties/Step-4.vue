<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
const currencyTab = ref(true);
const name = ref('');
let price = ref(Number);
let price_us = ref(Number);
let price_temp = ref(Number);
const bedrooms = ref(Number);
const bathrooms = ref(Number);
const parking = ref(Number);
const meter = ref(Number);
const meter_2 = ref(Number);
const description = ref('');
const property_status = ref('');
const propertyStatus = [
  {
    name: 'Nuevo',
    value: 'New'
  },
  {
    name: 'Usado',
    value: 'Used'
  },
];
const feature = ref([]);
let features = [];
let countries = [];
let country = ref(0);
let sectors = reactive([]);
let sector = ref(0);
let displaySector = ref(false);
let cities = reactive([]);
let city = ref([]);
let displayCity = ref(false);
let categories = [];
let lat = null;
let log = null;
let address = ref('');
let pricePlaceholder = ref('pesos dominicanos');
let priceInput = ref('');

let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

let featuresApi = await $fetch('generals/features', {
  baseURL: config.public.API
});
features = featuresApi.results;

let categoriesApi = await $fetch('generals/categories', {
  baseURL: config.public.API
});
categoriesApi.results = categories;

async function getStates(country_id) {
  const statesApi = await $fetch(`generals/states/${country_id}`, {
    baseURL: config.public.API
  });
  sectors.push(statesApi.results.data);
};

async function getCities(sector_id) {
  const citiesApi = await $fetch(`generals/cities/${sector_id}`, {
    baseURL: config.public.API
  });
  cities.push(citiesApi.results.data);
};

function getAddress(lant, long, location) {
  lat = lant;
  log = long;
  address.value = location;
  console.log(lat, log, address.value)
};

function currencyFormat() {
  let valor = priceInput.value.replace(/[^\d.]/g, '');
  let numero = parseFloat(valor);
  if (!isNaN(numero)) {
    priceInput.value = numero.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    price_temp.value = numero;
  }
}
function validateInput(event) {
  const inputValue = event.target.value;
  const regex = /^[0-9.]*$/;
  if (inputValue === '' || event.inputType === 'deleteContentBackward') {
    priceInput.value = inputValue;
    return;
  }
  if (!regex.test(inputValue)) {
    priceInput.value = inputValue.replace(/[^\d.]/g, '');
  };
  return {
    priceInput,
    validateInput,
  };
}

watch(country,(country_id) => {
  getStates(country_id);
  sectors = reactive([]);
  cities = reactive([]);
  displaySector.value = true;
});

watch(sector,(sector_id) => {
  getCities(sector_id);
  cities = reactive([]);
  displayCity.value = true;
});

watch(currencyTab,(new_value) => {
  priceInput.value = '';
  price_temp.value = 0;
  price.value = 0;
  price_us.value = 0;
  if (new_value === true) {
    pricePlaceholder = "pesos dominicanos DOP";
  } else{
    pricePlaceholder = "dólares USD";
  }
});

watch(price_temp,(new_price) => {
  if (currencyTab.value === true) {
    price.value = parseInt(new_price);
    price_us.value = parseInt(new_price / 58);
  } else {
    price_us.value = parseInt(new_price);
    price.value = parseInt(new_price * 58);
  }
});

function save_data() {
  use_posts.name = name.value;
  use_posts.price = price.value;
  use_posts.price_us = price_us.value;
  use_posts.lat = lat;
  use_posts.log = log;
  use_posts.address = address.value;
  use_posts.country = country.value;
  use_posts.sector = sector.value;;
  use_posts.city = city.value;
  use_posts.bedrooms = bedrooms.value;;
  use_posts.bathrooms = bathrooms.value;;
  use_posts.parking = parking.value;
  use_posts.property_status = property_status.value;;
  use_posts.feature = feature.value;
  use_posts.meter = meter.value;
  use_posts.meter_2 = meter_2.value;
  use_posts.description = description.value;
};

</script>

<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-primary-100">inmueble</span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-3 sm:mx-auto gap-4 max-w-[995px]">
    <!-- Nombre -->
    <label class="col-span-3 sm:mb-2 mb-5">
      Nombre del proyecto
      <input class="form-control" v-model="name" placeholder="Nombre del proyecto" type="text">
    </label>
    <!-- Price -->
    <div class="flex col-span-3 sm:mb-2 mb-5">
      <label class="w-full">
        Precio
        <input
          class="form-control"
          v-model="priceInput" 
          @blur="currencyFormat"
          @input="validateInput"
          :placeholder="`Precio en `+ pricePlaceholder"
        >
      </label>
      <div class="flex items-center ml-2.5">
        <button 
          class="price-btn border-l rounded-l-md" 
          :class="{'active': currencyTab}" 
          @click="currencyTab = true">RD
        </button>
        <button 
          class="price-btn border-r rounded-r-md" 
          :class="{'active': !currencyTab}" 
          @click="currencyTab = false">USD
        </button>
      </div>
    </div>
    <!-- Map -->
    <div class="col-span-3">
      <ClientOnly>
        <PopulationPostPropertiesMap @send-location="getAddress"/>
      </ClientOnly>
    </div>
    <!-- Direccion -->
    <div class="col-span-3">
      <label class="w-full sm:mb-2 mb-5">
      Direccion
      <input class="form-control" readonly v-model="address" placeholder="Direccion" type="text">
    </label>
    </div>
    <!-- Pais -->
    <label class="w-full sm:mb-2 mb-5">
      País
      <select class="form-control col-span-3" v-model="country">
        <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
        {{ country.name }}
        </option>
      </select>
    </label>
    <!-- Ciudad -->
    <label class="w-full sm:mb-2 mb-5" v-if="displaySector">
      Ciudad
      <select class="form-control col-span-3" v-model="sector">
        <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
        {{ sector.name }}
        </option>
      </select>
    </label>
    <!-- Sector -->
    <label class="w-full sm:mb-2 mb-5" v-if="displayCity">
      Sector
      <select class="form-control" v-model="city">
        <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
        {{ item.name }}
        </option>
      </select>
    </label>
    <!-- Habitaciones, banos, parqueos -->
    <div class="col-span-3 gap-4 sm:grid grid-cols-2">
      <label class="w-full sm:mb-2 mb-5">
        Habitaciones
        <input class="form-control" v-model="bedrooms" placeholder="Cantidad de habitaciones" type="number">
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Baños
        <input class="form-control" v-model="bathrooms" placeholder="Cantidad de baños" type="number">
      </label>
      <label class="w-full sm:mb-2 mb-5">
        Parqueos
        <input class="form-control" v-model="parking" placeholder="Cantidad de parqueos" type="number">
      </label>
      <div class="mb-5 sm:mb-0">
        <label for="propertyStatus" class="mb-2">Estado</label>
        <select class="form-control" v-model="property_status" id="propertyStatus">
          <option v-for="status in propertyStatus" :key="status" :value="status.value" class="option-label">
            {{ status.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- Amenidades -->
    <div class="col-span-3">
      <label for="amenities" class="mb-2">Otras amenidades</label>
      <div class="amenities-wrapper scrollbar">
        <label 
          v-for="item in features"
          :value="item.id"
          :key="item" 
          id="amenities" 
          class="checkbox-labels">
          <input 
            type="checkbox"
            class="checkbox"
            v-model="feature"
            :value="item.id"
          >
          {{ item.name }}
        </label>
      </div>
    </div>
    <!-- Superficie de construccion y total -->
    <div class="col-span-3 w-full gap-4 sm:flex sm:mb-2 mb-5">
      <label class="w-full mb-5 sm:mb-0">
        Superficie de construcción
        <input class="form-control" v-model="meter" placeholder="Metros²" type="number">
      </label>
      <label class="w-full">
        Superficie de total
        <input class="form-control" v-model="meter_2" placeholder="Metros²" type="number">
      </label>
    </div>
    <!-- Descripcion -->
    <div class="flex flex-col col-span-3">
      <label>Descripción</label>
      <textarea type="text" v-model="description" placeholder="Descripcion de la propiedad"></textarea>
    </div>
  </div>
  <nav class="control-steps-postProperty">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atras
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts'), save_data()">
      Continuar
    </AtomsButtons>
  </nav>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }

label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
}
.form-control {
  @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100;
}
.select-multiple { @apply h-40; }
.price-btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}

textarea {
  @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
}
.amenities-wrapper {
  @apply bg-neutral-white border border-gray-100 rounded-lg px-2.5 pt-3 overflow-y-scroll hover:overscroll-contain h-56  ;
}

.checkbox-labels {
  @apply cursor-pointer select-none flex flex-row items-center font-normal text-sm leading-[22px] mb-3;

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