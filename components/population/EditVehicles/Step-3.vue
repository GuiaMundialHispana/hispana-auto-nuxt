<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const config = useRuntimeConfig();
const emit = defineEmits(['back', 'nexts'])
const currencyTab = ref(true);
const mileageTab = ref(true);
const name = ref('');
let price = ref(Number);
let price_us = ref(Number);
let mileage_temp = ref(Number);
let mileage_km = ref(Number);
let mileage_m = ref(Number);
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
let country = ref(props.countryId);
let sectors = reactive([]);
let sector = ref(props.sectorId);
let displaySector = ref(true);
let cities = reactive([]);
let city = ref([]);
let displayCity = ref(true);
let categories = [];
let lat = null;
let log = null;
let address = ref('');
let pricePlaceholder = ref('pesos dominicanos');
let mileagePlaceholder = ref('Kilómetros (KM)');
let priceInput = ref('');
let year = ref(number)

let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

use_posts.feature.forEach(element => {
  feature.value.push(element)
})

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
  use_posts.address = location;
  // console.log(lat, log, address.value)
};

const props = defineProps({
  countryId: {
    type: Number
  },
  sectorId: {
    type: Number
  },
  cityId: {
    type: Number
  }
});
getStates(props.countryId);
getCities(props.sectorId);

watch(country,(country_id) => {
  getStates(country_id);
  use_posts.country = country_id;
  sectors = reactive([]);
  cities = reactive([]);
});

watch(sector,(sector_id) => {
  getCities(sector_id);
  use_posts.sector = sector_id;
  cities = reactive([]);
});

watch(city,(city_id) => {
  use_posts.city = city_id;
});

let price_temp = ref(Number);
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

watch(price,(new_price) => {
  price_us.value = parseInt(new_price / 58);
});

watch(mileageTab,(new_value) => {
  mileage_temp.value = 0;
  mileage_km.value = 0;
  mileage_m.value = 0;
  if (new_value === true) {
    mileagePlaceholder = "Kilómetros (KM)";
  } else{
    mileagePlaceholder = "Millas (M)";
  }
});

watch(mileage_temp,(new_mileage) => {
  if (mileageTab.value === true) {
    mileage_km.value = parseInt(new_mileage);
    mileage_m.value = parseInt(new_mileage / 1.6);
  } else {
    mileage_m.value = parseInt(new_mileage);
    mileage_km.value = parseInt(new_mileage * 1.6);
  }
});
</script>


<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-primary-90">vehículo </span>
  </h4>
  <div class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-2 sm:mx-auto gap-4 max-w-[995px]">
    <!-- Titulo -->
    <label class="col-span-2 sm:mb-2 mb-5">
      Título de la publicación
      <input class="form-control" v-model="name" placeholder="Escriba el título" type="text">
    </label>
    <!-- Descripcion -->
    <div class="flex flex-col col-span-2">
      <label for="description">Descripción</label>
      <textarea id="description" type="text" v-model="description" placeholder="Descripcion de la propiedad"></textarea>
    </div>
    <div class="col-span-2 gap-4 sm:grid grid-cols-2">
      <!-- Marca -->
      <label class="w-full sm:mb-2 mb-5">
        Marca
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Modelo -->
      <label class="w-full sm:mb-2 mb-5">
        Modelo
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Price -->
      <div class="flex sm:mb-2 mb-5">
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
        <div class="flex items-center ml-2">
          <button 
            class="value-toggle_btn border-l rounded-l-md" 
            :class="{'active': currencyTab}" 
            @click="currencyTab = true">RD
          </button>
          <button 
            class="value-toggle_btn border-r rounded-r-md" 
            :class="{'active': !currencyTab}" 
            @click="currencyTab = false">USD
          </button>
        </div>
      </div>
      <!-- Estado -->
      <label for="vehicleStatus" class="mb-2">Estado
        <select class="form-control" v-model="vehicle_status" id="vehicleStatus">
          <option v-for="status in vehicleStatus" :key="status" :value="status.value" class="option-label">
            {{ status.name }}
          </option>
        </select>
      </label>
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
      <label class="w-full sm:mb-2 mb-5">
        Ciudad
        <select class="form-control col-span-3" v-model="sector" :disabled="!displaySector">
          <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
          {{ sector.name }}
          </option>
        </select>
      </label>
      <!-- Sector -->
      <label class="w-full sm:mb-2 mb-5">
        Sector
        <select class="form-control" v-model="city" :disabled="!displayCity">
          <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
          {{ item.name }}
          </option>
        </select>
      </label>
      <!-- Año -->
      <label class="w-full">
        Año
        <input
        type="number"
          class="form-control"
          v-model="year" 
          placeholder="Año del vehículo"
        >
      </label>
      <!-- Kilometraje -->
      <div class="flex sm:mb-2 mb-5">
        <label class="w-full">
          Kilometraje
          <input
          type="number"
            class="form-control"
            v-model="mileage_temp" 
            :placeholder="`Kilometraje en `+ mileagePlaceholder"
          >
        </label>
        <div class="flex items-center ml-2">
          <button 
            class="value-toggle_btn border-l rounded-l-md" 
            :class="{'active': mileageTab}" 
            @click="mileageTab = true">KM
          </button>
          <button 
            class="value-toggle_btn border-r rounded-r-md" 
            :class="{'active': !mileageTab}" 
            @click="mileageTab = false">M
          </button>
        </div>
      </div>
      <!-- Color exterior -->
      <label class="w-full sm:mb-2 mb-5">
        Color exterior
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Color Interior -->
      <label class="w-full sm:mb-2 mb-5">
        Color interior
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Aire acondicionado -->
      <label class="w-full sm:mb-2 mb-5">
        Aire acondicionado
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Tracciön -->
      <label class="w-full sm:mb-2 mb-5">
        Tracción
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Transmisión -->
      <label class="w-full sm:mb-2 mb-5">
        Transmisión
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Motor -->
      <label class="w-full sm:mb-2 mb-5">
        Motor
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Bolsa de aire -->
      <label class="w-full sm:mb-2 mb-5">
        Bolsa de aire
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
      <!-- Combustible -->
      <label class="w-full sm:mb-2 mb-5">
        Combustible
        <select class="form-control col-span-2" v-model="country">
          <option v-for="country in countries" :value="country.id" :key="country.id" class="option-label">
          {{ country.name }}
          </option>
        </select>
      </label>
    </div>
    
  </div>
  <nav class="control-steps-PostVehicle">
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
.value-toggle_btn {
  @apply border-y border-gray-300 text-primary-100 w-[37px] h-8 text-[12px] mb-0 mt-auto ;
  &.active { @apply bg-primary-100 text-neutral-white border-none; }
}
textarea {
  @apply mt-2 border border-[#D9D9D9] text-sm rounded-md px-3 py-2 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 h-[130px];
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