<template>
  <article>
    <AtomsButtons
      btn-type="btn-icon"
      icon-name="general/favorite"
      class="favorite-button"
      @click="toggleFavorite()"
      :class="{active: isFavorite}"
      v-if="$route.fullPath != '/profile?tab=anuncio'"
    />
    <NuxtLink
      :to="{
        path: `edit-ad`,
        query: {
          slug: property.slug
        }
      }"
      class="btn-icon small active absolute left-4 z-10 top-1"
      v-if="$route.fullPath === '/profile?tab=anuncio'"
    >
      <AtomsIcon name="general/pencil" class="text-neutral-white" />
    </NuxtLink>
    <NuxtLink :to="property.slug !== '' ? `/search/${property.slug}` : '/resultados?condition=New'">
      <figure class="h-52 bg-gray-10">
        <div class="advertisements" v-if="
          $route.path === '/profile' && statusMessage !== ''"
        >
          <p :class="statusBackground">{{ statusMessage }}</p>
        </div>
        <NuxtImg
          :src="`${property.image}`"
          placeholder="/img/logo-header.png"
          :alt="property.title"
          class="object-cover h-full w-full"
        />
      </figure>
    </NuxtLink>
    <NuxtLink :to="`/search/${property.slug}`">
      <p class="property-title">{{property.title }}</p>
      <!-- Caracteristicas -->
      <MoleculesCharacteristics class="my-3"
        :year="property.year"
        :mileage="property.mileage"
        :location="property.location"
      />
      <!-- Price -->
      <div class="flex items-center gap-2">
        <p class="price-title">Desde:</p>
        <p class="price">US${{formatCurrency(property.price_us)}}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/Auth';
import Swal from 'sweetalert2';
import { useUserStore } from '~/stores/User';

const props = defineProps({
  property: {
    type: Object,
    default: () => ({})
  },
  propertyId: {
    type: Number
  },
  propertyType: {
    type: String,
    default: ''
  },
  statusMessage: {
    type: String,
    default: ''
  },
  statusBackground: {
    type: String,
    default: ''
  }
});

const config = useRuntimeConfig();
const route = useRouter();
const auth = useAuthStore();
const user_store = useUserStore();
const isFavorite = ref(false);
const isLogged = useState('isLogged');

function formatCurrency(price: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price,);
}

const navigation = ref({
  nextEl: `.next-${props.propertyId}`,
  prevEl: `.prev-${props.propertyId}`
});

