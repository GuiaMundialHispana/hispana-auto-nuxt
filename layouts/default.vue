<template>
  <div>
    <NuxtLoadingIndicator />
    <OrganismHeader />
    <main class="lg:pt-[102px] pt-16">
      <slot />
    </main>
    <OrganismFooter />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';
import { useUserStore } from '~/stores/User';

export default {
  setup() {
    const user_store = useUserStore();
    const miFuncionGlobal = () => {
      // Tu lógica aquí
      user_store.refresh_token();
      console.log('Función global ejecutada cada 2 minutos')
    }

    onMounted(() => {
      useRefresh(miFuncionGlobal)
    })
  },
}
</script>