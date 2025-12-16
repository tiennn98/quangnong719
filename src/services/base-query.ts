import {URL} from '@/constants';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import type {RootState} from '@/redux/store';

export const baseQueryNoAuth = fetchBaseQuery({baseUrl: URL});

export const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers, {getState}) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {headers.set('Authorization', `Bearer ${token}`);}
    return headers;
  },
});
