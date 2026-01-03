import {URL} from '@/constants/screen-name';
import {store} from '@/redux/store';
import axios from 'axios';
import reactotron from 'reactotron-react-native';
import {axiosClient} from './axiosClient';

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

const getAccessTokenOrThrow = () => {
  const token = store.getState().auth.accessToken;
  reactotron.log('TOKEN IN PROFILE SERVICE:', token);
  if (!token) {
    throw new Error('Unauthorized: Không tìm thấy accessToken trong store.');
  }
  return token;
};

const authHeaders = () => {
  const token = getAccessTokenOrThrow();
  return {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getProfile = async (): Promise<UserProfileData> => {
  try {
    const res = await axios.get<ProfileResponse>(`${URL}/customer/profile`, {
      headers: authHeaders(),
    });
    return res.data.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.message ||
      'Lấy thông tin Profile thất bại';
    throw new Error(msg);
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
  avatar: string;
  address: string;
  location_name: string;
  ward_name: string;
  birth_date: string;
  type_of_plants: number[];
};

export type UpdateCustomerProfileResponse = {
  msg: string;
  statusCode: number;
  data?: any;
};

export const ymdToIsoZ = (ymd?: string) => {
  if (!ymd) {
    return '';
  }
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) {
    return '';
  }

  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).toISOString();
};

export const buildUpdateProfilePayload = (form: {
  fullName: string;
  avatarUri?: string | null;

  addressLine: string;

  province?: {name: string} | null;
  ward?: {name: string} | null;

  birthday?: string;
  crops: Array<number | string>;
}): UpdateCustomerProfilePayload => {
  const locationName = (form.province?.name || '').trim();
  const wardName = (form.ward?.name || '').trim();

  const plantIds = (Array.isArray(form.crops) ? form.crops : [])
    .map(x => Number(x))
    .filter(n => Number.isFinite(n));

  return {
    full_name: (form.fullName || '').trim(),
    avatar: (form.avatarUri || '').trim(),
    address: (form.addressLine || '').trim(),
    location_name: `Tỉnh ${locationName}`,
    ward_name: wardName,
    birth_date: form.birthday ? ymdToIsoZ(form.birthday) : '',
    type_of_plants: plantIds,
  };
};

export const updateCustomerProfile = async (
  payload: UpdateCustomerProfilePayload,
): Promise<UpdateCustomerProfileResponse> => {
  try {
    const res = await axios.put(`${URL}/customer/profile`, payload, {
      headers: authHeaders(),
    });
    return res.data;
  } catch (error: any) {
    console.log('UPDATE_PROFILE_STATUS:', error?.response?.status);
    console.log('UPDATE_PROFILE_DATA:', error?.response?.data);
    console.log('UPDATE_PROFILE_PAYLOAD:', payload);

    throw new Error(
      error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.message ||
        'Cập nhật hồ sơ thất bại',
    );
  }
};

export type PlantType = {id: number; code: string; name: string};

export type PlantsResponse = {
  msg: string;
  statusCode: number;
  data: {plants: PlantType[]};
  length: number;
};

export async function getPlants() {
  const res = await axiosClient.get<PlantsResponse>('/settings');
  return res.data;
}


export type HomeCustomerDTO = {
  id: number;
  code: string;
  name: string;
  avatar_url: string | null;
};

export type HomeLoyaltyDTO = {
  tier_code: string;
  tier_name: string;
  tier_icon_url: string;
  points: number;
  points_unit: number;
};

export type HomeDebtSummaryDTO = {
  current_debt: number;
  currency: string;
  total_invoice: number;
};

export type HomeStatisticsDTO = {
  voucher_count: number;
  joined_event_count: number;
};

export type HomeBannerDTO = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  redirect_type: string;
  redirect_data?: Record<string, any>;
};

export type CustomerHomeDataDTO = {
  customer: HomeCustomerDTO;
  loyalty: HomeLoyaltyDTO;
  debt_summary: HomeDebtSummaryDTO;
  statistics: HomeStatisticsDTO;
  banners: HomeBannerDTO[];
};

export type CustomerHomeResponse = {
  msg: string;
  statusCode: number;
  data: CustomerHomeDataDTO;
};

export async function getCustomerHome(): Promise<CustomerHomeResponse> {
  const res = await axiosClient.get<CustomerHomeResponse>('/customer/home');
  return res.data;
}


export type DeleteAccountPayload = {otp: string};

export type DeleteAccountResponse = {
  msg: string;
  statusCode: number;
  data?: any;
};


export const deleteCustomerAccount = async (
  payload: DeleteAccountPayload,
): Promise<DeleteAccountResponse> => {
  try {
    const token = getAccessTokenOrThrow();
    
    // ✅ axios.delete có body => truyền qua config.data
    const res = await axios.delete<DeleteAccountResponse>(`${URL}/customer`, {
      data: payload,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    return res.data;
  } catch (error: any) {
    const status = error?.response?.status;
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.message ||
      'Xoá tài khoản thất bại';
    
    if (status === 400 || status === 401) {
      throw new Error('Mã OTP không đúng. Vui lòng kiểm tra và thử lại.');
    }
    if (status === 429) {
      throw new Error('Bạn đã thử quá nhiều lần. Vui lòng đợi một chút rồi thử lại.');
    }
    
    throw new Error(msg);
  }
};
