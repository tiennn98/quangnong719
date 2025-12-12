import { setTokens } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';
import { authLogin, sendOTP } from '@/services/auth.api';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
interface LoginSuccessData {
  access_token: string;
}
export const useSendOTP = () => {
  return useMutation({
    mutationFn: (phone: string) => sendOTP(phone),
  });
};
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginSuccessData, string, { phone: string; otp: string }>({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) => authLogin(phone, otp),

    onSuccess: (data) => {
      dispatch(
        setTokens({
          accessToken: data.access_token,
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

// export const useProfile = () => {
//   const dispatch = useAppDispatch();

//   const {data,isSuccess,isError} = useQuery({
//     queryKey: ['profile'],
//     queryFn: async () => {
//       const res = await getProfileApi();
//       return res.data;
//     },
//   });
//   if (isSuccess) {
//    return dispatch(setUser(data));
//   }
//   if (isError) {
//     return null;
//   }
// };
