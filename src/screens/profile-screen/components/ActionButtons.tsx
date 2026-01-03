// ActionButtons.tsx
import CText from '@/components/text';
import {SCREEN_NAME} from '@/constants';
import {navigate} from '@/navigators';
import {hardLogout} from '@/services/auth.api';
import {Colors} from '@/themes';
import {ChevronRight, LogOut, Trash2, User, Bell} from 'lucide-react-native';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  AppState,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import {fontScale, scale} from 'react-native-utils-scale';
import {
  checkNotifications,
  requestNotifications,
  openSettings,
  NotificationStatus,
} from 'react-native-permissions';
import {useGetProfile} from '@/hooks/useProfile';
import {useSendOTP} from '@/hooks/useAuth';

type IconKey = 'profile' | 'logout';

interface ActionButtonProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  isDanger?: boolean;
  onPress: () => void;
  isLast?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = memo(
  ({icon: Icon, title, subtitle, isDanger = false, onPress, isLast}) => {
    const iconColor = isDanger ? Colors.red : Colors.greenPrimary;
    const iconBg = isDanger ? 'rgba(255,0,0,0.08)' : 'rgba(11,43,30,0.08)';
    
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.row,
          pressed && styles.rowPressed,
          !isLast && styles.rowDivider,
        ]}>
        <View style={[styles.iconWrap, {backgroundColor: iconBg}]}>
          <Icon size={20} color={iconColor} />
        </View>
        
        <View style={styles.textWrap}>
          <CText style={[styles.title, isDanger && {color: Colors.red}]}>
            {title}
          </CText>
          <CText style={styles.subtitle}>{subtitle}</CText>
        </View>
        
        <ChevronRight size={18} color={'rgba(0,0,0,0.35)'} />
      </Pressable>
    );
  },
);

const isGranted = (s: NotificationStatus) => s === 'granted' || s === 'limited';

