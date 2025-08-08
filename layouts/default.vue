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

<script setup lang="ts">
import { onMounted } from 'vue'
import useRefresh from '~/composables/RefreshToken';;

const { refresh_token } = useRefresh();
const route = useRoute();
const refer = useState<string>('refer', () => '');
const isLogged = useState('isLogged');

if(import.meta.client) {
  let tokenReferClient = localStorage.getItem('ref');

  if(route.query.ref) {
    localStorage.setItem('ref', route.query.ref);
    refer.value = route.query.ref;
  }

  if(tokenReferClient) {
    refer.value = tokenReferClient;
  }
}

onMounted(() => {
  const handleBeforeUnload = () => {
    localStorage.removeItem('ref');
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });
})
</script>