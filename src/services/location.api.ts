import axios from 'axios';
import {URL} from '@/constants/screen-name';

export type ProvinceDto = {
  name: string;
  code: number;
  division_type?: string;
  codename?: string;
  phone_code?: number;
};

export type WardDto = {
  name: string;
  code: number;
  division_type?: string;
  codename?: string;
  province_code: number;
};

type ApiResponse<T> = {
  msg: string;
  statusCode: number;
  data: T;
  length?: number;
};

const baseHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

const pickErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message ||
  error?.response?.data?.msg ||
  error?.message ||
  fallback;

export const getProvinces = async (): Promise<ApiResponse<ProvinceDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/provinces`, {
      headers: baseHeaders,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      pickErrorMessage(
        error,
        'Không thể tải danh sách Tỉnh/Thành. Vui lòng thử lại.',
      ),
    );
  }
};

export const getWardsByProvince = async (
  provinceCode: number,
): Promise<ApiResponse<WardDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/ward/${provinceCode}`, {
      headers: baseHeaders,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      pickErrorMessage(
        error,
        'Không thể tải danh sách Phường/Xã. Vui lòng thử lại.',
      ),
    );
  }
};
