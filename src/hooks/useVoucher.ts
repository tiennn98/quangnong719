import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getVoucherList} from '@/services/voucher.api';
import { getCustomerHome } from '@/services/profile.api';

export function useGetVoucherList(page = 1, limit = 10) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: ['voucherList', page, limit],
    queryFn: async () => {
      await qc.fetchQuery({
        queryKey: ['customerHome'],
        queryFn: getCustomerHome,
        staleTime: 60 * 1000,
      });
      return getVoucherList({page, limit});
    },
    staleTime: 10 * 1000,
  });
}
