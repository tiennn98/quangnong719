import {useNavigation, useRoute} from '@react-navigation/native';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import {Images} from '@/assets';
import {CText, InputOTP} from '@/components';
import CButton from '@/components/button';
import {useLogin, useSendOTP} from '@/hooks/useAuth';
import {Colors} from '@/themes';
import {hidePhoneNumber} from '@/utils/tools';
import {fontScale, scale} from 'react-native-utils-scale';
import {styles} from './styles.module';

const RESEND_COUNTDOWN = 300;

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function useCountdown(initialSeconds: number) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(
    (seconds = initialSeconds) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setTimeLeft(seconds);

      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            timerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [initialSeconds],
  );

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = null;
    setTimeLeft(0);
  }, []);

  React.useEffect(() => () => stop(), [stop]);

  return {timeLeft, start, stop, setTimeLeft};
}

const ConfirmOtpScreen = () => {
  const route = useRoute();
  const {phone} = route.params as {phone: string};

  const navigation = useNavigation();
  const loginMutation = useLogin();
  const resendOTPMutation = useSendOTP();

  useLayoutEffect(() => {
    navigation.setOptions({gestureEnabled: false});
  }, [navigation]);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const {timeLeft, start} = useCountdown(RESEND_COUNTDOWN);
  React.useEffect(() => {
    start(RESEND_COUNTDOWN);
  }, [start]);

  const resendLabel = useMemo(() => {
    return timeLeft > 0
      ? `Gửi lại OTP (${formatCountdown(timeLeft)})`
      : 'Gửi lại OTP';
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

    resendOTPMutation.mutate(phone, {
      onSuccess: () => {
        start(RESEND_COUNTDOWN);
      },
    });
  }, [phone, resendOTPMutation, timeLeft, start]);

  const isVerifyDisabled = loginMutation.isPending || otp.length !== 6;
  const isResendDisabled = resendOTPMutation.isPending || timeLeft > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag">
            <Pressable onPress={() => {}} style={styles.contentContainer}>
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

                <InputOTP onChangeValue={handleChangeOtp} needReset={false} />

                {otpError ? (
                  <CText style={styles.errorText}>{otpError}</CText>
                ) : null}

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
            </Pressable>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConfirmOtpScreen;
