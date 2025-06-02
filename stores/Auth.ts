import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';
import { useUserStore } from './User';

export const useAuthStore = defineStore('auth', {
  state:() => {
    return {
      isLoggedIn: false,
      email: '',
      password: '',
      config: useRuntimeConfig(),
      token: '',
      route: useRouter(),
      refer: useState('refer')
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}