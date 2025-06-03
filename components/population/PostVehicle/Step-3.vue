<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import {ref, watch} from 'vue';
import { usePostsStore } from '~/stores/Post';

const emit = defineEmits(['nexts']);
const use_posts = usePostsStore();
const config = useRuntimeConfig();
const currencyTab = ref(true);
const mileageTab = ref(true);
const make_id = ref(null);
const year = ref(null);
const makes = ref([]);
const models = ref([]);
const model_id = ref(null);
let price = ref(Number);
let price_us = ref(Number);
let price_temp = ref(Number);
let mileage_temp = ref(Number);
let mileage_km = ref(Number);
let mileage_m = ref(Number);
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
const countries = useGetCountry().countries;
const country = ref("");
let sector = ref(0);
let displaySector = ref(false);
let city = ref([]);
let displayCity = ref(false);
let categories = [];
let lat = ref(null);
let log = ref(null);
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

const { handleSubmit, setFieldValue} = useForm({
  validationSchema: schema,
});

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

watch(make_id,() => {
  const { data: models_data } = useFetch(`generals/models/${make_id.value}`, {
    baseURL: config.public.API,
    transform(models_data) {
      models.value.push(models_data.results);
    }
  });
});

let sectors = ref([])
watch(country,(country_id) => {
  displaySector.value = true;
  sectors.value = [];
  const { data } = useFetch(`generals/states/${country_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      sectors.value.push(data.results.data)
    }
  })
});

let cities = ref([]);
watch(sector,(sector_id) => {
  displayCity.value = true;
  cities.value = [];
  const { data } = useFetch(`generals/cities/${sector_id}`, {
    method: 'GET',
    baseURL: config.public.API,
    server: false,
    transform(data) {
      cities.value.push(data.results.data)
    }
  })
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
    price.value = parseInt(new_price);
    price_us.value = parseInt(new_price / 58);
  } else {
    price_us.value = parseInt(new_price);
    price.value = parseInt(new_price * 58);
  }
});

const onSubmit = handleSubmit((values) => {
  use_posts.title = values.title;
  use_posts.price = price.value;
  use_posts.price_us = price_us.value;
  use_posts.lat = lat.value;
  use_posts.log = log.value;
  use_posts.country_id = values.country;
  use_posts.town_id = values.sector;
  use_posts.city_id = values.city;
  use_posts.condition = values.condition;
  use_posts.description = values.description;
  use_posts.make_id = parseInt(values.make);
  use_posts.model_id = parseInt(values.model);
  use_posts.exterior_color = values.ext_color;
  use_posts.interior_color = values.inter_color;
  use_posts.air_conditioned = values.air_conditioned;
  use_posts.traction = values.traction;
  use_posts.transmission = values.transmission;
  use_posts.engine = values.engine;
  use_posts.air_bag = values.air_bag;
  use_posts.fuel_type = values.fuel_type;
  use_posts.year = values.year;
  use_posts.mileage = parseInt(mileage_m.value);
  use_posts.kilometer = parseInt(mileage_km.value);
  emit('nexts');
});

</script>

<template>
  <h4 class="mt-11 mb-7 text-center">
    Cuéntanos sobre tu <span class="text-primary-90">vehículo </span>
  </h4>
  <form @submit="onSubmit" :validation-schema="schema" class="mx-4 px-4 md:px-8 sm:grid sm:grid-cols-2 sm:mx-auto gap-4 max-w-[995px]">
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
        Marca
        <Field name="make" as="select" class="form-control col-span-2" v-model="make_id">
          <option v-for="make_id in makes" :value="make_id.id" :key="make_id.id" class="option-label">
            {{ make_id.name }}
          </option>
        </Field>
        <ErrorMessage name="make" />
      </label>
      <!-- Modelo -->
      <label class="w-full sm:mb-2 mb-5">
        Modelo
        <Field name="model" as="select" class="form-control col-span-2" v-model="model_id">
          <option v-for="model_id in models" :value="model_id.id" :key="model_id.id" class="option-label">
            {{ model_id.name }}
          </option>
        </Field>
        <ErrorMessage name="model" />
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
            type="button"
            class="value-toggle_btn border-l rounded-l-md" 
            :class="{'active': currencyTab}" 
            @click="currencyTab = true">RD
          </button>
          <button
            type="button"
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
        <Field class="form-control" name="inter_color" placeholder="Color interior" as="select">
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
        <Field name="air_conditioned" as="select" class="form-control" id="vehicleStatus">
          <option value="0">No</option>
          <option value="1">Si</option>
        </Field>
        <ErrorMessage name="air_conditioned" />
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
        <Field name="air_bag" as="select" class="form-control">
          <option value="0">No</option>
          <option value="1">Si</option>
        </Field>
        <ErrorMessage name="air_bag" />
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
    <div class="col-span-3 flex justify-center w-full gap-4">
      <AtomsButtons @click="$emit('back')" btn-style="outline-primary">
        Atrás
      </AtomsButtons>
      <AtomsButtons @click="onSubmit">
        Continuar
      </AtomsButtons>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
h4 { @apply font-semibold text-[28px] leading-[42px]; }

label {
  @apply flex flex-col font-normal text-sm text-opacity-[0.85] gap-2;
}
.form-control {
  @apply h-8 w-full border border-[#D9D9D9] text-sm rounded-md px-3 placeholder:text-opacity-25 placeholder:font-normal focus:outline-primary-100 disabled:cursor-not-allowed disabled:bg-neutral-10;
}
.select-multiple { @apply h-40; }
.value-toggle_btn {
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