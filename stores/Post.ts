import { defineStore } from "pinia";

export const usePostsStore = defineStore('posts', {
  state:() => {
    return {
      option_selected: '',
      category_id: 0,
      plan_id: 0,
      plan_pictures: 0,
      name: '',
      price: Number || String,
      price_us: Number || String,
      lat: Number || String,
      log: Number || String,
      address: '',
      country: Number || String,
      sector: Number || String,
      city: Number || String,
      bedrooms: Number || String,
      bathrooms: Number || String,
      parking: Number || String,
      property_status: '',
      feature: [],
      meter: '',
      meter_2: '',
      description: '',
      saved_images: [],
      new_images: [],
      new_portada: File || '',
      testPortada: false,
    }
  }
});