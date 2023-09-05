<script setup>
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';
import { usePostsStore } from '~/stores/Post';

const use_posts = usePostsStore();
const user_store = useUserStore();
const config = useRuntimeConfig();
let step = ref(1);

//Obtener anuncio
// Swal.showLoading();
Swal.showLoading()
const { data: property, pending, error} = await useLazyFetch(`advertisements/${useRoute().query.property_id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results,
  onResponse({response}){
    Swal.close()
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
    if(response.status === 200 ) {
      const property_object = response._data.results;
      use_posts.option_selected = property_object.property.type.toLowerCase();
      use_posts.plan_id = property_object.plan_id;
      use_posts.category_id = property_object.property.property_category_id;
      use_posts.name = property_object.property.name;
      use_posts.price = property_object.property.price;
      use_posts.price_us = property_object.property.price_us;
      use_posts.address = property_object.property.address;
      use_posts.country = property_object.property.country_id;
      use_posts.sector = property_object.property.town_id;
      use_posts.city = property_object.property.city_id;
      use_posts.bedrooms = property_object.property.bedroom;
      use_posts.bathrooms = property_object.property.bathroom;
      use_posts.parking = property_object.property.parking;
      use_posts.property_status = property_object.property.property_status;
      // use_posts.feature = property_object.property.feature_ids;
      var arreglo = property_object.property.feature_ids.split(',');
      // Convierte los elementos en números enteros
      var arregloNumeros = arreglo.map(function(elemento) {
        // return parseInt(elemento);
        use_posts.feature.push(elemento)
      });

      use_posts.meter = property_object.property.meters;
      use_posts.meter_2 = property_object.property.solar_meters;
      use_posts.description = property_object.property.description;
      use_posts.saved_images = property_object.property.images;
      use_posts.lat = property_object.property.latitude;
      use_posts.log = property_object.property.longitude;
      // 
    }
  }
});

async function createAdvertisement() {
  Swal.showLoading();
  const form = new FormData();
  form.append('plan_id', use_posts.plan_id);
  form.append('advertisement_id', useRoute().query.property_id);
  form.append('type', use_posts.option_selected);
  form.append('property_category', use_posts.category_id);
  form.append('name', use_posts.name);
  form.append('price', use_posts.price);
  form.append('price_us', use_posts.price_us);
  form.append('address', use_posts.address);
  form.append('description', use_posts.description);
  form.append('town_id', use_posts.sector);
  form.append('city_id', use_posts.city);
  form.append('country_id', use_posts.country);
  form.append('bedroom', use_posts.bedrooms);
  form.append('bathroom', use_posts.bathrooms);
  form.append('parking', use_posts.parking);
  form.append('meters', use_posts.meter);
  form.append('solar_meters', use_posts.meter_2);
  form.append('latitude', use_posts.lat);
  form.append('longitude', use_posts.log);
  form.append('property_status', use_posts.property_status);
  use_posts.feature.forEach((element, index) => {
    form.append(`features[${index}]`, element);
  });

  use_posts.saved_images.forEach((element, index)=>{
    form.append('images[' + index + ']',element.image);
  });

  // images = arreglode string de las imagenes que recibo
  // image = campo donde mando la imagen como portada
  // new_images = array de FILES de las nuevas imagenes
  // new_image = la imagen de portada que debe ser un FILE cuando cambian la imagen de portada

  if(use_posts.new_images.length > 0) {
    // arreglo de las nuevas imagenes
    use_posts.new_images.forEach((element, index)=>{
      form.append('new_images[' + index + ']',element);
    });
    //portada
    if(use_posts.testPortada){
      form.append('new_image', use_posts.new_images[0]);
    } else {
      form.append('image', use_posts.saved_images[0].image);
    }
  } else {
    form.append('image', use_posts.saved_images[0].image);
  }

  await useFetch('advertisements?_method=PUT',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user_store.token}`,
      'Accept': 'application/json'
    },
    body: form,
    baseURL: config.public.API,
    onResponse({ response }) {
      Swal.hideLoading();
      const res = response._data;
      console.log(res)
      if(res.code === 200 ) {
        use_posts.$reset();
        Swal.fire({
          icon: 'success',
          text:  `${res.message}`,
          showConfirmButton: false,
          timer: 4000
        });
        step.value = 5;
        setTimeout(() => {
          useRouter().push("/profile?tab=anuncio");
        }, 3000);
      }

      if(res.code === 400) {
        let errors = response._data.message;
        if(typeof errors === 'string') {
          Swal.fire({
            icon: 'error',
            text:  `${errors}`,
            timer: 4000
          });
        } else {
          Swal.fire({
            icon: 'error',
            html: '<ul></ul>',
            didOpen: () => {
              const b = Swal.getHtmlContainer().querySelector('ul');
              Object.keys(errors).forEach(clave => {
                const li = document.createElement('li');
                li.classList.add('text-primary-100', 'text-left', 'text-sm', 'mb-2')
                li.textContent = errors[clave];
                b.appendChild(li);
              });
            },
          });
        }
      }
    }    
  });
};

