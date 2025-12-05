import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { URL } from '@/constants';
import { store } from '@/redux/store';
import { logout, setTokens } from '@/redux/slices/authSlice';

export const axiosClient = axios.create({
  baseURL: URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else if (token) {
      if (!p.config.headers) {p.config.headers = {};}
      (p.config.headers as any).Authorization = `Bearer ${token}`;
      p.resolve(axiosClient(p.config));
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  config => {
    const state: any = store.getState();
    const token = state.auth?.accessToken;
    if (token) {
      if (!config.headers) {config.headers = {};}
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      const state: any = store.getState();
      const refreshToken = state.auth?.refreshToken;

      if (!refreshToken) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalConfig });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const newAccess = (res.data as any).access_token;
        // const newRefresh = (res.data as any).refresh_token ?? refreshToken;

        store.dispatch(
          setTokens({
            accessToken: newAccess,
            // refreshToken: newRefresh,
          }),
        );

        if (!originalConfig.headers) {originalConfig.headers = {};}
        (originalConfig.headers as any).Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);
        isRefreshing = false;

        return axiosClient(originalConfig);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
