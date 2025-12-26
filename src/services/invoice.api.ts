import {
  KIOTCLIENTID,
  KIOTCLIENTSECRET,
  KIOTRETAILER,
  KIOTURL,
  SCOPES,
} from '@env';
import axios, {AxiosRequestConfig} from 'axios';
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
