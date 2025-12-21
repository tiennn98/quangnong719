import { getPlants } from '@/services/profile.api';
import { useQuery } from '@tanstack/react-query';

export const PLANTS_QUERY_KEY = ['plants'];

export const useGetPlant = () => {
  return useQuery({
    queryKey: PLANTS_QUERY_KEY,
    queryFn: getPlants,
    staleTime: 5 * 60 * 1000,
  });
};
