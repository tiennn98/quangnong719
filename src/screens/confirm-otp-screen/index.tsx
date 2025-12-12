import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Images } from '@/assets';
import { CText, InputOTP } from '@/components';
import CButton from '@/components/button';
import { useLogin, useSendOTP } from '@/hooks/useAuth';
import { Colors } from '@/themes';
import { hidePhoneNumber } from '@/utils/tools';
import { fontScale, scale } from 'react-native-utils-scale';
import { styles } from './styles.module';

const RESEND_COUNTDOWN = 300;


const ConfirmOtpScreen = () => {
  const route = useRoute();
  const {phone} = route.params as {phone: string};
  const navigation = useNavigation();
const loginMutation = useLogin();
  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);

const resendOTPMutation = useSendOTP();


  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(RESEND_COUNTDOWN);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleChangeOtp = useCallback(
    (code: string) => {
      setOtp(code);
      if (otpError) {
        setOtpError(null);
      }
    },
    [otpError],
  );

  const handleVerifyOtp = useCallback(() => {
    if (otp.length !== 6) {
      setOtpError('Vui lòng nhập đủ 6 số OTP');
      return;
    }

    loginMutation.mutate({phone, otp});
  }, [loginMutation, otp, phone]);

  const handleResendOtp = useCallback(() => {
    if (timeLeft > 0 || resendOTPMutation.isPending) {
      return;
    }

    resendOTPMutation.mutate(phone);
  }, [phone, resendOTPMutation, timeLeft]);

  const isVerifyDisabled = loginMutation.isPending || otp.length !== 6;

  const isResendDisabled = resendOTPMutation.isPending || timeLeft > 0;

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const resendLabel =
    timeLeft > 0 ? `Gửi lại OTP (${formatCountdown(timeLeft)})` : 'Gửi lại OTP';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled">
            <View style={styles.contentContainer}>
              <View style={styles.viewImage}>
                <Image
                  source={Images.logo}
                  resizeMode="contain"
                  style={styles.imageLogo}
                />
              </View>

              <View style={styles.center}>
                <CText color={Colors.h2} fontSize={fontScale(16)}>
                  Nông dân cần - Có Quang Nông
                </CText>
              </View>

              <View style={styles.whiteBox}>
                <CText style={styles.titleText}>Nhập mã OTP</CText>

                <CText style={styles.subtitleText}>
                  Chúng tôi đã gửi mã đến số{' '}
                  <CText style={styles.phoneText}>
                    {hidePhoneNumber(phone)}
                  </CText>
                </CText>

                <CText style={styles.labelText}>Nhập mã OTP 6 số</CText>

                <InputOTP onChangeValue={handleChangeOtp} />

                {otpError && <CText style={styles.errorText}>{otpError}</CText>}

                <CText
                  color={Colors.h2}
                  fontSize={fontScale(14)}
                  style={{
                    marginTop: scale(10),
                    marginBottom: scale(30),
                    textAlign: 'center',
                  }}>
                  Nhập mã gồm 6 chữ số được gửi đến điện thoại của bạn
                </CText>

                <View style={styles.viewButton}>
                  <CButton
                    title={
                      loginMutation.isPending
                        ? 'Đang xác minh...'
                        : 'Xác minh OTP'
                    }
                    onPress={handleVerifyOtp}
                    disabled={isVerifyDisabled}
                    isLoading={loginMutation.isPending}
                    style={styles.button}
                  />
                </View>

                <View style={{marginTop: scale(10)}}>
                  <CButton
                    title={
                      resendOTPMutation.isPending ? 'Đang gửi...' : resendLabel
                    }
                    onPress={handleResendOtp}
                    disabled={isResendDisabled}
                    isLoading={resendOTPMutation.isPending}
                    style={[
                      {
                        backgroundColor: isResendDisabled
                          ? Colors.gray500
                          : Colors.yellow,
                        height: scale(48),
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenPrimary,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: scale(20),
  },
  viewImage: {
    alignItems: 'center',
    marginTop: scale(20),
  },
  imageLogo: {
    width: width / 2.5,
    height: width / 2.5,
  },
  viewButton: {
    paddingHorizontal: scale(50),
  },
  gap: {
    gap: scale(8),
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

export default ConfirmOtpScreen;
