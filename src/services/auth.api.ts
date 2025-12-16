import axios from 'axios';
import {URL} from '@/constants/screen-name';
import type {LoginResponse} from '@/hooks/useAuth';
import {persistor, store} from '@/redux/store';
import {logout} from '@/redux/slices/authSlice';
import {queryClient} from './react-query-client';

export const sendOTP = async (
  phone: string,
): Promise<{msg: string; statusCode: number}> => {
  try {
    const res = await axios.post(
      `${URL}/auth/send-otp`,
      {phone_number: phone},
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'Gửi OTP thất bại',
    );
  }
};

export const authLogin = async (
  phone: string,
  otp: string,
): Promise<LoginResponse> => {
  try {
    const res = await axios.post(
      `${URL}/auth/login`,
      {phone_number: phone, otp},
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || error?.message || 'Đăng nhập thất bại',
    );
  }
};
export async function hardLogout() {
  store.dispatch(logout());
  queryClient.clear();
  await persistor.purge();
  return;
}
