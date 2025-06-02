export default defineNuxtRouteMiddleware(()=> {
  const isLogged = useState('isLogged');
  setTimeout(() => {
    if(!isLogged.value) {
      useErrorResponseLogOut();
      return navigateTo('/');
    }
  },100);
})