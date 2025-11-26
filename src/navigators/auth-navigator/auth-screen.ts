import {SCREEN_NAME} from '@/constants';
import {ConfirmOtpScreen, LoginScreen} from '@/screens';

export const AuthScreen = {
  [SCREEN_NAME.LOGIN]: LoginScreen,
  [SCREEN_NAME.CONFIRM_OTP_SCREEN]: ConfirmOtpScreen,
};
