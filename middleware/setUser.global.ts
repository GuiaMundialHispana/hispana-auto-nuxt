import { useUserStore } from '~/stores/User';
import { useAuthStore } from '~/stores/Auth';
import useUser from "~/composables/useUser";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const user_store = useUserStore();
  const use_auth = useAuthStore();
  const isLogged = useState('isLogged');
  const token = useState('token');
  const {getUser} = useUser();
  if (import.meta.client) {
    let tokenClient = window.localStorage.getItem('token');
    if (tokenClient) {
      token.value = tokenClient;
      await getUser();
      isLogged.value = true;
    } else {
      isLogged.value = false;
    }
  }
  // if(import.meta.client) {
  //   let get_token = window.localStorage.getItem('token');
  //   if(get_token !== null) {
  //     user_store.token = get_token;
  //     use_auth.isLoggedIn = true;
  //     useState('token', user_store.token);
  //     await useUser().getUser().catch(() => {
  //       use_auth.isLoggedIn = false;
  //       useErrorResponseLogOut();
  //     });
  //   } else {
  //     use_auth.isLoggedIn = false;
  //   }
  // }
});
