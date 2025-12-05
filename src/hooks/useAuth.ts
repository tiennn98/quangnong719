import { setTokens } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/redux/store';
import { authLogin } from '@/services/auth.api';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (phone: string) => authLogin(phone),
    onSuccess: data => {
      dispatch(
        setTokens({
          accessToken: data.access_token,
        }),
      );
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