const token = useState('token');
const addFavorite = async () => {
  const { data, error } = await useFetch('users/favorites', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${token.value}`},
    body: { auto_id: parseInt(props.property.id) },
    baseURL: config.public.API,
    onResponse({ response }) {
      if (response._data.code === 400) {
        Swal.fire({
          icon: 'error',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }

      if (response._data.code === 200) {
        Swal.fire({
          icon: 'success',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
        useUser().getUser()
      }
    },
    onResponseError() {
      Swal.fire({
        icon: 'error',
        text: 'Error al agregar a favoritos',
        showConfirmButton: false,
        timer: 2000
      });
    }
  });
  if (data) { isFavorite.value = true; }
};

const deleteFavorite = async () => {
  const { data } = await useFetch('users/favorites', {
    method: 'delete',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: { auto_id: parseInt(props.property.id) },
    baseURL: config.public.API,
    onResponse({ response }) {
      if (response._data.code === 400) {
        Swal.fire({
          icon: 'error',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }

      if (response._data.code === 200) {
        isFavorite.value = false;
        Swal.fire({
          icon: 'success',
          text: response._data.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  });
  if (data) { isFavorite.value = false; }
};

const toggleFavorite = () => {
  if (isLogged.value) {
    if (isFavorite.value) {
      deleteFavorite();
    } else {
      addFavorite();
    }
  } else {
    Swal.fire({
      icon: 'error',
      text: 'Necesitas iniciar sesión para poder agregar esta propiedad a favoritos',
      showConfirmButton: true,
      timer: 2000
    });
  }
};

onMounted(() => {
  if (useRoute().fullPath === "/profile?tab=favorite") {
    isFavorite.value = true;
  }
});
</script>

<!--<script>-->
<!--import { useAuthStore } from '~/stores/Auth';-->
<!--import Swal from 'sweetalert2';-->
<!--import { useUserStore } from '~/stores/User';-->
<!--import useUser from "~/composables/useUser";-->

<!--export default {-->
<!--  props: {-->
<!--    property: {-->
<!--      type: Object,-->
<!--      default: () => {}-->
<!--    },-->
<!--    isFavorite: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    },-->
<!--    propertyId: {-->
<!--      type:Number-->
<!--    },-->
<!--    statusMessage: {-->
<!--      type: String,-->
<!--      default: ''-->
<!--    },-->
<!--    statusBackground: {-->
<!--      type: String,-->
<!--      default: ''-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      config: useRuntimeConfig(),-->
<!--      route: useRouter(),-->
<!--      auth: useAuthStore(),-->
<!--      user_store: useUserStore(),-->
<!--      isFavorite: false-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    showParsedPrice(price) {-->
<!--      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");-->
<!--    },-->
<!--    async addFavorite() {-->
<!--      const {data} = await useFetch('users/favorites',{-->
<!--        method: 'post',-->
<!--        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},-->
<!--        body: { auto_id: parseInt(this.propertyId)},-->
<!--        baseURL: this.config.public.API,-->
<!--        onResponse({response}) {-->
<!--          if(response._data.code === 400 ) {-->
<!--            Swal.fire({-->
<!--              icon: 'error',-->
<!--              text: response._data.message,-->
<!--              showConfirmButton: false,-->
<!--              timer: 2000-->
<!--            });-->
<!--          }-->

<!--          if(response._data.code === 200) {-->
<!--            Swal.fire({-->
<!--              icon: 'success',-->
<!--              text: response._data.message,-->
<!--              showConfirmButton: false,-->
<!--              timer: 2000-->
<!--            });-->
<!--            useUser().getUser();-->
<!--          }-->
<!--        }-->
<!--      });-->
<!--      if(data) { this.isFavorite = true; }-->
<!--    },-->
<!--    async deleteFavorite() {-->
<!--      const {data} = await useFetch('users/favorites',{-->
<!--        method: 'delete',-->
<!--        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},-->
<!--        body: { auto_id: parseInt(this.propertyId)},-->
<!--        baseURL: this.config.public.API,-->
<!--        onResponse({response}) {-->
<!--          if(response._data.code === 400 ) {-->
<!--            Swal.fire({-->
<!--              icon: 'error',-->
<!--              text: response._data.message,-->
<!--              showConfirmButton: false,-->
<!--              timer: 2000-->
<!--            });-->
<!--          }-->

<!--          if(response._data.code === 200) {-->
<!--            this.isFavorite = false;-->
<!--            Swal.fire({-->
<!--              icon: 'success',-->
<!--              text: response._data.message,-->
<!--              showConfirmButton: false,-->
<!--              timer: 2000-->
<!--            });-->
<!--          }-->
<!--        }-->
<!--      });-->
<!--      if(data) { this.isFavorite = false; }-->
<!--    },-->
<!--    toggleFavorite() {-->
<!--      if(this.auth.isLoggedIn) {-->
<!--        if(this.isFavorite) {-->
<!--          this.deleteFavorite();-->
<!--        } else {-->
<!--          this.addFavorite();-->
<!--        }-->

<!--      } else {-->
<!--        this.$swal.fire({-->
<!--          icon: 'error',-->
<!--          text: 'Necesitas iniciar sesion para poder agregar esta propiedad a favoritos',-->
<!--          showConfirmButton: true,-->
<!--          timer: 2000-->
<!--        });-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    if(useRoute().fullPath === "/profile?tab=favorite") {-->
<!--      this.isFavorite = true;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="postcss" scoped>
article {
  @apply rounded-2xl bg-neutral-white p-2 w-full relative;

  &:hover { box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.07); }

  & > button.favorite-button {
    @apply absolute right-4 top-4 z-[5] bg-neutral-white border border-primary-50 hover:bg-primary-90 text-[#ADADAD] hover:text-neutral-white !important;
    &.active { @apply bg-primary-100 text-neutral-white hover:bg-primary-90 !important; }
  }

  & > a, & h6 { @apply font-semibold text-neutral-black mt-3 text-base block; }

  & .property-title {
    @apply overflow-hidden truncate whitespace-nowrap w-11/12;
  }

  & .address { @apply flex items-start font-normal text-neutral-black my-3 overflow-hidden truncate whitespace-nowrap w-11/12; }

  & .price-title { @apply text-sm text-neutral-black font-normal; }
  & .price { @apply text-primary-100 font-semibold text-xl uppercase; }

  & .swiper:hover > nav { @apply flex; }

  & nav { @apply hidden absolute top-1/2 z-10 w-full justify-between px-4; 
  & button { @apply bg-neutral-white hover:bg-primary-100 border-none !important; }
  }
  & .advertisements{
    @apply absolute z-20 text-neutral-white top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-40 bg-neutral-white;
    & p {
      @apply py-1.5 px-[15px] rounded-lg text-base w-fit text-center min-w-[209px];
    }
  }

  & .btn-icon {
    @apply bg-primary-100 inline-flex justify-center items-center no-underline cursor-pointer duration-300 focus:outline-none hover:bg-primary-90 ;

    &.small { @apply w-8 rounded-full h-8; }
  }

}
</style>
