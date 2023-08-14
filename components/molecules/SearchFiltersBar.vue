<template>
  <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
    <!-- Direccion -->
    <div class="filter-content flex-row relative">
      <button class="flex gap-2.5 filter-btn w-full" @click="toggleList('location')" :class="{'active': dropdownLists.location}">
        <AtomsIcon name="general/sector" class="text-primary-100" :size=20  />
        <p>{{ country_name != '' ? country_name : 'Ubicacion'}}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('location')" class="dropdown w-full sm:w-[240px] h-fit z-20" v-if="dropdownLists.location">
        <button class="sector-filter-btn" :class="{'active': dropdownLists.country}" @click="toggleList('country')">
          Pais <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
        </button>
        <OnClickOutside @trigger="toggleList('country')" v-if="dropdownLists.country">
          <div class="dropdown-wrapper scrollbar min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="country.name" v-for="country in countries" :key="country">
              <input
                type="radio"
                class="checkbox"
                name="country"
                v-model="country_id"
                :value="country.id"
                :id="country.name"
                @click="country_name = country.name"
              >
              {{ country.name }}
            </label>
          </div>
        </OnClickOutside>
        <!--  -->
        <button v-if="states.length > 0" class="sector-filter-btn" :class="{'active': dropdownLists.sector}" @click="toggleList('sector')">
          Ciudad <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16 />
        </button>
        <OnClickOutside @trigger="toggleList('sector')" v-if="dropdownLists.sector">
          <div class="dropdown-wrapper scrollbar min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="sector.name" v-for="sector in states" :key="sector">
              <input
                type="radio"
                class="checkbox"
                name="sector"
                v-model="state_id"
                :value="sector.id"
                :id="sector.name"
              >
              {{ sector.name }}
            </label>
          </div>
        </OnClickOutside>
        <!--  -->
        <button v-if="cities.length > 0" class="sector-filter-btn" :class="{'active': dropdownLists.city}" @click="toggleList('city')">
          Sector <AtomsIcon class="text-primary-100" name="arrows/arrow-down" :size=16></AtomsIcon>
        </button>
        <OnClickOutside @trigger="toggleList('city')" v-if="dropdownLists.city">
          <div class="dropdown-wrapper scrollbar min-h-max max-h-[273px]">
            <label class="checkbox-labels" :for="city.name" v-for="city in cities" :key="city">
              <input
                type="radio"
                class="checkbox"
                name="city"
                v-model="city_id"
                :value="city.id"
                :id="city.name"
              >
              {{ city.name }}
            </label>
          </div>
        </OnClickOutside>
      </OnClickOutside>
    </div>
    <!-- Tipo de inmueble -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('propertyType')" :class="{'active': dropdownLists.propertyType}">
        <AtomsIcon name="general/property" class="text-primary-100" :size=20  />
        <p>{{ property_name != '' ? property_name : 'Inmueble' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('propertyType')" v-if="dropdownLists.propertyType" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
            <input type="radio" class="checkbox" :value="category.id" :id="category.name" v-model="selectedCategories" @click="property_name = category.name">
            {{category.name}}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Habitaciones -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('bedroom')" :class="{'active': dropdownLists.bedroom}">
        <AtomsIcon name="general/bed" class="text-primary-100" :size=20  />
        <p>{{ bedroomQuantity != 0 ? bedroomQuantity : 'Habitaciones' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('bedroom')" v-if="dropdownLists.bedroom" class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit 2xl:w-[220px] w-full" >
        <p class="mb-[5px]">Cantidad de habitaciones</p>
        <div class="flex flex-nowrap">
          <label class="property-quantity-btn" :class="{'active':(bedroomQuantity == 1)}">
            <input type="radio" value='1' v-model="bedroomQuantity">1
          </label>
          <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 2)}">
            <input type="radio" value='2' v-model="bedroomQuantity">2
          </label>
          <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 3)}">
            <input type="radio" value='3' v-model="bedroomQuantity">3
          </label>
          <label class="property-quantity-btn" :class="{'active': (bedroomQuantity == 4)}">
            <input type="radio" value='4' v-model="bedroomQuantity">4<span class="text-primary-100">+</span>
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Bathroom -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('bathroom')" :class="{'active': dropdownLists.bathroom}">
        <AtomsIcon name="general/bathtub" class="text-primary-100" :size=20  />
        <p>{{ bathroomQuantity != 0 ? bathroomQuantity : 'Baños' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('bathroom')" v-if="dropdownLists.bathroom"  class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit w-full 2xl:w-[170px]" >
        <p class="mb-[5px]">Cantidad de baños</p>
        <div class="flex flex-nowrap">
          <label class="property-quantity-btn" :class="{'active':(bathroomQuantity == 1)}">
            <input type="radio" value=1 v-model="bathroomQuantity">1
          </label>
          <label class="property-quantity-btn" :class="{'active': (bathroomQuantity == 2)}">
            <input type="radio" value=2 v-model="bathroomQuantity">2
          </label>
          <label class="property-quantity-btn" :class="{'active': (bathroomQuantity == 3)}">
            <input type="radio" value=3 v-model="bathroomQuantity">3<span class="text-primary-100">+</span>
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Parking -->
    <div class="filter-content">
      <button class="flex relative gap-2.5 filter-btn" @click="toggleList('parkingLot')" :class="{'active': dropdownLists.parkingLot}">
        <AtomsIcon name="general/car" class="text-primary-100" :size=20  />
        <p>{{ parkingLotQuantity != 0 ? parkingLotQuantity : 'Parqueo' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('parkingLot')" v-if="dropdownLists.parkingLot" class="dropdown text-sm leading-[22px] 2xl:absolute top-[95%] mt-[5px] h-fit w-full 2xl:w-[190px]" >
        <p class="mb-[5px]">Cantidad de parqueos</p>
        <div class="flex">
          <label class="property-quantity-btn" :class="{'active':(parkingLotQuantity == 1)}">
            <input type="radio" value=1 v-model="parkingLotQuantity">1
          </label>
          <label class="property-quantity-btn" :class="{'active': (parkingLotQuantity == 2)}">
            <input type="radio" value=2 v-model="parkingLotQuantity">2
          </label>
          <label class="property-quantity-btn" :class="{'active': (parkingLotQuantity == 3)}">
            <input type="radio" value=3 v-model="parkingLotQuantity">3<span class="text-primary-100">+</span>
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Price -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('priceRange')" :class="{'active': dropdownLists.priceRange}">
        <AtomsIcon name="general/price" class="text-primary-100" :size=20  />
        <p>Rango de precio</p>
        <!-- <p>{{ showBarMinValue > 0 ? `${showBarMinValue}-${showBarMaxValue}` : 'Rango de precio' }}</p> -->
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('priceRange')" v-if="dropdownLists.priceRange" class="dropdown md:w-[238px] h-fit">
        <p class="flex justify-between text-base text-neutral-black">
          Precio
          <label for="RD" class="price-btn ml-auto">
            <input type="radio" id="RD" value="RD" name="currency" v-model="picked" checked>
          </label>
          <label for="USD" class="price-btn">
            <input type="radio" id="USD" value="USD" name="currency" v-model="picked">
          </label>
        </p>
        <!--  -->
        <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="0"
          :max="maxPrice"
          :step="priceRangeSteps"
          :ruler="false"
          :label="false"
          :minValue="barMinValue"
          :maxValue="barMaxValue"
          @input="UpdateValues"
        />
        <p class="whitespace-normal text-sm font-medium max-w-[200px] ">
          Desde <b>{{picked}}${{ showBarMinValue }}</b>
          hasta <b>{{picked}}${{ showBarMaxValue }}</b>+
          {{publishedBooksMessage  }}
        </p>
      </OnClickOutside>
    </div>
    <!-- status -->
    <div class="filter-content" :class="{'modal-open': dropdownLists.status}">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('status')" :class="{'active': dropdownLists.status}">
        <AtomsIcon name="general/status" class="text-primary-100" :size=20  />
        <p>{{ status != '' ? status : 'Estado' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('status')" v-if="dropdownLists.status" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper border-none scrollbar mt-[5px] min-h-max max-h-[273px]">
          <label class="checkbox-labels" for="New">
            <input type="radio" class="checkbox" name="status" v-model="status" value="New" id="New">
            Nuevo
          </label>
          <label class="checkbox-labels" for="Used">
            <input type="radio" class="checkbox" name="status" v-model="status" value="Used" id="Used">
            Usado
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Featured -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('other')" :class="{'active': dropdownLists.other}">
        <AtomsIcon name="general/tune" class="text-primary-100" :size=20 />
        <p>Otros</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('other')" v-if="dropdownLists.other" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="feature.name" v-for="feature in features" :key="feature">
            <input type="checkbox" class="checkbox" :value="feature.id" :id="feature.name" v-model="seletedFeatured">
            {{feature.name}}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <button class="search-button" @click="clearFilter()" v-if="filter">
      <p class="xl:hidden mr-3 font-semibold">Borrar filtros</p>
      <AtomsIcon name="general/close" :size=17  />
    </button>
    <!-- <button @click="clearFilter();" v-if="filter" class="flex items-center">
      <p class="xl:hidden mr-3 font-semibold">Borrar filtros</p>
      <AtomsIcon name="general/close" :size=17  />
    </button> -->
  </div>
</template>

<script setup>
import { OnClickOutside } from '@vueuse/components';
</script>

<script>
import  MultiRangeSlider  from "multi-range-slider-vue";
export default {
  data() {
    return {
      route: useRoute(),
      config:useRuntimeConfig(),
      dropdownLists: {
        location: false,
        propertyType: false,
        priceRange: false,
        country: false,
        city: false,
        municipality: false, 
        sector: false,
        status: false,
        other: false
      },
      barMinValue:0,
      barMaxValue:10000000,
      showBarMinValue: '0',
      showBarMaxValue:"10,000,000",
      maxPrice: 50000000,
      countries: [],
      country_id:0,
      country_name: '',
      property_name: '',
      features_name: '',
      cities:[],
      city_id:0,
      states:[],
      state_id:0,
      picked:'RD',
      price:'',
      priceRangeSteps: 500000,
      bedroomQuantity:0,
      bathroomQuantity:0,
      parkingLotQuantity:0,
      status:'',
      queryBody: {},
      filter:true,
      features: [],
      seletedFeatured: [],
      categories: [],
      selectedCategories: []
    }
  },
  components: {
    MultiRangeSlider
  },
  methods: {
    UpdateValues(e) {
      this.barMinValue = e.minValue;
      this.barMaxValue = e.maxValue;
      this.showBarMinValue = this.barMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.showBarMaxValue = this.barMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.price = this.barMinValue.toString() + '-' + this.barMaxValue.toString();
    },
    toggleList(list) {
      if (this.dropdownLists[list]) {
        setTimeout(() => {
          this.dropdownLists[list] = false;
        }, 50);
      } else { this.dropdownLists[list] = true; }
    },
    async getCountries() {
      const countriesApi = await $fetch(this.config.public.API+'generals/countries');
      countriesApi.results.data.forEach(element => {
        if(element.id === 63 || element.id === 236) {
          this.countries.push(element)
        }
      });
    },
    async getFeatures() {
      const featuresApi = await $fetch(this.config.public.API+'generals/features');
      this.features = featuresApi.results;
    },
    async getCategories() {
      const categoriesApi = await $fetch(this.config.public.API+'generals/categories');
      this.categories = categoriesApi.results;
    },
    async getStates(country_id) {
      const statesApi = await $fetch(this.config.public.API+'generals/states/'+`${country_id}`);
      this.states = statesApi.results.data;
    }, 
    async getCities(state_id) {
      const citiesApi = await $fetch(this.config.public.API+'generals/cities/'+`${state_id}`);
      this.cities = citiesApi.results.data;
    },
    clearFilter() {
      // this.price = '';
      // this.bedroomQuantity = 0;
      // this.bathroomQuantity = null;
      // this.parkingLotQuantity = null;
      // this.country_id = null;
      // this.state_id = null;
      // this.city_id = null;
      // this.picked = null;
      // this.status = null;
      delete this.queryBody.bedroom;
      delete this.queryBody.bathroom;
      delete this.queryBody.parking;
      delete this.queryBody.property_status;
      delete this.queryBody.country_id;
      delete this.queryBody.town_id;
      delete this.queryBody.city_id;
      delete this.queryBody.picked;
      delete this.queryBody.price;
      delete this.queryBody.feature_ids;
      delete this.queryBody.property_category_id;
      this.country_name = '';
      this.property_name = '';
      this.bedroomQuantity = 0;
      this.$emit('sendProperties', this.queryBody);
    }
  },
  watch: {
    picked(newPicked) {
      this.queryBody.price_type = newPicked;
      this.$emit('sendProperties', this.queryBody);
      if (newPicked === 'USD') {
        this.barMinValue = 0,
        this.barMaxValue = 1000000,
        this.showBarMinValue = '0';
        this.showBarMaxValue = '1,000,000';
        this.maxPrice = 3000000;
        this.priceRangeSteps = 50000;
      } else{
        this.barMinValue = 0,
        this.barMaxValue = 10000000,
        this.showBarMinValue = '0';
        this.showBarMaxValue = '10,000,000';
        this.maxPrice = 50000000;
        this.priceRangeSteps = 500000;
      }
    },
    bedroomQuantity(bedroomQuantity) {
      this.queryBody.bedroom = bedroomQuantity;
      this.$emit('sendProperties', this.queryBody);
    },
    bathroomQuantity(bathroomQuantity) {
      this.queryBody.bathroom = bathroomQuantity;
      this.$emit('sendProperties', this.queryBody);
    },
    parkingLotQuantity(parkingLotQuantity) {
      this.queryBody.parking = parkingLotQuantity;
      this.$emit('sendProperties', this.queryBody);
    },
    status(status) {
      this.queryBody.property_status = status;
      this.$emit('sendProperties', this.queryBody);
    },
    country_id(country_id) {
      this.getStates(this.country_id);
      this.queryBody.country_id = country_id;
      this.$emit('sendProperties', this.queryBody);
    },
    state_id(state_id) {
      this.getCities(this.state_id);
      this.queryBody.town_id = state_id;
      this.$emit('sendProperties', this.queryBody);
    },
    city_id(city_id) {
      this.queryBody.city_id = city_id;
      this.$emit('sendProperties', this.queryBody);
    },
    price(price) {
      this.queryBody.price = price;
      this.$emit('sendProperties', this.queryBody);
    },
    seletedFeatured(newItemSelected) {
      this.queryBody.feature_ids = newItemSelected;
      this.$emit('sendProperties', this.queryBody);
    },
    selectedCategories(newItemSelected) {
      this.queryBody.property_category_id = newItemSelected;
      this.$emit('sendProperties', this.queryBody);
    }
  },
  mounted() {
    this.getCountries();
    this.getFeatures();
    this.getCategories();
    this.queryBody.price_type = this.picked;
  }
}
</script>

<style lang="postcss" scoped>
.property-quantity-btn {
  @apply m-0 w-full h-10 flex items-center justify-center border-gray-300 border-r border-t border-b first:border-l first:rounded-tl-sm first:rounded-bl-sm last:rounded-tr-sm last:rounded-br-sm hover:bg-primary-50 checked:bg-primary-50;
  &.active {
    @apply bg-primary-50 font-bold text-primary-100;
    & span { @apply text-neutral-black; }
  }

  & input { @apply appearance-none; }
}
.filters-overflow {
  @apply w-full sm:w-fit h-screen 2xl:mt-12 lg:mt-[102px] 2xl:h-fit py-4 2xl:py-0 fixed top-0 md:absolute 2xl:relative 2xl:flex flex-col 2xl:flex-row gap-4 2xl:gap-1.5 md:items-end bg-neutral-white z-[80] right-0 2xl:mr-0 mt-0 px-4 md:px-6 2xl:px-0;
  @media (max-width:1536px) {
    @apply overflow-y-auto overflow-hidden border-l-2 border-l-gray-300;
  }
}
/*  */

.filter-btn {
  @apply flex justify-between w-full items-center border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-primary-50 hover:border-primary-100 bg-neutral-white whitespace-nowrap mx-auto text-neutral-black !important;
  &.active { @apply border-primary-100 bg-neutral-white !important; }
  & p { @apply flex-none !important; }
}

.price-btn {
  @apply cursor-pointer select-none flex items-center font-normal text-xs;

  & input {
    @apply relative appearance-none flex-none w-10 h-5 border border-gray-300 rounded-sm cursor-pointer hover:bg-primary-90 hover:border-none checked:bg-primary-100 checked:hover:bg-gray-300 checked:border-none checked:after:text-neutral-white overflow-hidden
    after:w-full
    after:h-full
    after:flex
    after:justify-center
    after:items-center
    after:hover:text-neutral-white
  }
}

.price-btn:first-child {
  & input { @apply after:content-['RD'] border-r-0 rounded-tr-none rounded-br-none; }
}

.price-btn:last-child {
  & input { @apply after:content-['USD'] rounded-tl-none rounded-bl-none; }
}

.filter-content {
  @apply flex flex-col relative xl:w-fit;
}

.search-button {
  @apply flex bg-primary-100 w-full sm:w-[230px] p-2 h-12 xl:w-10 xl:h-10 rounded-full items-center justify-center hover:bg-primary-90 border-primary-100 border flex-none text-neutral-white;
}

.sector-filter-btn{
  @apply flex justify-between items-center w-full border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-primary-50 hover:border-primary-100;
  &.active{
    @apply border-primary-100 hover:bg-neutral-white;
  }
}

.dropdown{
  @apply bg-neutral-white border-2 border-gray-100 rounded-lg p-2.5 shadow-md xl:absolute min-w-[230px] right-full xl:left-0 xl:top-[95%] mt-[5px] mr-1.5 2xl:mr-0 z-10;
}
</style>