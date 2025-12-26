import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getProfile,
  updateCustomerProfile,
  UpdateCustomerProfilePayload,
  UpdateCustomerProfileResponse,
  updateCustomerDevice,
  UpdateDevicePayload,
  UpdateDeviceResponse,
} from '@/services/profile.api';
import { queryClient } from '@/services/react-query-client';
import {store} from '@/redux/store';

export const useGetProfile = () => {
  const token = store.getState().auth.accessToken;
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1, enabled: !!token,
  });
};

export const useUpdateCustomerProfile = () => {
  return useMutation<
    UpdateCustomerProfileResponse,
    Error,
    UpdateCustomerProfilePayload
  >({
    mutationFn: updateCustomerProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });
};

export const useUpdateCustomerDevice = () => {
  return useMutation<UpdateDeviceResponse, Error, UpdateDevicePayload>({
    mutationFn: updateCustomerDevice,
  });
};

