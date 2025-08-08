export default function useRefresh() {
  const token = useState('token');
  
  async function refresh_token() {
    await $fetch('auth/refresh',{
      method: 'POST',
      baseURL: useRuntimeConfig().public.API,
      headers: {
        'Authorization': `Bearer ${token.value}`
      },
      onResponseError({response}) {
        let responseApi = response._data.message;
        if(response.status === 404 || responseApi === "Token invalid or not provided.") {
          console.log('Token invalid or not provided, logging out...');
          useErrorResponseLogOut()
        }
      },
      onResponse({response}) {
        let responseApi = response._data;
        if(responseApi.status === false || responseApi.code !== 200) {
          console.log('Response status false or code not 200, logging out...');
          useErrorResponseLogOut();
        }
        if(responseApi.status === true && responseApi.code === 200) {
          token.value = responseApi.results.access_token;
          localStorage.setItem('token', token.value);
          return responseApi;
        }
      }
    });
  }
  
  return { refresh_token }
}