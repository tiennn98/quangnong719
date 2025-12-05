import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Images} from '@/assets';
import {CText, InputOTP} from '@/components';
import CButton from '@/components/button';
import {useLogin} from '@/hooks/useAuth';
import {styles} from './styles.module';
import {Colors} from '@/themes';
import { scale } from 'react-native-utils-scale';
const RESEND_COUNTDOWN = 300;

const resendOtpApi = async (phone: string) => {
  const res = await axios.post(
    'https://api-agri.nguyenphuquoc.info/api/v1/auth/resend-otp',
    {phone_number: phone},
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  return res.data;
};

const ConfirmOtpScreen = () => {
  const route = useRoute();
  const {phone} = route.params as {phone: string};
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);

  const loginMutation = useLogin();

  const resendMutation = useMutation({
    mutationFn: (phoneNumber: string) => resendOtpApi(phoneNumber),
    onError: (error: any) => {
      const message =
        error instanceof Error
          ? error.message
          : 'Gửi lại OTP không thành công, vui lòng thử lại!';
      Alert.alert('Thông báo', message);
    },
  });

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

    loginMutation.mutate(
      {phone, otp},
      {
        onSuccess: () => {
          Alert.alert('Thành công', 'Xác minh OTP thành công!');
        },
        onError: (error: any) => {
          const message =
            error instanceof Error
              ? error.message
              : 'Mã OTP không chính xác, vui lòng thử lại!';
          Alert.alert('Thông báo', message);
        },
      },
    );
  }, [loginMutation, otp, phone]);

  const handleResendOtp = useCallback(() => {
    if (timeLeft > 0 || resendMutation.isPending) {
      return;
    }

    setTimeLeft(RESEND_COUNTDOWN);
    resendMutation.mutate(phone);
  }, [phone, resendMutation, timeLeft]);

  const isVerifyDisabled = loginMutation.isPending || otp.length !== 6;

  const isResendDisabled = resendMutation.isPending || timeLeft > 0;

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
                <CText color={Colors.h2}>Nông dân cần - Có Quang Nông</CText>
              </View>

              <View style={styles.whiteBox}>
                <CText style={styles.titleText}>Nhập mã OTP</CText>

                <CText style={styles.subtitleText}>
                  Chúng tôi đã gửi mã đến số{' '}
                  <CText style={styles.phoneText}>{phone}</CText>
                </CText>

                <CText style={styles.labelText}>Nhập mã OTP 6 số</CText>

                <InputOTP onChangeValue={handleChangeOtp} />

                {otpError && <CText style={styles.errorText}>{otpError}</CText>}

                <CText color={Colors.h2}>
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

                <View>
                  <CButton
                    title={
                      resendMutation.isPending ? 'Đang gửi...' : resendLabel
                    }
                    onPress={handleResendOtp}
                    disabled={isResendDisabled}
                    isLoading={resendMutation.isPending}
                    style={[
                      {backgroundColor: Colors.yellow, height: scale(48)},
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

export default ConfirmOtpScreen;
