<template>
  <div class="flex flex-wrap gap-2 xl:flex-row flex-col">
    <!-- Marca -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('brand')" :class="{'active': dropdownLists.brand}">
        <AtomsIcon name="general/car" class="text-primary-100" :size=20  />
        <p>{{ property_name != '' ? property_name : 'Marca' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('brand')" v-if="dropdownLists.brand" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
            <input type="radio" class="checkbox" :value="category.id" :id="category.name" v-model="selectedCategories" @click="property_name = category.name">
            {{category.name}}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Modelo -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('model')" :class="{'active': dropdownLists.model}">
        <AtomsIcon name="general/car_model" class="text-primary-100" :size=20  />
        <p>{{ property_name != '' ? property_name : 'Modelo' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('model')" v-if="dropdownLists.model" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
            <input type="radio" class="checkbox" :value="category.id" :id="category.name" v-model="selectedCategories" @click="property_name = category.name">
            {{category.name}}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Versión -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('version')" :class="{'active': dropdownLists.version}">
        <AtomsIcon name="general/car_version" class="text-primary-100" :size=20  />
        <p>{{ property_name != '' ? property_name : 'Versión' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('version')" v-if="dropdownLists.version" class="dropdown w-full sm:w-[230px] h-fit">
        <div class="dropdown-wrapper scrollbar border-none min-h-max max-h-[273px]">
          <label class="checkbox-labels" :for="category.name" v-for="category in categories" :key="category">
            <input type="radio" class="checkbox" :value="category.id" :id="category.name" v-model="selectedCategories" @click="property_name = category.name">
            {{category.name}}
          </label>
        </div>
      </OnClickOutside>
    </div>
    <!-- Año -->
    <div class="filter-content items-center">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('year')" :class="{'active': dropdownLists.year}">
        <AtomsIcon name="general/calendar" class="text-primary-100" :size=20  />
        <p>{{ property_name != '' ? property_name : 'Año' }}</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('year')" v-if="dropdownLists.year" class="dropdown w-[238px] h-fit">
        <p>
          Año
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="minYear"
          :max="maxYear"
          :step="1"
          :ruler="false"
          :label="false"
          :minValue="minYearValue"
          :maxValue="maxYearValue"
          @input="UpdateYears"
        />
        <p class="whitespace-normal text-sm font-medium">
          Desde <b>{{ minYearValue }}</b>
          hasta <b>{{ maxYearValue }}</b>
        </p>
        </OnClickOutside>
    </div>
    <!-- Price -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('priceRange')" :class="{'active': dropdownLists.priceRange}">
        <AtomsIcon name="general/price" class="text-primary-100" :size=20  />
        <p>Precio</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('priceRange')" v-if="dropdownLists.priceRange" class="dropdown md:w-[238px] h-fit">
        <p class="flex justify-between text-base text-neutral-black">
          Precio
          <label for="RD" class="price-btn ml-auto">
            <input type="radio" id="RD" value="RD" name="currency" v-model="currency_picked" checked>
          </label>
          <label for="USD" class="price-btn">
            <input type="radio" id="USD" value="USD" name="currency" v-model="currency_picked">
          </label>
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="0"
          :max="maxPrice"
          :step="priceRangeSteps"
          :ruler="false"
          :label="false"
          :minValue="priceMinValue"
          :maxValue="priceMaxValue"
          @input="UpdatePrice"
        />
        <p class="whitespace-normal text-sm font-medium max-w-[200px] ">
          Desde <b>{{currency_picked}}${{ showpriceMinValue }}</b>
          hasta <b>{{currency_picked}}${{ showpriceMaxValue }}</b>+
          {{publishedBooksMessage  }}
        </p>
      </OnClickOutside>
    </div>
    <!-- Mileage -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('mileageRange')" :class="{'active': dropdownLists.mileageRange}">
        <AtomsIcon name="general/mileage" class="text-primary-100" :size=20  />
        <p>Kilometraje</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('mileageRange')" v-if="dropdownLists.mileageRange" class="dropdown md:w-[238px] h-fit">
        <p class="flex justify-between text-base text-neutral-black">
          Kilometraje
          <label for="KM" class="price-btn ml-auto mileage-btn">
            <input type="radio" id="KM" value="KM" name="mileage" v-model="mileage_picked" checked>
          </label>
          <label for="M" class="price-btn mileage-btn">
            <input type="radio" id="M" value="M" name="mileage" v-model="mileage_picked">
          </label>
        </p>
        <MultiRangeSlider class="mx-auto mt-[14px] md:w-[200px]"
          baseClassName="multi-range-slider-bar-only"
          :min="0"
          :max="maxMileage"
          :step="5000"
          :ruler="false"
          :label="false"
          :minValue="mileageMinValue"
          :maxValue="mileageMaxValue"
          @input="UpdateMileage"
        />
        <p class="whitespace-normal text-sm font-medium max-w-[200px] ">
          Desde <b>{{ showMileageMinValue }} {{mileage_picked}}</b>
          hasta <b>{{ showMileageMaxValue }} {{mileage_picked}}</b>+
        </p>
      </OnClickOutside>
    </div>
    <!-- Category -->
    <div class="filter-content">
      <button class="flex gap-2.5 filter-btn" @click="toggleList('category')" :class="{'active': dropdownLists.category}">
        <AtomsIcon name="general/car_category" class="text-primary-100" :size=20 />
        <p>Categoria</p>
        <AtomsIcon name="arrows/arrow-down" class="text-primary-100" :size=15 />
      </button>
      <OnClickOutside @trigger="toggleList('category')" v-if="dropdownLists.category" class="dropdown w-full sm:w-[230px] h-fit">
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
        brand: false,
        model: false,
        version: false,
        year: false,
        priceRange: false,
        mileageRange: false,
        country: false,
        status: false,
        category: false
      },
      priceMinValue:0,
      priceMaxValue:10000000,
      showpriceMinValue: '0',
      showpriceMaxValue:"10,000,000",
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
      currency_picked:'RD',
      price:'',
      priceRangeSteps: 500000,
      status:'',
      queryBody: {},
      filter:true,
      features: [],
      seletedFeatured: [],
      categories: [],
      selectedCategories: [],
      minYear: 1998,
      maxYear: 2024,
      minYearValue: 2007,
      maxYearValue: 2021,
      year: '',
      mileage: '',
      mileage_picked: 'KM',
      maxMileage: 150000,
      mileageMinValue: 0,
      mileageMaxValue: 50000,
      showMileageMinValue: '0',
      showMileageMaxValue: "50,000",
    }
  },
  components: {
    MultiRangeSlider
  },
  methods: {
    UpdatePrice(e) {
      this.priceMinValue = e.minValue;
      this.priceMaxValue = e.maxValue;
      this.showpriceMinValue = this.priceMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.showpriceMaxValue = this.priceMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.price = this.priceMinValue.toString() + '-' + this.priceMaxValue.toString();
    },
    UpdateYears(e) {
      this.minYearValue = e.minValue;
      this.maxYearValue = e.maxValue;
      this.year = this.minYearValue.toString() + '-' + this.maxYearValue.toString();
    },
    UpdateMileage(e) {
      this.mileageMinValue = e.minValue;
      this.mileageMaxValue = e.maxValue;
      this.showMileageMinValue = this.mileageMinValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.showMileageMaxValue = this.mileageMaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.mileage = this.mileageMinValue.toString() + '-' + this.mileageMaxValue.toString();
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
      // this.currency_picked = null;
      // this.status = null;
      delete this.queryBody.bedroom;
      delete this.queryBody.bathroom;
      delete this.queryBody.parking;
      delete this.queryBody.property_status;
      delete this.queryBody.country_id;
      delete this.queryBody.town_id;
      delete this.queryBody.city_id;
      delete this.queryBody.currency_picked;
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
    currency_picked(newPicked) {
      this.queryBody.price_type = newPicked;
      this.$emit('sendProperties', this.queryBody);
      if (newPicked === 'USD') {
        this.priceMinValue = 0,
        this.priceMaxValue = 1000000,
        this.showpriceMinValue = '0';
        this.showpriceMaxValue = '1,000,000';
        this.maxPrice = 3000000;
        this.priceRangeSteps = 50000;
      } else{
        this.priceMinValue = 0,
        this.priceMaxValue = 10000000,
        this.showpriceMinValue = '0';
        this.showpriceMaxValue = '10,000,000';
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
    this.queryBody.price_type = this.currency_picked;
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
  @apply flex justify-between w-full 2xl:w-[160px] items-center border-2 rounded-lg border-gray-100 mt-2.5 font-normal text-sm leading-[22px] h-10 px-2.5 first:mt-0 hover:bg-primary-50 hover:border-primary-100 bg-neutral-white whitespace-nowrap mx-auto text-neutral-black !important;
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

.mileage-btn:first-child {
  & input { @apply after:content-['KM'] border-r-0 rounded-tr-none rounded-br-none; }
}

.mileage-btn:last-child {
  & input { @apply after:content-['M'] rounded-tl-none rounded-bl-none; }
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