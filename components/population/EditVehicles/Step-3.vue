<script setup>
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import {storeToRefs} from "pinia";

const use_posts =  usePostsStore();
const config = useRuntimeConfig();
const currencyTab = ref(true);
const mileageTab = ref(true);
const title = ref('');
const make_id = ref(null);
const year = ref(null);
const makes = ref([]);
const models = ref([]);
const model_id = ref(null);
const exterior_color = ref(null);
const interior_color = ref(null);
const air_conditioned = ref(Number);
const traction = ref("");
const transmission = ref("");
const engine = ref("");
const air_bag = ref(Number);
const fuel_type = ref("");
let price = ref(Number);
let price_us = ref(Number);
let price_temp = ref(Number);
let mileage_temp = ref(Number);
let mileage_km = ref(Number);
let mileage_m = ref(Number);
const description = ref('');
const condition = ref('');
const vehicleStatus = [
  {
    name: 'Nuevo',
    value: 'New'
  },
  {
    name: 'Usado',
    value: 'Used'
  },
];
let countries = [];
let country = ref(0);
let sectors = reactive([]);
let sector = ref(0);
let displaySector = ref(false);
let cities = reactive([]);
let city = ref([]);
let displayCity = ref(false);
let pricePlaceholder = ref('pesos dominicanos');
let mileagePlaceholder = ref('Kilómetros (KM)');
let priceInput = ref('');

const schema = yup.object({
  title: yup.string().required("El nombre es requerido"),
  description: yup.string().required("La descripción es requerida"),
  make: yup.number().required("La marca es requerida"),
  model: yup.number().required("El modelo es requerido"),
  condition: yup.string().required("La condición es requerida"),
  year: yup.number().required("El Año es requerido"),
  country: yup.string().required("El pais es requerido"),
  sector: yup.number().required("El sector es requerido"),
  city: yup.number().required("La ciudad es requerida"),
  mileage_temp: yup.number().required("El Kilometraje es requerido"),
  ext_color: yup.string().required("El color exterior es requerido"),
  inter_color: yup.string().required("El color exterior es requerido"),
  air_conditioned: yup.number().required("Este campo es requerido"),
  traction: yup.string().required("Este campo es requerido"),
  transmission: yup.string().required("Este campo es requerido"),
  engine: yup.string().required("Este campo es requerido"),
  air_bag: yup.number().required("Este campo es requerido"),
  fuel_type: yup.string().required("Este campo es requerido"),
});

const { handleSubmit, setValues, setFieldValue} = useForm({
  validationSchema: schema,
});

setValues({
  title: use_posts.title,
  description: use_posts.description,
  model: use_posts.model_id,
  condition: use_posts.condition,
  year: use_posts.year,
  country: use_posts.country_id,
  sector: use_posts.town_id,
  city: use_posts.city_id,
  mileage_temp: use_posts.mileage,
  ext_color: use_posts.exterior_color,
  inter_color: use_posts.interior_color,
  air_conditioned: use_posts.air_conditioned,
  traction: use_posts.traction,
  transmission: use_posts.transmission,
  engine: use_posts.engine,
  air_bag: use_posts.air_bag,
  fuel_type: use_posts.fuel_type
})

let countriesApi = await $fetch('generals/countries', {
  baseURL: config.public.API
});
countriesApi.results.data.forEach(element => {
  if(element.id === 63 || element.id === 236) {
    countries.push(element)
  }
});

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

// Marcas
const { data: makes_data } = useFetch('generals/makes', {
  baseURL: config.public.API,
  transform(makes_data) {
    makes.value = makes_data.results;
  }
});

watchEffect(()=> {
  if(use_posts.make_id) {
    useFetch(`generals/models/${use_posts.make_id}`, {
      baseURL: config.public.API,
      transform(models_data) {
        models.value.push(models_data.results);
      }
    });
  }
})

watch(country,(country_id) => {
  getStates(country_id);
  sectors = reactive([]);
  cities = reactive([]);
  displaySector.value = true;
  use_posts.country_id = country_id;
});

watch(sector,(sector_id) => {
  getCities(sector_id);
  cities = reactive([]);
  use_posts.town_id = sector_id;
  displayCity.value = true;
});

