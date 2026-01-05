// src/services/axiosClient.ts
import { URL } from '@/constants';
import { store } from '@/redux/store';
import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const axiosClient = axios.create({
  baseURL: URL,
  timeout: 15000,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
});

axiosClient.interceptors.request.use(config => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// async function hardLogout() {
//   store.dispatch(logout());
//   await persistor.purge(); // ✅ xoá redux-persist
//   queryClient.clear();    // ✅ xoá cache react-query
// }

axiosClient.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // await hardLogout();
      Alert.alert('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.');
    }
    return Promise.reject(error);
  },
);
