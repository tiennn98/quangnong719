import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
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
import {ChevronLeft} from 'lucide-react-native';

import {CText, InputOTP} from '@/components';
import CButton from '@/components/button';
import {Colors} from '@/themes';
import {fontScale, scale} from 'react-native-utils-scale';

import {useSendOTP} from '@/hooks/useAuth';
import {hardLogout} from '@/services/auth.api';
import {SCREEN_NAME} from '@/constants';
import {useDeleteAccount} from '@/hooks/useProfile';

const RESEND_COUNTDOWN_SEC = 300; // 5 phút
const STORAGE_KEY = 'delete_otp_session_v4';

type RouteParams = {phone: string};

type OtpSession = {
  phone: string;
  expiresAtMs: number; // thời điểm được phép gửi lại
};

const clampInt = (n: number) =>
  Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;

const calcLeftSec = (expiresAtMs: number) =>
  clampInt(Math.ceil((expiresAtMs - Date.now()) / 1000));

const formatCountdown = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

async function loadSession(): Promise<OtpSession | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OtpSession) : null;
  } catch {
    return null;
  }
}

async function saveSession(session: OtpSession) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {}
}

async function clearSession() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch {}
}

const DeleteAccountOtpScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {phone} = route.params as RouteParams;
  
  const sendOtpM = useSendOTP();
  const deleteM = useDeleteAccount();
  
  // UI
  const [otp, setOtp] = useState('');
  const [needResetOtp, setNeedResetOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_COUNTDOWN_SEC);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  
  // refs
  const expiresAtRef = useRef<number>(Date.now() + RESEND_COUNTDOWN_SEC * 1000);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  
  const openModal = useCallback((msg: string) => {
    setModalMsg(msg);
    setModalOpen(true);
  }, []);
  
  const resetOtpInput = useCallback(() => {
    setOtp('');
    setNeedResetOtp(prev => !prev);
  }, []);
  
  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);
  
  const startTick = useCallback(
    (expiresAtMs: number) => {
      stopTick();
      expiresAtRef.current = expiresAtMs;
      
      // set ngay theo real-time
      const left = calcLeftSec(expiresAtMs);
      setTimeLeft(left);
      
      // giảm 1s/nhịp (perf)
      tickRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const next = prev - 1;
          if (next <= 0) {
            stopTick();
            return 0;
          }
          return next;
        });
      }, 1000);
    },
    [stopTick],
  );
  
  /**
   * ✅ Gửi OTP + khóa 5 phút
   * (chỉ gọi khi: vào màn hình lần đầu mà chưa có session/đã hết hạn,
   * hoặc user bấm resend khi timeLeft = 0)
   */
  const sendOtpAndLock5Min = useCallback(async () => {
    const exp = Date.now() + RESEND_COUNTDOWN_SEC * 1000;
    
    // Lưu session + chạy countdown trước để UX mượt
    await saveSession({phone, expiresAtMs: exp});
    startTick(exp);
    
    try {
      await sendOtpM.mutateAsync({phone:phone,action:'delete_account'});
    } catch (err: any) {
      openModal(err?.message || 'Không thể gửi OTP lúc này. Vui lòng thử lại.');
    }
  }, [phone, sendOtpM, startTick, openModal]);
  
  /**
   * ✅ VÀO MÀN HÌNH: CHỈ GỬI 1 LẦN
   * - Nếu session còn hạn (trong 5p) => KHÔNG gửi lại
   * - Nếu hết hạn / chưa có => gửi 1 lần và khóa 5p
   */
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      
      (async () => {
        const session = await loadSession();
        if (!alive) return;
        
        const samePhone = session?.phone === phone;
        const exp = session?.expiresAtMs ?? 0;
        const stillLocked = samePhone && exp > Date.now();
        
        if (stillLocked) {
          // ✅ không gửi lại, chỉ chạy countdown
          startTick(exp);
          return;
        }
        
        // ✅ chưa có / hết hạn => gửi 1 lần
        await sendOtpAndLock5Min();
      })();
      
      return () => {
        alive = false;
        stopTick();
      };
    }, [phone, startTick, stopTick, sendOtpAndLock5Min]),
  );
  
  /**
   * ✅ Qua Zalo rồi quay lại: sync lại timeLeft theo expiresAt (không gửi lại)
   */
  React.useEffect(() => {
    const sub = AppState.addEventListener('change', async (next: AppStateStatus) => {
      const prev = appStateRef.current;
      appStateRef.current = next;
      
      if (prev !== 'active' && next === 'active') {
        const session = await loadSession();
        const exp = session?.expiresAtMs ?? expiresAtRef.current;
        expiresAtRef.current = exp;
        
        const left = calcLeftSec(exp);
        setTimeLeft(left);
        
        if (left > 0 && !tickRef.current) {
          startTick(exp);
        }
      }
    });
    
    return () => sub.remove();
  }, [startTick]);
  
  const resendLabel = useMemo(() => {
    return timeLeft > 0
      ? `Gửi lại OTP (${formatCountdown(timeLeft)})`
      : 'Gửi lại OTP';
  }, [timeLeft]);
  
  const isResendDisabled = sendOtpM.isPending || timeLeft > 0;
  const isConfirmDisabled = deleteM.isPending || otp.length !== 6;
  
  const onResend = useCallback(async () => {
    if (isResendDisabled) return;
    await sendOtpAndLock5Min(); // ✅ bấm lại 1 lần/5p
  }, [isResendDisabled, sendOtpAndLock5Min]);
  
  const onConfirmDelete = useCallback(() => {
    if (otp.length !== 6) {
      openModal('Vui lòng nhập đủ 6 số OTP.');
      return;
    }
    
    deleteM.mutate(
      {otp},
      {
        onSuccess: async () => {
          await clearSession();
          await hardLogout();
          navigation.reset({
            index: 0,
            routes: [{name: SCREEN_NAME.WELLCOME_SCREEN}],
          });
        },
        onError: (err: any) => {
          resetOtpInput();
          openModal(err?.message || 'OTP chưa đúng hoặc đã hết hạn. Vui lòng thử lại.');
        },
      },
    );
  }, [otp, deleteM, openModal, resetOtpInput, navigation]);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primary}}>
      {/* Header */}
      <View
        style={{
          height: scale(54),
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: scale(14),
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            width: scale(40),
            height: scale(40),
            borderRadius: 999,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.06)',
          }}>
          <ChevronLeft color={Colors.h1} size={22} />
        </Pressable>
        
        <CText style={{fontSize: fontScale(16), fontWeight: '900', color: Colors.h1}}>
          Xoá tài khoản
        </CText>
        
        <View style={{width: scale(40), height: scale(40)}} />
      </View>
      
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}>
        <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, padding: scale(16)}}
            keyboardShouldPersistTaps="always">
            <View style={{backgroundColor: '#fff', borderRadius: scale(14), padding: scale(16)}}>
              <CText style={{fontSize: fontScale(18), fontWeight: '900', color: Colors.red}}>
                Xác minh OTP để xoá
              </CText>
              
              <CText style={{marginTop: scale(8), fontSize: fontScale(14), color: Colors.h2}}>
                Mã OTP đã được gửi đến số{' '}
                <CText style={{fontWeight: '900', color: Colors.h1}}>{phone}</CText>.
              </CText>
              
              <View style={{marginTop: scale(14)}}>
                <CText style={{fontSize: fontScale(14), fontWeight: '800', color: Colors.h1}}>
                  Nhập mã OTP 6 số
                </CText>
                <View style={{marginTop: scale(8)}}>
                  <InputOTP onChangeValue={setOtp} needReset={needResetOtp} />
                </View>
              </View>
              
              <View style={{marginTop: scale(16)}}>
                <CButton
                  title={deleteM.isPending ? 'Đang xoá...' : 'Xác nhận xoá tài khoản'}
                  onPress={onConfirmDelete}
                  disabled={isConfirmDisabled}
                  isLoading={deleteM.isPending}
                  style={{height: scale(48), backgroundColor: Colors.red}}
                />
              </View>
              
              <View style={{marginTop: scale(10)}}>
                <CButton
                  title={sendOtpM.isPending ? 'Đang gửi...' : resendLabel}
                  onPress={onResend}
                  disabled={isResendDisabled}
                  isLoading={sendOtpM.isPending}
                  style={{
                    height: scale(48),
                    backgroundColor: isResendDisabled ? Colors.gray500 : Colors.yellow,
                  }}
                />
              </View>
              
              <View
                style={{
                  marginTop: scale(12),
                  padding: scale(12),
                  borderRadius: scale(12),
                  backgroundColor: 'rgba(0,0,0,0.04)',
                }}>
                <CText style={{fontSize: fontScale(13), color: Colors.h2}}>
                  Bạn chỉ có thể gửi lại OTP sau 5 phút để đảm bảo an toàn tài khoản.
                </CText>
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
      
      {/* Modal */}
      <Modal
        isVisible={modalOpen}
        onBackdropPress={() => setModalOpen(false)}
        onBackButtonPress={() => setModalOpen(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropOpacity={0.6}
        style={{margin: 0, justifyContent: 'center', paddingHorizontal: scale(18)}}>
        <View style={{backgroundColor: '#fff', borderRadius: scale(12), padding: scale(16)}}>
          <CText style={{fontSize: fontScale(18), fontWeight: '900', color: Colors.h1}}>
            Thông báo
          </CText>
          
          <CText style={{marginTop: scale(8), color: Colors.h2, fontSize: fontScale(14)}}>
            {modalMsg}
          </CText>
          
          <View style={{marginTop: scale(14)}}>
            <CButton
              title="Đã hiểu"
              onPress={() => setModalOpen(false)}
              style={{height: scale(48), backgroundColor: Colors.buttonbg}}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DeleteAccountOtpScreen;
