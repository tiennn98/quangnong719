import { SCREEN_NAME } from '@/constants/screen-name';
import { navigate } from '@/navigators';
import { store } from '@/redux/store';
import {
  DeleteAccountPayload,
  DeleteAccountResponse,
  deleteCustomerAccount,
  getCustomerHome,
  getProfile,
  updateCustomerDevice,
  updateCustomerProfile,
  UpdateCustomerProfilePayload,
  UpdateCustomerProfileResponse,
  UpdateDevicePayload,
  UpdateDeviceResponse,
} from '@/services/profile.api';
import { queryClient } from '@/services/react-query-client';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetProfile = () => {
  const token = store.getState().auth.accessToken;
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    enabled: !!token,
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
      navigate(SCREEN_NAME.PROFILESCREEN);
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
