import { URL } from '@/constants/screen-name';
import { store } from '@/redux/store';
import axios from 'axios';
import { Alert } from 'react-native';
import reactotron from 'reactotron-react-native';
import { axiosClient } from './axiosClient';

export interface UserProfileData {
  phone_number: string;
  full_name: string;
  email: string;
  avatar: string;
  kiotviet_customer_id: string;
  kiotviet_customer_code: string;
  address: string | null;
  loyalty_points: number;
  is_active: boolean;
  q_points: number | null;
  total_invoiced: number;
  total_revenue: number;
  total_point: number;
  reward_point: number;
  debt: number;
  gender: string | null;
  birth_date: string | null;
  location_name: string | null;
  ward_name: string | null;
  id: number;
  created_at: string;
  updated_at: string;
  type_of_plants_ids: number[];
}

export interface ProfileResponse {
  msg: 'ok' | string;
  statusCode: 200 | number;
  data: UserProfileData;
}

export const getProfile = async (): Promise<UserProfileData> => {
  const token = store.getState().auth.accessToken;
    reactotron.log('TOKEN IN PROFILE SERVICE:', token);
  if (!token) {
    Alert.alert(
      'Lỗi',
      'Unauthorized: Không tìm thấy accessToken trong store.',
    );
    throw new Error('Unauthorized: Không tìm thấy accessToken trong store.');
  }

  try {
    const response = await axios.get<ProfileResponse>(
      `${URL}/customer/profile`,
      {
        headers: {
          accept: 'application/json',

          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Lấy thông tin Profile thất bại';
    throw new Error(message);
  }
};


export type UpdateDevicePayload = {
  device_id: string;
  fcm_token: string;
};

export type UpdateDeviceResponse = {
  statusCode?: number;
  msg?: string;
  data?: any;
};

export async function updateCustomerDevice(payload: UpdateDevicePayload) {
  const res = await axiosClient.put<UpdateDeviceResponse>(
    '/customer/update-device',
    payload,
  );
  return res.data;
}


export type UpdateCustomerProfilePayload = {
  full_name: string;
  avatar: string;         // nếu không có thì gửi ""
  address: string;        // gộp địa chỉ chi tiết + ward_name (tuỳ bạn)
  ward_name: string;      // "Phường/Xã ..."
  birth_date: string;     // ISO string "2025-12-19T17:49:19.745Z"
  type_of_plants: number[];
};

export type UpdateCustomerProfileResponse = {
  msg: string;
  statusCode: number;
  data?: any;
};

// Helper: yyyy-mm-dd -> ISO string
export const ymdToIso = (ymd?: string) => {
  if (!ymd) {return new Date(0).toISOString();} // bạn có thể đổi thành '' nếu backend cho phép
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {return new Date(0).toISOString();}
  // set 12:00 để tránh lệch ngày do timezone
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).toISOString();
};

// Helper: build payload từ form
export const buildUpdateProfilePayload = (form: {
  fullName: string;
  avatarUri?: string | null;
  addressLine: string;
  ward?: { name: string } | null; // bạn đang lưu ward {code,name}
  birthday?: string;              // yyyy-mm-dd
  crops: string[];
}): UpdateCustomerProfilePayload => {
  const wardName = form.ward?.name || '';

  return {
    full_name: (form.fullName || '').trim(),
    avatar: (form.avatarUri || '').trim(),
    // address: tuỳ bạn muốn lưu thế nào.
    // Option A (khuyến nghị): lưu đầy đủ "addressLine, ward_name"
    address: [form.addressLine?.trim()].filter(Boolean).join(', '),
    ward_name: wardName,
    // Nếu user không chọn birthday -> gửi ISO rỗng?
    // Nếu backend chấp nhận null/"" thì sửa lại theo backend.
    birth_date: form.birthday ? ymdToIso(form.birthday) : '',
    type_of_plants: Array.isArray(form.crops.map(Number)) ? form.crops.map(Number) : [],
  };
};

export const updateCustomerProfile = async (
  payload: UpdateCustomerProfilePayload,
): Promise<UpdateCustomerProfileResponse> => {
  try {
    const res = await axios.put(`${URL}/customer/profile`, payload, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().auth.accessToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.message ||
        'Cập nhật hồ sơ thất bại',
    );
  }
};
export type PlantType = {
  id: number;
  code: string;
  name: string;
};

export type PlantsResponse = {
  msg: string;
  statusCode: number;
  data: {
    plants: PlantType[];
  };
  length: number;
};

export async function getPlants() {
  // Nếu axiosClient đã set baseURL = https://api-agri.nguyenphuquoc.info/api/v1
  const res = await axiosClient.get<PlantsResponse>('/settings');
  return res.data;
}