const ActionButtons: React.FC = () => {
  const {data: profile} = useGetProfile();
  const sendOTPMutation = useSendOTP();
  const onSubmit = useCallback(
    () => {
      sendOTPMutation.mutate({phone:profile?.phone_number||'',action:'login'}, {
        onSuccess: () => {
          navigate(SCREEN_NAME.CONFIRM_OTP_SCREEN, {phone: profile?.phone_number});
        },
        onError: (error: any) => {
          const message =
            error instanceof Error
              ? error.message
              : 'Gửi OTP không thành công, vui lòng thử lại!';
          Alert.alert('Thông báo', message);
        },
      });
    },
    [sendOTPMutation],
  );
  
  // ===== Notifications state =====
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifStatus, setNotifStatus] = useState<NotificationStatus>('denied');
  const [notifChecking, setNotifChecking] = useState(true);
  
  // confirm modal for toggle
  const [notifConfirmOpen, setNotifConfirmOpen] = useState(false);
  const [notifNextValue, setNotifNextValue] = useState(false);
  
  // delete confirm modal (optional)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  const refreshNotificationStatus = useCallback(async () => {
    try {
      setNotifChecking(true);
      const res = await checkNotifications();
      setNotifStatus(res.status);
      setNotifEnabled(isGranted(res.status));
    } catch {
      setNotifStatus('denied');
      setNotifEnabled(false);
    } finally {
      setNotifChecking(false);
    }
  }, []);
  
  // init + refresh when user returns from Settings
  useEffect(() => {
    refreshNotificationStatus();
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') {
        refreshNotificationStatus();
      }
    });
    return () => sub.remove();
  }, [refreshNotificationStatus]);
  
  const handleEditProfile = useCallback(() => {
    navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN);
  }, []);
  
  const notifSubtitle = useMemo(() => {
    if (notifChecking) return 'Đang kiểm tra trạng thái…';
    return notifEnabled
      ? 'Đang bật • Bạn sẽ nhận ưu đãi/sự kiện'
      : 'Đang tắt • Bạn sẽ không nhận ưu đãi/sự kiện';
  }, [notifChecking, notifEnabled]);
  
  /**
   * Lưu ý OS:
   * - Không thể “tắt thông báo” trực tiếp trong app.
   * - Khi user tắt -> phải mở Settings.
   * - Khi user bật:
   *    + iOS/Android 13+: có thể request permission
   *    + nếu blocked -> mở Settings
   */
  const applyNotificationChange = useCallback(
    async (next: boolean) => {
      if (next) {
        // bật
        try {
          // Nếu đang blocked -> chỉ có Settings
          if (notifStatus === 'blocked') {
            await openSettings();
            return;
          }
          
          // iOS + Android 13+: requestNotifications hoạt động
          const res = await requestNotifications(['alert', 'sound', 'badge']);
          
          if (res.status === 'blocked') {
            await openSettings();
          }
        } catch {
          // fallback
          await openSettings();
        } finally {
          setTimeout(refreshNotificationStatus, 350);
        }
      } else {
        // tắt: mở settings
        try {
          await openSettings();
        } finally {
          setTimeout(refreshNotificationStatus, 350);
        }
      }
    },
    [notifStatus, refreshNotificationStatus],
  );
  
  const onToggleNotification = useCallback(
    (next: boolean) => {
      setNotifNextValue(next);
      setNotifConfirmOpen(true);
    },
    [],
  );
  
  const onConfirmToggle = useCallback(async () => {
    setNotifConfirmOpen(false);
    await applyNotificationChange(notifNextValue);
  }, [applyNotificationChange, notifNextValue]);
  
  // ===== Delete account flow =====
  const onPressDelete = useCallback(() => {
    // bạn có thể bỏ confirm modal nếu muốn: navigate thẳng
    setDeleteConfirmOpen(true);
  }, []);
  
  const goDeleteOtpScreen = useCallback(() => {
    setDeleteConfirmOpen(false);
    onSubmit();
    // ✅ chuyển sang màn OTP xoá tài khoản (screen riêng)
    // truyền phone để API xoá tài khoản dùng OTP
    navigate(SCREEN_NAME.DELETE_ACCOUNT_OTP_SCREEN, {
      phone: profile?.phone_number,
    });
  }, [profile?.phone_number]);
  
  const items = useMemo(
    () => [
      {
        icon: User,
        title: 'Chỉnh sửa thông tin cá nhân',
        subtitle: 'Cập nhật họ tên, địa chỉ, cây trồng…',
        onPress: handleEditProfile,
      },
      {
        icon: LogOut,
        title: 'Đăng xuất',
        subtitle: 'Thoát khỏi tài khoản',
        isDanger: true,
        onPress: () => hardLogout(),
      },
    ],
    [handleEditProfile],
  );
  
  return (
    <>
      <View style={styles.card}>
        <ActionButton {...items[0]} isLast={false} />
        
        {/* Notifications row */}
        <View style={styles.rowDivider} />
        <Pressable
          onPress={() => onToggleNotification(!notifEnabled)}
          style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
          <View style={[styles.iconWrap, {backgroundColor: 'rgba(11,43,30,0.08)'}]}>
            <Bell size={20} color={Colors.greenPrimary} />
          </View>
          
          <View style={styles.textWrap}>
            <CText style={styles.title}>Thông báo</CText>
            <CText style={styles.subtitle}>{notifSubtitle}</CText>
          </View>
          
          <Switch
            value={notifEnabled}
            onValueChange={onToggleNotification}
            disabled={notifChecking}
            trackColor={{
              false: 'rgba(0,0,0,0.15)',
              true: 'rgba(67,170,100,0.45)',
            }}
            thumbColor={notifEnabled ? Colors.greenPrimary : '#f4f4f4'}
          />
        </Pressable>
        <View style={styles.rowDivider} />
        
        <ActionButton {...items[1]} isLast={false} />
        
        {/* Delete account row */}
        <ActionButton
          icon={Trash2}
          title="Xoá tài khoản"
          subtitle="Xoá vĩnh viễn tài khoản và dữ liệu"
          isDanger
          onPress={onPressDelete}
          isLast
        />
      </View>
      
      {/* ===== Modal confirm notifications ===== */}
      <Modal
        transparent
        visible={notifConfirmOpen}
        animationType="fade"
        onRequestClose={() => setNotifConfirmOpen(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setNotifConfirmOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <CText style={styles.modalTitle}>
              {notifNextValue ? 'Bật thông báo?' : 'Tắt thông báo?'}
            </CText>
            
            <CText style={[styles.modalText, {marginTop: scale(10)}]}>
              {notifNextValue
                ? 'Bật thông báo để nhận ưu đãi, sự kiện và thông tin quan trọng từ Quang Nông 719.'
                : 'Nếu tắt, bạn sẽ không nhận được thông báo ưu đãi và sự kiện từ Quang Nông 719.'}
            </CText>
            
            <CText style={[styles.modalHint, {marginTop: scale(10)}]}>
              {Platform.OS === 'ios'
                ? '*Ứng dụng sẽ mở Cài đặt để bạn bật/tắt thông báo.'
                : '*Ứng dụng sẽ mở Cài đặt để bạn bật/tắt thông báo.'}
            </CText>
            
            <View style={styles.btnRow}>
              <Pressable
                onPress={() => setNotifConfirmOpen(false)}
                style={styles.secondaryBtn}>
                <CText style={styles.secondaryBtnText}>Huỷ</CText>
              </Pressable>
              
              <Pressable
                onPress={onConfirmToggle}
                style={[
                  styles.primaryBtn,
                  {backgroundColor: notifNextValue ? Colors.greenPrimary : Colors.red},
                ]}>
                <CText style={styles.primaryBtnText}>
                  {notifNextValue ? 'Bật' : 'Tắt'}
                </CText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      
      {/* ===== Modal confirm delete ===== */}
      <Modal
        transparent
        visible={deleteConfirmOpen}
        animationType="fade"
        onRequestClose={() => setDeleteConfirmOpen(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDeleteConfirmOpen(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <CText style={[styles.modalTitle, {color: Colors.red}]}>
              Xoá tài khoản?
            </CText>
            
            <CText style={[styles.modalText, {marginTop: scale(10)}]}>
              Bạn cần xác minh OTP để xoá tài khoản. Sau khi xoá, bạn sẽ bị đăng xuất và không thể khôi phục dữ liệu.
            </CText>
            
            <View style={styles.btnRow}>
              <Pressable
                onPress={() => setDeleteConfirmOpen(false)}
                style={styles.secondaryBtn}>
                <CText style={styles.secondaryBtnText}>Huỷ</CText>
              </Pressable>
              
              <Pressable onPress={goDeleteOtpScreen} style={styles.dangerBtn}>
                <CText style={styles.dangerBtnText}>Tiếp tục</CText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    paddingHorizontal: scale(14),
  },
  rowPressed: {
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  
  iconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  
  textWrap: {flex: 1, paddingRight: scale(10)},
  title: {
    fontSize: fontScale(15),
    fontWeight: '700',
    color: Colors.h1,
  },
  subtitle: {
    marginTop: scale(2),
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.55)',
  },
  
  // ===== Modal =====
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: scale(18),
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: scale(14),
    padding: scale(16),
  },
  modalTitle: {
    fontSize: fontScale(18),
    fontWeight: '900',
    color: Colors.h1,
  },
  modalText: {
    fontSize: fontScale(14),
    color: Colors.h2,
    lineHeight: fontScale(20),
  },
  modalHint: {
    fontSize: fontScale(12),
    color: 'rgba(0,0,0,0.5)',
    lineHeight: fontScale(18),
  },
  
  btnRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
  },
  secondaryBtn: {
    flex: 1,
    height: scale(46),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  secondaryBtnText: {fontWeight: '900', color: Colors.h1},
  
  primaryBtn: {
    flex: 1,
    height: scale(46),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {fontWeight: '900', color: Colors.white},
  
  dangerBtn: {
    flex: 1,
    height: scale(46),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red,
  },
  dangerBtnText: {fontWeight: '900', color: Colors.white},
});
