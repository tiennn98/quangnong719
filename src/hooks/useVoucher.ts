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
import {useInfiniteQuery} from '@tanstack/react-query';

export const useGetVoucherListInfinite = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['voucherList', limit],
    initialPageParam: 1,
    queryFn: ({pageParam}) =>
      getVoucherList({page: pageParam as number, limit}),
    getNextPageParam: (lastPage) => {
      const pg = lastPage?.data?.pagination;
      if (pg?.load_more && pg?.next_page && pg.next_page > 0) return pg.next_page;
      return undefined;
    },
  });
};
