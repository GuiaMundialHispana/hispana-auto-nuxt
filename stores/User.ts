import { defineStore, acceptHMRUpdate } from 'pinia';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      config: useRuntimeConfig(),
      userData: {
        id: Number,
        name: '',
        lastname: '',
        birthdate: '',
        country_id: Number,
        cellphone: Number,
        phone: Number,
        email: '',
        profile_pic: null
      },
      getEmail: '',
      nextStep: false,
      emailPassword: '',
      passwordToken: '',
      newPassword: '',
      repeatPassword: '',
      token: ''
    }
  },
  actions: {
    async getGoogle(){
      const { data,error }  = await useFetch(this.$config.public.API+'auth/social/google',{
        method: 'GET',
        headers: {
          'access-control-allow-origin': "*",
          'Content-Type':"application/json",
          'Accept': "application/json",
        }

      });
      const res = error;
      const res2 = data;
    },
    async sendPassWordEmail() {
      const { data, pending } = await useFetch('auth/forgot-password',{
        method: 'POST',
        baseURL: this.config.public.API,
        body: {
          email: this.getEmail
        },
        onResponseError({ request, response, options }) {
          const res = response._data;
          Swal.fire({
            icon: 'error',
            text: res.message,
            showConfirmButton: false,
            timer: 3000
          });
        },
      });
      if(data.value.status === true ) {
        this.nextStep = true;
        Swal.hideLoading();
      }
    },
    async changePassword() {
      const { data }  = await useFetch(useRuntimeConfig().API+'auth/change-password',{
        method: 'POST',
        body: {
          email: this.emailPassword,
          password: this.newPassword,
          password_confirmation: this.repeatPassword,
          token: localStorage.getItem('token')
        }
      });

      if(data) {
        Swal.fire({
          icon: 'success',
          title: 'Hemos validado tus datos correctamente, intenta acceder otra vez',
          timer: 3000
        })
        useRouter().push("/");
      }
    },
    async get_user() {
      const { data, error } = await useFetch('auth/profile',{
        method: 'GET',
        baseURL: this.config.public.API,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
      if(data.value != null) {
        let response = data.value;
        let user_response = data.value.results.user;
        console.log(data)

        if(response.code === 200) {
          this.userData = user_response;
        }
      } else {
        console.log(data.value)
        // this.refresh_token();
      }
    },
    async refresh_token() {
      const {data} = await useFetch('auth/refresh',{
        method: 'POST',
        baseURL: this.config.public.API,
        headers: {
          'Authorization': `Bearer ${this.token}`
        },
      });
      // console.log(data);
      if(data.value != null) {
        this.token = data.value.results.access_token;
        localStorage.setItem('token', this.token);

      }
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }