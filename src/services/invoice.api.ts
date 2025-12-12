import {
    KIOTCLIENTID,
    KIOTCLIENTSECRET,
    KIOTRETAILER,
    KIOTURL,
    SCOPES,
} from '@env';
import axios, { AxiosRequestConfig } from 'axios';
import { getTokenKiot } from './kiot.api';

interface InvoiceDetail {}

interface InvoiceData {
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

interface InvoiceResponse {
  total: number;
  pageSize: number;
  data: InvoiceData[];
  timestamp: string;
}

export type { InvoiceData, InvoiceDetail, InvoiceResponse };

export const getListInvoice = async (
    phone: string,
): Promise<InvoiceResponse> => {

    const tokenResponse = await getTokenKiot();
    const accessToken = tokenResponse.access_token;


    const config: AxiosRequestConfig = {
        params: {
            customerCode: phone,
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

        return response.data.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Lấy danh sách hóa đơn thất bại';
        throw new Error(message);
    }
};