</script>

<template>
  <section>
    <nav class="bg-[#F0F0F073] shadow-inner">
      <div class="steps-wrapper">
        <div class="active">
          <span>1</span>
          <p>Categoría</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 2}]">
        <div  :class="[{active: step >= 2}]">
          <span>2</span>
          <p>Paquete</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 3}]">
        <div :class="[{active: step >= 3}]">
          <span>3</span>
          <p>Detalles</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step >= 4}]">
        <div :class="[{active: step >= 4}]">
          <span>4</span>
          <p>Fotos</p>
        </div>
        <hr class="progress-bar" :class="[{progress: step === 5}]">
        <div class="last-step">
          <AtomsIcon name="general/slim-check" />
          <p>Finalizado</p>
          <hr class="hidden lg:block border-primary-90 border w-12 ml-2" :class="[{'w-20': step === 5}]">
          <img v-if="step < 5" class="hidden lg:block w-[177px]" :src="`/img/PostVehicle/step-${step}.png`" alt="Vehicle">
        </div>
      </div>
    </nav>
    <!-- 1 -->
    <KeepAlive>
      <PopulationEditVehiclesStep1 v-if="step === 1" @nexts="step = 2" @back="step--" />
    </KeepAlive>
    <!-- 2 -->
    <KeepAlive>
      <PopulationEditVehiclesStep2 v-if="step === 2" @nexts="step = 3" @back="step--" />
    </KeepAlive>
    <!-- 3 -->
    <KeepAlive v-if="property">
      <PopulationEditVehiclesStep3 v-if="step === 3"
        @nexts="step = 4"
        @back="step--"
        :countryId="property.property.country_id"
        :sectorId="property.property.town_id"
        :cityId="property.property.city_id"
      />
    </KeepAlive>
    <!-- 4 -->
    <KeepAlive>
      <PopulationEditVehiclesStep4 v-if="step === 4" @back="step--" />
    </KeepAlive>
    <!-- 5 -->
    <PopulationEditVehiclesStep5 v-if="step === 5" />
    <nav class="control-steps-PostVehicle">
      <AtomsButtons v-if="step === 4" @click="createAdvertisement()">
        Actualizar Anuncio
      </AtomsButtons>
    </nav>
  </section>
</template>

<style lang="postcss" scoped>
.steps-wrapper {
  @apply flex justify-center items-center lg:h-48 h-20 w-full max-w-[1440px] mx-auto md:px-8;
  & div{
    @apply flex items-center flex-none whitespace-nowrap gap-2 lg:pl-5 md:pl-3 first:pl-0;
    & p {
      @apply hidden md:block text-[#888888];
    }
    & span {
      @apply border border-[#bababa] text-[#bababa] rounded-full w-8 h-8 flex flex-none justify-center items-center; 
    }
  }
}
.progress-bar{
  @apply border-[#bababa] border w-3 md:w-full md:ml-5
}
.progress{
  @apply border-primary-90
}

.active {
  & p{ @apply text-neutral-black !important; }
  & span{ @apply text-neutral-white bg-primary-90 border-none !important; }
}

.last-step {
  & p{ @apply hidden lg:block text-neutral-black !important; }
  & span{ @apply text-primary-100 border-primary-100 !important; }
}
</style>