import {Images} from '@/assets/images';
import {CText} from '@/components';
import InvoiceBlock from '@/components/invoice-block';
import {SCREEN_NAME} from '@/constants';
import {useGetInvoiceList} from '@/hooks/useInvoice';
import {useGetPlant} from '@/hooks/usePlant';
import {useGetProfile} from '@/hooks/useProfile';
import {navigate} from '@/navigators';
import {isProfileCompleted} from '@/screens/home-screen/helper';
import {InvoiceResponse} from '@/services/invoice.api';
import {Colors} from '@/themes';
import {formatCurrency} from '@/utils/tools';
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {QuickAccessBox} from './components/QuickAccessBox';
import {styles} from './style.module';

const scale = (size: number) => size;
const fontScale = (size: number) => size;

interface InfoBoxProps {
  icon: any;
  value: string;
  label: string;
  color?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  icon,
  value,
  label,
  color = Colors.h2,
}) => (
  <View style={styles.infoBoxContainer}>
    <TouchableOpacity style={styles.infoBox} activeOpacity={0.8}>
      <Image source={icon} style={{width: 24, height: 24}} />
      <Text style={[styles.infoBoxValue, {color}]}>{value}</Text>
      <Text style={styles.infoBoxLabel}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen: React.FC = () => {
  const customerPhone = '0922982986';
  const isFocused = useIsFocused();

  const {data: profile} = useGetProfile();
  const {data: invoiceResponse} = useGetInvoiceList(profile?.phone_number) as {
    data?: InvoiceResponse;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
  };

  const mustComplete = !!(isFocused && profile && !isProfileCompleted(profile));
  const {data: plants} = useGetPlant();

  const [showModal, setShowModal] = useState(false);
  const [pendingGoProfile, setPendingGoProfile] = useState(false);

  useEffect(() => {
    if (mustComplete) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setPendingGoProfile(false);
    }
  }, [mustComplete]);

  useEffect(() => {
    if (!mustComplete) {
      return;
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [mustComplete]);

  const requestGoCompleteProfile = useCallback(() => {
    if (!profile) {
      return;
    }
    setPendingGoProfile(true);
    setShowModal(false);
  }, [profile]);

  const handleModalHide = useCallback(() => {
    if (pendingGoProfile && profile) {
      setPendingGoProfile(false);
      navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN, {profile});
    }
  }, [pendingGoProfile, profile]);

  const getGreetingByTime = (date = new Date()) => {
    const h = date.getHours();
    if (h >= 5 && h < 11) {
      return 'Chào buổi sáng!';
    }
    if (h >= 11 && h < 14) {
      return 'Chào buổi trưa!';
    }
    if (h >= 14 && h < 18) {
      return 'Chào buổi chiều!';
    }
    return 'Chào buổi tối!';
  };

  const greetingTitle = useMemo(() => getGreetingByTime(), []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.greenPrimary}
      />

      <View style={styles.headerBackground}>
        <View style={styles.headerBar}>
          <Image
            source={Images.bannner}
            style={styles.headerLogo}
            resizeMethod="resize"
          />
          <LinearGradient
            colors={[
              'rgba(34, 139, 34, 0)',
              'rgba(182, 186, 182, 0.3)',
              'rgba(222, 224, 222, 0.65)',
              'rgba(222, 224, 222, 0.95)',
            ]}
            style={styles.headerGradient}
          />
        </View>

        <View style={styles.headerHelloContainer}>
          <CText style={styles.greetingTitle}>{greetingTitle}</CText>
          <CText
            fontSize={fontScale(20)}
            style={{fontWeight: 'bold', paddingHorizontal: scale(10)}}>
            {profile?.full_name}
          </CText>
          <CText style={styles.greetingSubtitle}>
            Hãy kiểm tra tiến độ vườn của bạn hôm nay
          </CText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.customerInfoBox}>
          <View style={styles.row}>
            <View>
              <CText style={styles.label}>Mã Khách Hàng</CText>
              <CText style={styles.customerPhone}>
                {profile?.phone_number || customerPhone}
              </CText>
              <CText fontSize={fontScale(16)}>
                {profile?.full_name || 'Nguyễn Đức Nhâm!'}
              </CText>
            </View>

            <View style={styles.pointsContainer}>
              <CText style={styles.diamondIcon}>💎</CText>
              <CText style={styles.pointsText}>Thành viên</CText>
              <CText style={styles.pointsValue}>
                {profile?.reward_point || 0} điểm
              </CText>
            </View>
          </View>

          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionButton}
              activeOpacity={0.7}
              onPress={() =>
                navigate(SCREEN_NAME.BARCODE_CUSTOMER_SCREEN, profile)
              }>
              <Image
                source={Images.qrcodeIcon}
                style={styles.quickActionIcon}
              />
              <CText style={styles.quickActionText}>Mã của tôi</CText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionButton}
              activeOpacity={0.7}>
              <Image
                source={Images.walletIcon}
                style={styles.quickActionIcon}
              />
              <CText style={styles.quickActionText}>Công nợ của tôi</CText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.bannerContainer}>
            <Image
              source={Images.bannner}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTextMain}>KÍCH HOẠT</Text>
              <Text style={styles.bannerTextSub}>PHÂN HÓA MẦM HOA</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <InfoBox
              icon={Images.voucherIcon}
              value="0"
              label="Phiếu ưu đãi"
              color={Colors.gray300}
            />
            <InfoBox
              icon={Images.listInvoice}
              value={formatCurrency(profile?.total_invoiced?.toString() || '0')}
              label="Tổng số hoá đơn"
            />
            <InfoBox
              icon={Images.eventIcon}
              value="0"
              label="Số sự kiện đã tham gia"
            />
            <InfoBox
              icon={Images.debt}
              value={formatCurrency(profile?.debt) || '0 VND'}
              label="Công nợ hiện tại"
              color={Colors.black}
            />
          </View>

          <View style={{paddingVertical: scale(10)}}>
            <View style={styles.invoiceCurrentHeader}>
              <Image source={Images.listInvoice} style={styles.iconStyle} />
              <CText fontSize={fontScale(18)} style={{fontWeight: 'bold'}}>
                Hóa đơn gần đây
              </CText>
            </View>

            {invoiceResponse?.data?.length ? (
              <InvoiceBlock
                invoiceId={invoiceResponse?.data[0]?.code}
                branchName={invoiceResponse?.data[0]?.branchName}
                purchaseDate={invoiceResponse?.data[0]?.purchaseDate}
                totalAmount={String(invoiceResponse?.data[0]?.total)}
                status={invoiceResponse?.data[0]?.status as any}
                onDetailPress={() =>
                  navigate(SCREEN_NAME.INVOICE_DETAIL_SCREEN, {
                    invoice: invoiceResponse?.data[0],
                  })
                }
                totalPayment={invoiceResponse?.data[0]?.totalPayment}
                invoiceDetails={invoiceResponse?.data[0]?.invoiceDetails}
              />
            ) : (
              <View>
                <CText>Không có hóa đơn gần đây</CText>
              </View>
            )}
          </View>

          <View style={styles.quickAccessGrid}>
            <QuickAccessBox icon={Images.skillCorner} label="Mẹo canh tác" />
            <QuickAccessBox icon={Images.helpSupport} label="Hỗ trợ" />
          </View>
        </View>
      </ScrollView>

      {/* ✅ MODAL chỉ render khi screen focus, đóng xong mới navigate */}
      {/* {isFocused ? (
        <Modal
          isVisible={showModal}
          useNativeDriver
          hideModalContentWhileAnimating
          backdropOpacity={0.65}
          onBackdropPress={() => {}}
          onBackButtonPress={() => {}}
          onModalHide={handleModalHide}
          style={{margin: 0, justifyContent: 'center', paddingHorizontal: 18}}>
          <View
            style={{backgroundColor: '#fff', borderRadius: 14, padding: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
              <Image
                source={Images.logo}
                resizeMode="contain"
                style={{width: 42, height: 42}}
              />
              <View style={{flex: 1}}>
                <CText
                  style={{fontSize: 18, fontWeight: '900', color: Colors.h1}}>
                  Cần hoàn thiện hồ sơ
                </CText>
                <CText style={{marginTop: 2, color: Colors.h2}}>
                  Bạn phải cập nhật thông tin để tiếp tục sử dụng ứng dụng.
                </CText>
              </View>
            </View>

            <View
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                backgroundColor: 'rgba(0,0,0,0.04)',
              }}>
              <CText style={{color: Colors.h2}}>
                Vui lòng bổ sung: Đổi tên của bạn, Tỉnh/Thành, Xã/Phường, Địa
                chỉ và Cây trồng.
              </CText>
            </View>

            <Pressable
              onPress={requestGoCompleteProfile}
              style={{
                marginTop: 14,
                height: 48,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.greenPrimary,
              }}>
              <CText style={{fontWeight: '900', color: Colors.white}}>
                Cập nhật ngay
              </CText>
            </Pressable>
          </View>
        </Modal>
      ) : null} */}
    </View>
  );
};

export default HomeScreen;
