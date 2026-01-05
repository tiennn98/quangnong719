import { Images } from '@/assets';
import CButton from '@/components/button';
import CText from '@/components/text';
import { goBack } from '@/navigators';
import { UserProfileData } from '@/services/profile.api';
import { Colors } from '@/themes/color';
import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ChevronLeft, Copy, ScanLine, Share2, X } from 'lucide-react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import { BarcodeCreatorView, BarcodeFormat } from 'react-native-barcode-creator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale, width } from 'react-native-utils-scale';
import { styles } from './style.module';

type RouteParams = {
  BarCodeCustomerScreen: UserProfileData | undefined;
};

const ONLY_DIGITS = /[^0-9]/g;

const BarCodeCustomerScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'BarCodeCustomerScreen'>>();
  const data = route?.params;
  const insets = useSafeAreaInsets();

  const [toast, setToast] = useState<string | null>(null);
  const [zoomVisible, setZoomVisible] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(10)).current;

  const fullName = useMemo(() => {
    const name = data?.full_name?.trim();
    return name && name.length > 0 ? name : 'Khách hàng';
  }, [data?.full_name]);

  const phoneNumber = useMemo(() => {
    const raw = (data?.phone_number ?? '').trim();
    return raw.replace(ONLY_DIGITS, '');
  }, [data?.phone_number]);
  const reward_point = useMemo(() => {
    return data?.reward_point != null ? data.reward_point.toString() : null;
  }, [data?.reward_point]);

  const customerCode = phoneNumber || '—';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {toValue: 1, duration: 260, useNativeDriver: true}),
      Animated.timing(lift, {toValue: 0, duration: 260, useNativeDriver: true}),
    ]).start();
  }, [fade, lift]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleGoBack = useCallback(() => goBack(), []);

  const handleCopy = useCallback(() => {
    if (!phoneNumber) {
      showToast('Không có mã để sao chép');
      return;
    }
    Clipboard.setString(phoneNumber);
    showToast('Đã sao chép mã khách hàng');
  }, [phoneNumber, showToast]);

  const handleShare = useCallback(async () => {
    if (!phoneNumber) {
      showToast('Không có mã để chia sẻ');
      return;
    }
    try {
      const message = `Mã khách hàng của tôi: ${phoneNumber}\nTên: ${fullName}`;
      await Share.share({message});
    } catch {}
  }, [phoneNumber, fullName, showToast]);

  const handleZoom = useCallback(() => {
    if (!phoneNumber) {
      showToast('Không có mã để hiển thị');
      return;
    }
    setZoomVisible(true);
  }, [phoneNumber, showToast]);

  const closeZoom = useCallback(() => setZoomVisible(false), []);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleGoBack}
          activeOpacity={0.7}
          style={styles.backBtn}
          hitSlop={{top: 10, right: 10}}>
          <ChevronLeft
            color={Colors.greenPrimary}
            size={24}
            style={{marginRight: scale(8), marginLeft: scale(-8)}}
          />
          <CText style={styles.h1} fontSize={fontScale(30)} color={Colors.h1}>
            Mã của tôi
          </CText>
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <CText style={styles.hint} fontSize={fontScale(18)} color={Colors.h1}>
            Xuất trình mã này tại cửa hàng để tra cứu thông tin nhanh chóng
          </CText>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <Animated.View style={{opacity: fade, transform: [{translateY: lift}]}}>
          <View style={styles.card}>
            <View style={styles.identityTop}>
              <View style={styles.avatarCircle}>
                <Image
                  source={Images.logo}
                  style={styles.avatarLogo}
                  resizeMode="contain"
                />
              </View>

              <View style={{flex: 1}}>
                <CText
                  style={styles.name}
                  fontSize={fontScale(22)}
                  color={Colors.h1}>
                  {fullName}
                </CText>

                <CText
                  style={styles.sub}
                  fontSize={fontScale(20)}
                  color={Colors.h2}>
                  Mã khách hàng:{' '}
                  <CText style={styles.subBold} fontSize={fontScale(20)}>
                    {customerCode}
                  </CText>
                </CText>
              </View>

              <View style={styles.actionCol}>
                <ActionIcon
                  onPress={handleCopy}
                  icon={<Copy size={18} color={Colors.greenPrimary} />}
                />
                <ActionIcon
                  onPress={handleShare}
                  icon={<Share2 size={18} color={Colors.greenPrimary} />}
                />
                <ActionIcon
                  onPress={handleZoom}
                  icon={<ScanLine size={18} color={Colors.greenPrimary} />}
                />
              </View>
            </View>

            <View style={styles.codeWrapOuter}>
              <View style={styles.codeWrapInner}>
                {phoneNumber ? (
                  <BarcodeCreatorView
                    value={phoneNumber}
                    background="#FFFFFF"
                    foregroundColor="#000000"
                    format={BarcodeFormat.CODE128}
                    style={{width: width - scale(64), height: scale(220)}}
                  />
                ) : (
                  <View style={styles.emptyBarcode}>
                    <CText
                      color={Colors.h2}
                      fontSize={fontScale(14)}
                      style={{textAlign: 'center'}}>
                      Chưa có số điện thoại để tạo mã.{'\n'}Vui lòng đăng nhập
                      lại.
                    </CText>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.tipRow}>
              <View style={styles.tipDot} />
              <CText
                style={styles.codeHint}
                fontSize={fontScale(14)}
                color={Colors.h2}>
                Đưa mã này cho nhân viên cửa hàng để quét
              </CText>
            </View>
          </View>
        </Animated.View>

        <View style={styles.card}>
          <CText
            style={styles.sectionTitle}
            fontSize={fontScale(18)}
            color={Colors.h1}>
            Thông tin tài khoản
          </CText>

          <InfoRow label="Họ và tên" value={fullName} />
          <InfoRow label="Mã khách hàng" value={customerCode} bold />
          <InfoRow label="Điểm" value={reward_point || '—'} />
        </View>

        <View style={[styles.card, styles.howCard]}>
          <View style={styles.howHeader}>
            <View style={styles.infoDot}>
              <CText fontSize={fontScale(20)} color={Colors.h1}>
                i
              </CText>
            </View>

            <CText
              style={styles.howTitle}
              fontSize={fontScale(20)}
              color={Colors.h1}>
              Cách sử dụng
            </CText>
          </View>

          <View style={styles.howList}>
            <HowItem text="Đưa mã này cho nhân viên cửa hàng" />
            <HowItem text="Nhân viên quét mã để truy cập tài khoản của bạn" />
            <HowItem text="Kiểm tra lịch sử mua hàng và công nợ hiện tại (nếu có)" />
            <HowItem text="Thanh toán hoặc áp dụng voucher/ưu đãi" />
          </View>
        </View>

        <View style={styles.bottom}>
          <CButton title="Xem công nợ & số dư" onPress={() => {}} />
        </View>
      </ScrollView>

      {toast ? (
        <View pointerEvents="none" style={styles.toastWrap}>
          <View style={styles.toast}>
            <CText color="#fff" fontSize={fontScale(20)}>
              {toast}
            </CText>
          </View>
        </View>
      ) : null}

      <Modal
        visible={zoomVisible}
        transparent
        animationType="fade"
        onRequestClose={closeZoom}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <CText
                fontSize={fontScale(20)}
                color={Colors.h1}
                style={{fontWeight: '900'}}>
                Mã khách hàng
              </CText>

              <TouchableOpacity
                onPress={closeZoom}
                activeOpacity={0.7}
                style={styles.modalCloseBtn}>
                <X size={18} color={Colors.h1} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBarcodeBox}>
              <BarcodeCreatorView
                value={phoneNumber}
                background="#FFFFFF"
                foregroundColor="#000000"
                format={BarcodeFormat.CODE128}
                style={{width: width - scale(60), height: scale(260)}}
              />
            </View>

            <CText
              style={{textAlign: 'center', opacity: 0.8, marginTop: scale(10)}}
              fontSize={fontScale(20)}
              color={Colors.h2}>
              {fullName} • {customerCode}
            </CText>

            <View style={{marginTop: scale(14)}}>
              <CButton title="Sao chép mã" onPress={handleCopy} />
            </View>

            <View style={{marginTop: scale(10)}}>
              <CButton title="Chia sẻ" onPress={handleShare} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(BarCodeCustomerScreen);

const ActionIcon = memo(
  ({onPress, icon}: {onPress: () => void; icon: React.ReactNode}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.actionBtn}>
        {icon}
      </TouchableOpacity>
    );
  },
);

const InfoRow = memo(
  ({label, value, bold}: {label: string; value: string; bold?: boolean}) => {
    return (
      <View style={styles.row}>
        <CText style={styles.label} fontSize={fontScale(20)} color={Colors.h2}>
          {label}:
        </CText>
        <CText
          style={[styles.value, bold && styles.valueBold]}
          fontSize={fontScale(20)}
          color={Colors.h1}>
          {value}
        </CText>
      </View>
    );
  },
);

const HowItem = memo(({text}: {text: string}) => {
  return (
    <View style={styles.howItemRow}>
      <View style={styles.bullet} />
      <CText
        fontSize={fontScale(20)}
        color={Colors.h1}
        style={styles.howItemText}>
        {text}
      </CText>
    </View>
  );
});
