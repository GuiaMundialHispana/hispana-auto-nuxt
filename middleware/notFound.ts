export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/resultados/null' || to.path === '/resultados/undefined') {
    return navigateTo('/notFound')
  }
})