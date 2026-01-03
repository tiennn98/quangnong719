import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {AppState, Pressable, StyleSheet, Switch, View} from 'react-native';
import Modal from 'react-native-modal';
import {Bell} from 'lucide-react-native';
import CText from '@/components/text';
import {Colors} from '@/themes';
import {fontScale, scale} from 'react-native-utils-scale';

import {
  checkNotifications,
  requestNotifications,
  openSettings,
  NotificationSettings,
  NotificationStatus,
} from 'react-native-permissions';

type ConfirmKind = 'enable' | 'disable';

const NotificationToggleRow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<NotificationStatus>('denied');
  const [checking, setChecking] = useState(true);
  
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>('enable');
  
  const refresh = useCallback(async () => {
    try {
      setChecking(true);
      const res = await checkNotifications();
      setStatus(res.status);
      setEnabled(res.status === 'granted' || res.status === 'limited');
    } catch (e) {
      // nếu lỗi check thì cứ coi như đang tắt
      setEnabled(false);
    } finally {
      setChecking(false);
    }
  }, []);
  
  // Load lần đầu + khi quay lại app (user từ Settings quay về)
  useEffect(() => {
    refresh();
    const sub = AppState.addEventListener('change', s => {
      if (s === 'active') refresh();
    });
    return () => sub.remove();
  }, [refresh]);
  
  const subtitle = useMemo(() => {
    if (checking) return 'Đang kiểm tra trạng thái…';
    if (enabled) return 'Đang bật • Bạn sẽ nhận thông báo ưu đãi/sự kiện';
    return 'Đang tắt • Bạn sẽ không nhận thông báo ưu đãi/sự kiện';
  }, [checking, enabled]);
  
  const onTogglePress = useCallback(
    (next: boolean) => {
      // next = user muốn bật hay muốn tắt
      setConfirmKind(next ? 'enable' : 'disable');
      setConfirmVisible(true);
    },
    [],
  );
  
  const doEnable = useCallback(async () => {
    // iOS/Android: request permission
    // Nếu bị "blocked" thì phải vào Settings
    try {
      if (status === 'blocked') {
        await openSettings();
        return;
      }
      
      const res = await requestNotifications(['alert', 'sound', 'badge']);
      // res.status: granted/denied/blocked/limited
      if (res.status === 'blocked') {
        await openSettings();
      }
    } finally {
      // refresh lại để toggle phản ánh đúng trạng thái thật
      setTimeout(refresh, 300);
    }
  }, [refresh, status]);
  
  const doDisable = useCallback(async () => {
    // Không thể “tắt” notification trực tiếp bằng code.
    // Phải mở Settings để user tắt.
    await openSettings();
    setTimeout(refresh, 300);
  }, [refresh]);
  
  const onConfirm = useCallback(async () => {
    setConfirmVisible(false);
    if (confirmKind === 'enable') {
      await doEnable();
    } else {
      await doDisable();
    }
  }, [confirmKind, doDisable, doEnable]);
  
  return (
    <>
      <Pressable
        onPress={() => onTogglePress(!enabled)}
        style={({pressed}) => [
          styles.row,
          pressed && styles.rowPressed,
        ]}
      >
        <View style={styles.iconWrap}>
          <Bell size={20} color={Colors.greenPrimary} />
        </View>
        
        <View style={styles.textWrap}>
          <CText style={styles.title}>Thông báo</CText>
          <CText style={styles.subtitle}>{subtitle}</CText>
        </View>
        
        <Switch
          value={enabled}
          onValueChange={onTogglePress}
          disabled={checking}
          trackColor={{false: 'rgba(0,0,0,0.15)', true: 'rgba(67,170,100,0.45)'}}
          thumbColor={enabled ? Colors.greenPrimary : '#f4f4f4'}
        />
      </Pressable>
      
      <Modal
        isVisible={confirmVisible}
        onBackdropPress={() => setConfirmVisible(false)}
        onBackButtonPress={() => setConfirmVisible(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropOpacity={0.6}
        style={{margin: 0, justifyContent: 'center', paddingHorizontal: scale(18)}}
      >
        <View style={styles.modalCard}>
          <CText style={styles.modalTitle}>
            {confirmKind === 'disable' ? 'Tắt thông báo?' : 'Bật thông báo?'}
          </CText>
          
          <CText style={styles.modalDesc}>
            {confirmKind === 'disable'
              ? 'Nếu tắt, bạn sẽ không nhận được thông báo ưu đãi và sự kiện từ Quang Nông 719.'
              : 'Bật thông báo để nhận ưu đãi, sự kiện và nhắc lịch quan trọng từ Quang Nông 719.'}
          </CText>
          
          <View style={styles.modalActions}>
            <Pressable
              onPress={() => setConfirmVisible(false)}
              style={({pressed}) => [
                styles.btn,
                styles.btnGhost,
                pressed && {opacity: 0.85},
              ]}
            >
              <CText style={styles.btnGhostText}>Hủy</CText>
            </Pressable>
            
            <Pressable
              onPress={onConfirm}
              style={({pressed}) => [
                styles.btn,
                styles.btnPrimary,
                pressed && {opacity: 0.9},
              ]}
            >
              <CText style={styles.btnPrimaryText}>
                {confirmKind === 'disable' ? 'Tắt' : 'Bật'}
              </CText>
            </Pressable>
          </View>
          
          <CText style={styles.modalHint}>
            *Ứng dụng sẽ mở phần Cài đặt để bạn bật/tắt thông báo trên điện thoại.
          </CText>
        </View>
      </Modal>
    </>
  );
};

export default NotificationToggleRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    paddingHorizontal: scale(14),
  },
  rowPressed: {backgroundColor: 'rgba(0,0,0,0.04)'},
  iconWrap: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
    backgroundColor: 'rgba(11,43,30,0.08)',
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
  
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: scale(14),
    padding: scale(16),
  },
  modalTitle: {fontSize: fontScale(18), fontWeight: '900', color: Colors.h1},
  modalDesc: {marginTop: scale(8), color: Colors.h2, fontSize: fontScale(14), lineHeight: fontScale(20)},
  modalActions: {flexDirection: 'row', gap: scale(10), marginTop: scale(14)},
  btn: {
    flex: 1,
    height: scale(46),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhost: {backgroundColor: 'rgba(0,0,0,0.06)'},
  btnGhostText: {fontWeight: '900', color: Colors.h1},
  btnPrimary: {backgroundColor: Colors.greenPrimary},
  btnPrimaryText: {fontWeight: '900', color: Colors.white},
  
  modalHint: {marginTop: scale(10), fontSize: fontScale(12), color: 'rgba(0,0,0,0.5)'},
});
