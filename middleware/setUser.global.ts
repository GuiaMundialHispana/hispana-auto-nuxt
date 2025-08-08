import useUser from "~/composables/useUser";
import useRefresh from "~/composables/RefreshToken";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const isLogged = useState('isLogged');
  const token = useState('token');
  const { refresh_token } = useRefresh();
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
    
    setInterval(async () => {
      if(isLogged.value) {
        await refresh_token();
      }
    }, 2400000); // 40 minutos en milisegundos
  }
});
