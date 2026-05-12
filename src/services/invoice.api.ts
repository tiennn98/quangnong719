import {
  KIOTCLIENTID,
  KIOTCLIENTSECRET,
  KIOTRETAILER,
  KIOTURL,
  SCOPES,
} from '@env';
import axios, {AxiosRequestConfig} from 'axios';
import {axiosClient} from './axiosClient';
import {getTokenKiot} from './kiot.api';

export interface InvoiceDetailTax {}

export interface InvoiceDetail {
  productId: number;
  productCode: string;
  productName: string;
  categoryId: number;
  categoryName: string;
  quantity: number;
  price: number;
  discount: number;
  usePoint: boolean;
  subTotal: number;
  note: string;
  serialNumbers: string;
  invoiceDetailTaxs: InvoiceDetailTax[];
  id: number;
  returnQuantity: number;
}

export interface InvoiceData {
  id: number;
  uuid: string;
  code: string;
  purchaseDate: string;
  branchId: number;
  branchName: string;
  soldById: number;
  soldByName: string;
  customerId: number;
  customerCode: string;
  customerName: string;
  orderCode: string;
  total: number;
  totalPayment: number;
  discount: number;
  status: number;
  statusValue: string;
  description: string;
  usingCod: boolean;
  createdDate: string;
  invoiceDetails: InvoiceDetail[];
}

export interface InvoiceResponse {
  total: number;
  pageSize: number;
  data: InvoiceData[];
  timestamp: string;
}

export const getListInvoice = async (
  phone: string,
): Promise<InvoiceResponse> => {
  const tokenResponse = await getTokenKiot();
  const accessToken = tokenResponse.access_token;

  const config: AxiosRequestConfig = {
    params: {
      customerCode: phone,
      pageSize: 20,
      pageNumber: 1,
    },
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      Retailer: KIOTRETAILER,
      Scopes: SCOPES,
      'Client-Id': KIOTCLIENTID,
      'Client-Secret': KIOTCLIENTSECRET,
    },
  };

  try {
    const response = await axios.get<InvoiceResponse>(
      `${KIOTURL}invoices`,
      config,
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Lấy danh sách hóa đơn thất bại';
    throw new Error(message);
  }
};

export interface InvoiceDetailItemApi {
  id: number;
  invoice_id: number;
  product_code: string;
  product_name: string;
  quantity: number;
  price: number;
  discount: number;
  sub_total: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceDetailApiData {
  id: number;
  user_id: number;
  kiot_invoice_id: number;
  invoice_code: string;
  total_amount: number;
  total_payment: number;
  purchase_date: string;
  status: string;
  customer_code: string;
  customer_name: string;
  branch_name: string;
  status_value: string;
  sold_by_name: string;
  discount: number;
  created_at: string;
  updated_at: string;
  items: InvoiceDetailItemApi[];
}

export interface InvoiceDetailApiResponse {
  msg: string;
  statusCode: number;
  data: InvoiceDetailApiData;
}

const mapStatusValueToText = (statusValue?: string, status?: string) => {
  const num = Number(statusValue);
  if (num === 1) {
    return 'Đã thanh toán';
  }
  if (status === 'COMPLETED') {
    return 'Đã thanh toán';
  }
  return status || '';
};

export const mapInvoiceDetailApiToDTO = (api: InvoiceDetailApiData) => ({
  id: api.id,
  code: api.invoice_code,
  purchaseDate: api.purchase_date,
  branchName: api.branch_name,
  soldByName: api.sold_by_name,
  customerCode: api.customer_code,
  customerName: api.customer_name,
  total: api.total_amount,
  totalPayment: api.total_payment,
  discount: api.discount,
  status: Number(api.status_value) || 0,
  statusValue: mapStatusValueToText(api.status_value, api.status),
  createdDate: api.created_at,
  invoiceDetails: (api.items || []).map(it => ({
    productCode: it.product_code,
    productName: it.product_name,
    quantity: it.quantity,
    price: it.price,
    discount: it.discount,
    subTotal: it.sub_total,
  })),
});

export const getInvoiceDetailById = async (
  id: string | number,
): Promise<InvoiceDetailApiData> => {
  try {
    const res = await axiosClient.get<InvoiceDetailApiResponse>(
      `/invoice/detail/${id}`,
    );
    return res.data.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.msg ||
      error?.message ||
      'Lấy chi tiết hóa đơn thất bại';
    throw new Error(message);
  }
};
