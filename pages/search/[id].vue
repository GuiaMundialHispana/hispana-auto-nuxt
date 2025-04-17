<template>
  <Head v-if="property">
    <Title>{{ property.auto.title }}</Title>
    <Meta name="title" :content="property.auto.title" />
    <Meta name="description" :content="property.auto.description" />
    <Meta property="og:url" :content="currentUrl" />
    <Meta property="og:type" content="article" />
    <Meta property="og:title" :content="property.auto.title" />
    <Meta property="og:description" :content="property.auto.description" />
    <Meta property="og:image" :content="property.auto.image" />
    <Meta property="og:locale" content="es_ES" />
    <Meta name="twitter:card" :content="property.auto.image" />
    <Meta name="image" :content="property.auto.image" />
  </Head>
  <div v-if="property">
    <PopulationSearchDetailVehicleSlides
      :plan-type="property.plan_id"
      :images="property.auto.images"
    />
    <PopulationSearchDetailVehicleInformation
      :property="property.auto"
      :user="property.user"
    />
    <PopulationSearchDetailVehicleLoan :property="property.auto" class="md:px-14 px-4" />
    <OrganismExploreVehicles :property_id='property.auto.id' />
  </div>
  <div class="p-16" v-if="pending">
    <OrganismSkeleton class="md:h-[560px] h-[360px] max-w-6xl mb-7" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-96 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-24 h-8 mb-2" />
    <OrganismSkeleton class="w-40 h-8 mb-2" />
    <OrganismSkeleton class="w-80 h-8" />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: property, pending, error} = await useLazyFetch(`advertisements/${useRoute().params.id}`, {
  method: 'GET',
  baseURL: config.public.API,
  transform:(_property) => _property.results,
  onResponse({response}){
    if(response.status === 400) {
      return navigateTo('/notFound')
    }
  }
});

const url = useRequestURL();
const route = useRoute();
const origin = computed(() => `${url.protocol}//${url.host}`);
const currentUrl = computed(() => `${origin.value}${route.fullPath}`);
watch(property, () => {
  useSchemaOrg({
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.value.auto.name,
    image: property.value.auto.image,
    description: property.value.auto.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: property.value.auto.price_us,
      itemCondition: 'New',
    }
  })
})
</script>