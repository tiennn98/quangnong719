import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

import {Images} from '@/assets';
import {CText, InputOTP} from '@/components';
import CButton from '@/components/button';
import {useLogin, useSendOTP} from '@/hooks/useAuth';
import {Colors} from '@/themes';
import {hidePhoneNumber} from '@/utils/tools';
import {fontScale, scale} from 'react-native-utils-scale';
import {styles} from './styles.module';

const RESEND_COUNTDOWN = 300; // seconds
const OTP_SESSION_KEY = 'otp_session_v1';

type OtpSession = {
  phone: string;
  expiresAtMs: number; // timestamp ms
};

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function clampInt(n: number) {
  if (!Number.isFinite(n)) {return 0;}
  return Math.max(0, Math.floor(n));
}

function calcTimeLeft(expiresAtMs: number) {
  const diff = expiresAtMs - Date.now();
  return clampInt(Math.ceil(diff / 1000));
}

function getOtpFriendlyMessage(err: any) {
  const status = err?.response?.status;
  const msg = err?.response?.data?.message || err?.response?.data?.msg || err?.message || '';

  if (status === 400 || status === 401) {
    return 'Mã OTP không đúng. Vui lòng kiểm tra và thử lại.';
  }
  if (status === 429) {
    return 'Bạn đã thử quá nhiều lần. Vui lòng đợi một chút rồi thử lại.';
  }
  if (msg && typeof msg === 'string') {
    // fallback nhẹ nhàng
    return 'Không thể xác minh OTP lúc này. Vui lòng thử lại.';
  }
  return 'Có lỗi xảy ra khi xác minh OTP. Vui lòng thử lại.';
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

  // ✅ reset InputOTP (toggle)
  const [needResetOtp, setNeedResetOtp] = useState(false);
  const triggerResetOtp = useCallback(() => {
    setNeedResetOtp(prev => !prev);
  }, []);

  // ✅ Countdown theo expiresAt, không reset khi background/foreground
  const [expiresAtMs, setExpiresAtMs] = useState<number>(Date.now() + RESEND_COUNTDOWN * 1000);
  const [timeLeft, setTimeLeft] = useState<number>(RESEND_COUNTDOWN);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTick = useCallback(() => {
    if (tickRef.current) {clearInterval(tickRef.current);}
    tickRef.current = null;
  }, []);

  const startTick = useCallback((expMs: number) => {
    stopTick();
    // set ngay cho chuẩn
    setTimeLeft(calcTimeLeft(expMs));
    tickRef.current = setInterval(() => {
      setTimeLeft(calcTimeLeft(expMs));
    }, 1000);
  }, [stopTick]);

  const persistSession = useCallback(async (session: OtpSession) => {
    try {
      await AsyncStorage.setItem(OTP_SESSION_KEY, JSON.stringify(session));
    } catch {}
  }, []);

  const clearSession = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(OTP_SESSION_KEY);
    } catch {}
  }, []);

  // ✅ load session: tránh reset 300s khi user qua Zalo rồi quay lại
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(OTP_SESSION_KEY);
        if (!mounted) {return;}

        if (raw) {
          const parsed = JSON.parse(raw) as Partial<OtpSession>;
          if (parsed?.phone === phone && typeof parsed.expiresAtMs === 'number') {
            const exp = parsed.expiresAtMs;
            setExpiresAtMs(exp);
            startTick(exp);
            return;
          }
        }

        // không có session hoặc khác phone -> tạo mới
        const exp = Date.now() + RESEND_COUNTDOWN * 1000;
        setExpiresAtMs(exp);
        startTick(exp);
        persistSession({phone, expiresAtMs: exp});
      } catch {
        const exp = Date.now() + RESEND_COUNTDOWN * 1000;
        setExpiresAtMs(exp);
        startTick(exp);
        persistSession({phone, expiresAtMs: exp});
      }
    })();

    return () => {
      mounted = false;
      stopTick();
    };
  }, [phone, persistSession, startTick, stopTick]);

  // ✅ Khi app quay lại foreground: tính lại timeLeft theo expiresAtMs (không restart)
  React.useEffect(() => {
    const onAppStateChange = (next: AppStateStatus) => {
      if (next === 'active') {
        // cập nhật ngay khi quay lại
        setTimeLeft(calcTimeLeft(expiresAtMs));
      }
    };

    const sub = AppState.addEventListener('change', onAppStateChange);
    return () => sub.remove();
  }, [expiresAtMs]);

  // ✅ Modal báo OTP sai
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpModalMsg, setOtpModalMsg] = useState<string>('');

  const openOtpErrorModal = useCallback((message: string) => {
    setOtpModalMsg(message);
    setOtpModalOpen(true);
  }, []);

  const resendLabel = useMemo(() => {
    return timeLeft > 0 ? `Gửi lại OTP (${formatCountdown(timeLeft)})` : 'Gửi lại OTP';
  }, [timeLeft]);

  const handleChangeOtp = useCallback((code: string) => {
    setOtp(code);
    if (otpError) {setOtpError(null);}
  }, [otpError]);

  const handleVerifyOtp = useCallback(() => {
    if (otp.length !== 6) {
      setOtpError('Vui lòng nhập đủ 6 số OTP');
      return;
    }

    loginMutation.mutate(
      {phone, otp},
      {
        onSuccess: async () => {
          // ✅ xác minh ok -> clear session countdown
          await clearSession();
        },
        onError: (err: any) => {
          // ✅ sai OTP -> modal + clear OTP để nhập lại
          setOtp('');
          setOtpError(null);
          triggerResetOtp();
          openOtpErrorModal(getOtpFriendlyMessage(err));
        },
      },
    );
  }, [otp, phone, loginMutation, clearSession, triggerResetOtp, openOtpErrorModal]);

  const handleResendOtp = useCallback(() => {
    if (timeLeft > 0 || resendOTPMutation.isPending) {return;}

    resendOTPMutation.mutate(phone, {
      onSuccess: async () => {
        const exp = Date.now() + RESEND_COUNTDOWN * 1000;
        setExpiresAtMs(exp);
        startTick(exp);
        await persistSession({phone, expiresAtMs: exp});
      },
      onError: () => {
        openOtpErrorModal('Không thể gửi lại OTP lúc này. Vui lòng thử lại.');
      },
    });
  }, [timeLeft, resendOTPMutation, phone, startTick, persistSession, openOtpErrorModal]);

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
                <Image source={Images.logo} resizeMode="contain" style={styles.imageLogo} />
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
                  <CText style={styles.phoneText}>{hidePhoneNumber(phone)}</CText>
                </CText>

                <CText style={styles.labelText}>Nhập mã OTP 6 số</CText>

                <InputOTP onChangeValue={handleChangeOtp} needReset={needResetOtp} />

                {otpError ? <CText style={styles.errorText}>{otpError}</CText> : null}

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
                    title={loginMutation.isPending ? 'Đang xác minh...' : 'Xác minh OTP'}
                    onPress={handleVerifyOtp}
                    disabled={isVerifyDisabled}
                    isLoading={loginMutation.isPending}
                    style={styles.button}
                  />
                </View>

                <View style={{marginTop: scale(10)}}>
                  <CButton
                    title={resendOTPMutation.isPending ? 'Đang gửi...' : resendLabel}
                    onPress={handleResendOtp}
                    disabled={isResendDisabled}
                    isLoading={resendOTPMutation.isPending}
                    style={[
                      {
                        backgroundColor: isResendDisabled ? Colors.gray500 : Colors.yellow,
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

      {/* ✅ Modal thông báo OTP sai */}
      <Modal
        isVisible={otpModalOpen}
        onBackdropPress={() => setOtpModalOpen(false)}
        onBackButtonPress={() => setOtpModalOpen(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropOpacity={0.6}
        style={{margin: 0, justifyContent: 'center', paddingHorizontal: scale(18)}}>
        <View style={{backgroundColor: '#fff', borderRadius: scale(12), padding: scale(16)}}>
          <CText style={{fontSize: fontScale(18), fontWeight: '900', color: Colors.h1}}>
            Mã OTP chưa đúng
          </CText>

          <CText style={{marginTop: scale(8), color: Colors.h2, fontSize: fontScale(14)}}>
            {otpModalMsg || 'Vui lòng kiểm tra lại và nhập lại mã OTP.'}
          </CText>

          <View style={{flexDirection: 'row', gap: scale(10), marginTop: scale(14)}}>
            <View style={{flex: 1}}>
              <CButton
                title="Thử lại"
                onPress={() => {
                  setOtpModalOpen(false);
                }}
                style={{height: scale(48), backgroundColor: Colors.buttonbg}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ConfirmOtpScreen;
