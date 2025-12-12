import { setTokens } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';
import { authLogin, sendOTP } from '@/services/auth.api';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
export interface LoginResponse {
  msg: 'ok' | string;
  statusCode: number;
  data: DataPayload;
}
export interface DataPayload {
  access_token: string;


}
export const useSendOTP = () => {
  return useMutation({
    mutationFn: (phone: string) => sendOTP(phone),
  });
};
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, string, { phone: string; otp: string }>({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => authLogin(phone, otp),

    onSuccess: (data) => {
      console.log('Token nhận được:', data);
      dispatch(
        setTokens({
          accessToken: data.data.access_token,
        }),
      );
          Alert.alert(
            'Thành công',
            'Xác minh OTP thành công! Đang chuyển hướng...',
          );
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            'Mã OTP không chính xác, vui lòng thử lại!';
          Alert.alert('Thông báo', message);
        },
  });
};













