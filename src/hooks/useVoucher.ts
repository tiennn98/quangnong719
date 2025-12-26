import {useQuery} from '@tanstack/react-query';
import {getVoucherList} from '@/services/voucher.api';

export const VOUCHER_KEYS = {
  list: (page: number, limit: number) => ['voucher-list', page, limit] as const,
};

export function useGetVoucherList(page = 1, limit = 10) {
  return useQuery({
    queryKey: VOUCHER_KEYS.list(page, limit),
    queryFn: () => getVoucherList({page, limit}),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
