import {getProfile, UserProfileData} from '@/services/profile.api';
import {useQuery} from '@tanstack/react-query';

const PROFILE_QUERY_KEY = 'userProfile';

export const useGetProfile = () => {
  return useQuery<UserProfileData, Error>({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
};
