import {URL} from '@/constants/screen-name';
import {store} from '@/redux/store';
import axios from 'axios';

export type VoucherItemDTO = {
  voucher_instance_id: number;
  code: string;
  voucher_id: number;
  expired_date: string;
  status: number;
  user_id: number;
  is_used: boolean;
  name: string;
};

export type VoucherPaginationDTO = {
  load_more: boolean;
  next_page: number;
};

export type VoucherListDataDTO = {
  items: VoucherItemDTO[];
  pagination: VoucherPaginationDTO;
};

export type VoucherListResponse = {
  msg: string;
  statusCode: number;
  data: VoucherListDataDTO;
};

const getAccessTokenOrThrow = () => {
  const token = store.getState().auth.accessToken;
  if (!token) {throw new Error('Unauthorized: missing accessToken');}
  return token;
};

const authHeaders = () => {
  const token = getAccessTokenOrThrow();
  return {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export async function getVoucherList(params?: {
  limit?: number;
  page?: number;
}): Promise<VoucherListResponse> {
  const limit = params?.limit ?? 10;
  const page = params?.page ?? 1;

  try {
    const res = await axios.get<VoucherListResponse>(
      `${URL}/voucher/list?limit=${limit}&page=${page}`,
      {headers: authHeaders()},
    );
    return res.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.message ||
      'Lấy danh sách voucher thất bại';
    throw new Error(msg);
  }
}
