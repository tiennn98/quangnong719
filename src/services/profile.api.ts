import { URL } from '@/constants/screen-name';
import { logout } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';
import { Alert } from 'react-native';
import reactotron from 'reactotron-react-native';

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
  type_of_plants: any[];
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
    store.dispatch(logout());
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
