import axios from 'axios';
import { URL } from '@/constants/screen-name';
export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export const sendOTP = async (phone: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${URL}/auth/send-otp`,
      {
        phone_number: phone,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Gửi OTP thất bại';
    throw new Error(message);
  }
};

export const authLogin = async (phone: string,otp:string): Promise<any> => {
  try {
    const response = await axios.post(
      `${URL}/auth/login`,
      {
        phone_number: phone,
        otp:otp,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Đăng nhập thất bại';
    throw new Error(message);
  }
};
