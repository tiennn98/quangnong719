import {getProfile, updateCustomerProfile, UpdateCustomerProfilePayload, UpdateCustomerProfileResponse, UserProfileData} from '@/services/profile.api';
import { queryClient } from '@/services/react-query-client';
import {useMutation, useQuery} from '@tanstack/react-query';

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

export const useUpdateCustomerProfile = () => {
  return useMutation<UpdateCustomerProfileResponse, Error, UpdateCustomerProfilePayload>({
    mutationFn: (payload) => updateCustomerProfile(payload),
    onSuccess: () => {
      // Invalidate or refetch the profile query to get updated data
      queryClient.invalidateQueries([PROFILE_QUERY_KEY]);
      queryClient.refetchQueries([PROFILE_QUERY_KEY]);
    },
  });
};
