import {useMutation, UseMutationOptions, useQuery} from '@tanstack/react-query';
import {
  getProfile,
  updateCustomerProfile,
  UpdateCustomerProfilePayload,
  UpdateCustomerProfileResponse,
  updateCustomerDevice,
  UpdateDevicePayload,
  UpdateDeviceResponse,
  getCustomerHome,
  ApiResponse,
  DeleteCustomerPayload,
  deleteCustomerAccount,
  DeleteAccountResponse,
  DeleteAccountPayload,
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


export const HOME_QK = ['customerHome'];

export function useCustomerHome() {
  return useQuery({
    queryKey: HOME_QK,
    queryFn: getCustomerHome,
    staleTime: 60 * 1000,
  });
}

export const useDeleteAccount = () => {
  return useMutation<DeleteAccountResponse, Error, DeleteAccountPayload>({
    mutationFn: payload => deleteCustomerAccount(payload),
  });
};
