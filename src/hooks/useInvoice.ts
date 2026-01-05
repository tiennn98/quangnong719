import {getListInvoice, InvoiceResponse} from '@/services/invoice.api';
import {useQuery} from '@tanstack/react-query';

const INVOICE_LIST_QUERY_KEY = 'InvoiceList';

export const useGetInvoiceList = (customerPhone?: string) => {
  return useQuery<InvoiceResponse, Error, InvoiceResponse>({
    queryKey: [INVOICE_LIST_QUERY_KEY, customerPhone],

    queryFn: ({queryKey}) => {
      const phone = queryKey[1] as string;
      return getListInvoice(phone);
    },

    enabled: !!customerPhone,
    staleTime: 5 * 60 * 1000,
  });
};
