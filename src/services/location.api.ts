// src/services/location.api.ts
import axios from 'axios';
import { URL } from '@/constants/screen-name';

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
};

const baseHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getProvinces = async (): Promise<ApiResponse<ProvinceDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/provinces`, {headers: baseHeaders});
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.message ||
        'Tải danh sách Tỉnh/Thành thất bại',
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
      error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.message ||
        'Tải danh sách Phường/Xã thất bại',
    );
  }
};


