import axios, { AxiosRequestHeaders } from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
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
