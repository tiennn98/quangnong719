// src/services/location.api.ts
import axios from 'axios';
import {URL} from '@/constants/screen-name';

export type ProvinceDto = {
  name: string;
  code: number;
  division_type?: string;
  codename?: string;
  phone_code?: number;
};

export type DistrictDto = {
  name: string;
  code: number;
  division_type?: string;
  codename?: string;
  province_code: number;
};

export type WardDto = {
  name: string;
  code: number;
  division_type?: string;
  codename?: string;
  district_code: number;
};

export type ApiResponse<T> = {
  msg: string;
  statusCode: number;
  data: T;
};

const baseHeaders = {
  accept: 'application/json',
  'Content-Type': 'application/json',
};

const buildLocationError = (error: any, fallback: string) => {
  const status = error?.response?.status;
  const rawMsg =
    error?.response?.data?.message ||
    error?.response?.data?.msg ||
    error?.message;

  // Không có response => mất mạng / DNS / v.v.
  if (!error?.response) {
    return new Error(
      'Không có kết nối mạng. Vui lòng kiểm tra Wi-Fi/4G và thử lại.',
    );
  }

  if (String(rawMsg || '').toLowerCase().includes('timeout')) {
    return new Error('Kết nối quá chậm (timeout). Vui lòng thử lại sau.');
  }

  if (status === 401) {return new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');}
  if (status === 403) {return new Error('Bạn không có quyền truy cập dữ liệu vị trí.');}
  if (status === 404) {return new Error('Không tìm thấy dữ liệu vị trí theo lựa chọn này.');}
  if (status >= 500) {return new Error('Hệ thống đang bận. Vui lòng thử lại sau.');}

  return new Error(rawMsg || fallback);
};

export const getProvinces = async (): Promise<ApiResponse<ProvinceDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/provinces`, {headers: baseHeaders});
    return res.data;
  } catch (error: any) {
    throw buildLocationError(error, 'Tải danh sách Tỉnh/Thành thất bại.');
  }
};

export const getDistrictsByProvince = async (
  provinceCode: number,
): Promise<ApiResponse<DistrictDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/districts/${provinceCode}`, {
      headers: baseHeaders,
    });
    return res.data;
  } catch (error: any) {
    throw buildLocationError(error, 'Tải danh sách Huyện/Quận thất bại.');
  }
};

export const getWardsByDistrict = async (
  districtCode: number,
): Promise<ApiResponse<WardDto[]>> => {
  try {
    const res = await axios.get(`${URL}/location/wards/${districtCode}`, {
      headers: baseHeaders,
    });
    return res.data;
  } catch (error: any) {
    throw buildLocationError(error, 'Tải danh sách Xã/Phường thất bại.');
  }
};
