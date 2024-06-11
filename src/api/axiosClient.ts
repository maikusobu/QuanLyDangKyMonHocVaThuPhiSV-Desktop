import axios, { AxiosRequestHeaders } from 'axios';
import { setupCache } from 'axios-cache-interceptor/dev';

export const axiosClient = setupCache(
  axios.create({
    baseURL: 'https://se104-be-3-e0a6f7e74fba.herokuapp.com/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }),
  {
    methods: ['get', 'post', 'patch', 'delete'],
    cachePredicate: {
      statusCheck: (status) => true,
    },
  }
);
axiosClient.interceptors.request.use((config) => {
  const token = window.electron.store.get('token');
  if (token) {
    config.headers = {
      ...(config.headers as AxiosRequestHeaders),
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

// axiosClient.interceptors.response.use((response) => {
//   if (response && response.data) {
//     return response.data;
//   }
//   if (response.status === 401) {
//     // Handle 401 error
//   }
//   return response;
// });
