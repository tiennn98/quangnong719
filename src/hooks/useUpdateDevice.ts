import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {
  updateCustomerDevice,
  UpdateDevicePayload,
  UpdateDeviceResponse,
} from '@/services/profile.api';

type Options = UseMutationOptions<
  UpdateDeviceResponse,
  Error,
  UpdateDevicePayload
>;

export const useUpdateCustomerDevice = (options?: Options) => {
  return useMutation<UpdateDeviceResponse, Error, UpdateDevicePayload>({
    mutationFn: updateCustomerDevice,
    ...options,
  });
};

export const isValidDevicePayload = (p?: Partial<UpdateDevicePayload>) => {
  return !!p?.device_id?.trim() && !!p?.fcm_token?.trim();
};
