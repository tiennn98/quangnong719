import { URL } from '@/constants/screen-name';
import type { LoginResponse } from '@/hooks/useAuth';
import { logout } from '@/redux/slices/authSlice';
import { persistor, store } from '@/redux/store';
import axios from 'axios';
import { queryClient } from './react-query-client';

type ApiErrData = {
  msg?: string;
  message?: string;
  statusCode?: number;
};

function toApiError(error: any, fallback: string) {
  const data: ApiErrData | undefined = error?.response?.data;
  const status = error?.response?.status ?? data?.statusCode;

  // ✅ backend của bạn trả "msg" => ưu tiên msg
  const msg =
    data?.msg ||
    data?.message ||
    error?.message ||
    fallback;

  const e = new Error(msg);
  (e as any).statusCode = status; // ✅ để UI bắt 403/401/400…
  (e as any).data = data;
  return e;
}

export const sendOTP = async (
  phone: string,
  action: 'login' | 'delete_account',
): Promise<{ msg: string; statusCode: number }> => {
  try {
    const res = await axios.post(
      `${URL}/auth/send-otp`,
      { phone_number: phone, action },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw toApiError(error, 'Gửi OTP thất bại');
  }
};

export const authLogin = async (
  phone: string,
  otp: string,
): Promise<LoginResponse> => {
  try {
    const res = await axios.post(
      `${URL}/auth/login`,
      { phone_number: phone, otp },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error: any) {
    throw toApiError(error, 'Đăng nhập thất bại');
  }
};

export async function hardLogout() {
  store.dispatch(logout());
  queryClient.clear();
  await persistor.purge();
  return;
}
