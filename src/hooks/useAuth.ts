import {useMutation} from '@tanstack/react-query';
import {Alert} from 'react-native';
import {useAppDispatch} from '@/redux/store';
import {setAccessToken} from '@/redux/slices/authSlice';
import {authLogin, sendOTP} from '@/services/auth.api';
import { navigate } from '@/navigators';

export type ApiResponse<T> = {
  msg: string;
  statusCode: number;
  data: T;
};

export type LoginDataPayload = {
  access_token: string;
  new_customer: boolean;
};

export type LoginResponse = ApiResponse<LoginDataPayload>;

export const useSendOTP = () => {
  return useMutation({
    mutationFn: (phone: string) => sendOTP(phone),
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, Error, {phone: string; otp: string}>({
    mutationFn: ({phone, otp}) => authLogin(phone, otp),

    onSuccess: (res) => {
      const token = res?.data?.access_token;
      const newCustomer = res?.data?.new_customer;
      if (!token) {
        return;
      }
      dispatch(setAccessToken({accessToken: token, new_customer: newCustomer}));
    },
  });
};