watch(city,(city_id) => {
  use_posts.city_id = city_id;
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

watch(price_temp,(new_price) => {
  if (currencyTab.value === true) {
    use_posts.price = parseInt(new_price);
    use_posts.price_us = parseInt(new_price / 58);
  } else {
    use_posts.price_us = parseInt(new_price);
    use_posts.price = parseInt(new_price * 58);
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
      <Field class="form-control" name="title" type="text" placeholder="Escriba el título" />
      <ErrorMessage name="title" />
    </label>
    <!-- Descripcion -->
    <div class="flex flex-col col-span-2">
      <label for="description">Descripción</label>
      <Field as="textarea" name="description" type="text" placeholder="Descripcion del vehiculo" />
      <ErrorMessage name="description" />
    </div>
    <div class="col-span-2 gap-4 sm:grid grid-cols-2">
      <!-- Marca -->
      <label class="w-full sm:mb-2 mb-5">
        Marca {{make_id}}
        <select class="form-control col-span-2" v-model="use_posts.make_id">
          <option v-for="make_id in makes" :value="make_id.id" :key="make_id.id" class="option-label">
          {{ make_id.name }}
          </option>
        </select>
      </label>

      <!-- Modelo -->
      <label class="w-full sm:mb-2 mb-5">
        Modelo
        <select class="form-control col-span-2" v-model="use_posts.model_id">
          <option v-for="model_id in models" :value="model_id.id" :key="model_id.id" class="option-label">
          {{ model_id.name }}
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
            :placeholder="use_posts.price"
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
      <label for="vehicleStatus" class="mb-2">
        Estado
        <Field name="condition" as="select" class="form-control" id="vehicleStatus">
          <option v-for="condition in vehicleStatus" :key="condition" :value="condition.value" class="option-label">
            {{ condition.name }}
          </option>
        </Field>
        <ErrorMessage name="condition" />
      </label>
      <!-- year -->
      <label class="w-full sm:mb-2 mb-5">
        Año
        <Field class="form-control" name="year" type="number" placeholder="Escriba el Año" />
        <ErrorMessage name="year" />
      </label>
      <!-- Pais -->
      <label class="w-full sm:mb-2 mb-5">
        País
        <Field name="country" as="select" v-model="country" class="form-control">
          <option v-for="country in countries" :key="country" :value="country.id" class="option-label">
            {{ country.name }}
          </option>
        </Field>
        <ErrorMessage name="country" />
      </label>
      <!-- Ciudad -->
      <label class="w-full sm:mb-2 mb-5">
        Ciudad
        <Field name="sector" as="select" v-model="sector" class="form-control" :disabled="!displaySector">
          <option v-for="sector in sectors[0]" :value="sector.id" :key="sector.id" class="option-label">
            {{ sector.name }}
          </option>
        </Field>
        <ErrorMessage name="sector" />
      </label>
      <!-- Sector -->
      <label class="w-full sm:mb-2 mb-5">
        Sector
        <Field name="city" as="select" v-model="city" :disabled="!displayCity" class="form-control">
          <option v-for="item in cities[0]" :value="item.id" :key="item.id" class="option-label">
            {{ item.name }}
          </option>
        </Field>
        <ErrorMessage name="city" />
      </label>
      <!-- Kilometraje -->
      <div class="flex flex-wrap items-center sm:mb-2 mb-5">
        <label class="w-full flex-nowrap flex-none">Kilometraje</label>
        <div class="flex items-center w-full mb-2">
          <Field class="form-control w-full" name="mileage_temp" v-model="mileage_temp"  type="number" :placeholder="`Kilometraje en `+ mileagePlaceholder" />
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
        <ErrorMessage name="mileage_temp" />
      </div>
      <!-- Color exterior -->
      <label class="w-full sm:mb-2 mb-5">
        Color exterior
        <Field class="form-control" name="ext_color" placeholder="Color exterior" as="select">
          <option value="">Selecciona un color</option>
          <option value="blanco">Blanco</option>
          <option value="negro">Negro</option>
          <option value="gris">Gris</option>
          <option value="plata">Plata</option>
          <option value="azul">Azul</option>
          <option value="rojo">Rojo</option>
          <option value="verde">Verde</option>
          <option value="amarillo">Amarillo</option>
          <option value="marron">Marrón</option>
          <option value="naranja">Naranja</option>
          <option value="beige">Beige</option>
          <option value="dorado">Dorado</option>
          <option value="vino">Vino</option>
          <option value="verde-oscuro">Verde oscuro</option>
          <option value="verde-oliva">Verde oliva</option>
          <option value="azul">Azul</option>
          <option value="azul-marino">Azul marino</option>
          <option value="celeste">Celeste / Azul cielo</option>
          <option value="violeta">Violeta / Púrpura</option>
        </Field>
        <ErrorMessage name="ext_color" />
      </label>
      <!-- Color Interior -->
      <label class="w-full sm:mb-2 mb-5">
        Color interior
        <Field class="form-control" name="inter_color" placeholder="Color exterior" as="select">
          <option value="">Selecciona un color</option>
          <option value="blanco">Blanco</option>
          <option value="negro">Negro</option>
          <option value="gris">Gris</option>
          <option value="plata">Plata</option>
          <option value="azul">Azul</option>
          <option value="rojo">Rojo</option>
          <option value="verde">Verde</option>
          <option value="amarillo">Amarillo</option>
          <option value="marron">Marrón</option>
          <option value="naranja">Naranja</option>
          <option value="beige">Beige</option>
          <option value="dorado">Dorado</option>
          <option value="vino">Vino</option>
          <option value="verde-oscuro">Verde oscuro</option>
          <option value="verde-oliva">Verde oliva</option>
          <option value="azul">Azul</option>
          <option value="azul-marino">Azul marino</option>
          <option value="celeste">Celeste / Azul cielo</option>
          <option value="violeta">Violeta / Púrpura</option>
        </Field>
        <ErrorMessage name="inter_color" />
      </label>
      <!-- Aire acondicionado -->
      <label class="w-full sm:mb-2 mb-5">
        Aire acondicionado
        <select class="form-control col-span-2" v-model="use_posts.air_conditioned">
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
      </label>
      <!-- Tracciön -->
      <label class="w-full sm:mb-2 mb-5">
        Tracción
        <Field name="traction" as="select" class="form-control">
          <option value="2WD">2WD</option>
          <option value="4WD">4WD</option>
        </Field>
        <ErrorMessage name="traction" />
      </label>
      <!-- Transmisión -->
      <label class="w-full sm:mb-2 mb-5">
        Transmisión
        <Field name="transmission" as="select" class="form-control">
          <option value="automática">Automática</option>
          <option value="mecánica">Mecánica</option>
        </Field>
        <ErrorMessage name="transmission" />
      </label>
      <!-- Motor -->
      <label class="w-full sm:mb-2 mb-5">
        Motor
        <Field class="form-control" name="engine" type="text" />
        <ErrorMessage name="engine" />
      </label>
      <!-- Bolsa de aire -->
      <label class="w-full sm:mb-2 mb-5">
        Bolsa de aire
        <select class="form-control col-span-2" v-model="use_posts.air_bag">
          <option value="0">No</option>
          <option value="1">Si</option>
        </select>
      </label>
      <!-- Combustible -->
      <label class="w-full sm:mb-2 mb-5">
        Combustible
        <Field class="form-control" name="fuel_type" as="select">
          <option value="">Selecciona el tipo de combustible</option>
          <option value="gasolina">Gasolina</option>
          <option value="diesel">Diésel</option>
          <option value="gas">Gas (GLP / GNC)</option>
          <option value="hibrido">Híbrido (Gasolina + Eléctrico)</option>
          <option value="hibrido-diesel">Híbrido Diésel</option>
          <option value="electrico">Eléctrico</option>
          <option value="hidrogeno">Hidrógeno</option>
        </Field>
        <ErrorMessage name="fuel_type" />
      </label>
    </div>   
  </div>
  <nav class="control-steps-PostVehicle">
    <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
      Atrás
    </AtomsButtons>
    <AtomsButtons @click="$emit('nexts')">
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