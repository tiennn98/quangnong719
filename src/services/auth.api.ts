// services/auth.api.ts
import axios from 'axios';
import { URL } from '@/constants/screen-name';

type ApiErrData = {
  msg?: string;
  message?: string;
  statusCode?: number;
};

function toApiError(error: any, fallback: string) {
  const data: ApiErrData | undefined = error?.response?.data;
  const status = error?.response?.status ?? data?.statusCode;

  const msg =
    data?.msg ||                 // ✅ ưu tiên msg
    data?.message ||             // fallback message
    error?.message ||
    fallback;

  const e = new Error(msg);
  (e as any).statusCode = status;
  (e as any).data = data;
  return e;
}

export const sendOTP = async (payload: { phone: string; action?: string }) => {
  try {
    const res = await axios.post(
      `${URL}/auth/send-otp`,
      { phone_number: payload.phone, action: payload.action ?? 'login' },
      { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
    );
    return res.data;
  } catch (error: any) {
    throw toApiError(error, 'Gửi OTP thất bại');
  }
};

export const authLogin = async (phone: string, otp: string) => {
  try {
    const res = await axios.post(
      `${URL}/auth/login`,
      { phone_number: phone, otp },
      { headers: { accept: 'application/json', 'Content-Type': 'application/json' } },
    );
    return res.data;
  } catch (error: any) {
    throw toApiError(error, 'Đăng nhập thất bại');
  }
};
