import {URL} from '@/constants';
import {store} from '@/redux/store';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const baseQueryNoAuth = fetchBaseQuery({
  baseUrl: URL,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: async headers => {
    const token = store.getState().user?.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
