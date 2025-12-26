import {useQuery} from '@tanstack/react-query';
import {getPlants} from '@/services/profile.api';

export const useGetPlant = () => {
  return useQuery({
    queryKey: ['plants'],
    queryFn: getPlants,
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
};
