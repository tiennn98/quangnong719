import {Images} from '@/assets/images';
import {CText} from '@/components';
import InvoiceBlock from '@/components/invoice-block';
import {SCREEN_NAME} from '@/constants';
import {useGetInvoiceList} from '@/hooks/useInvoice';
import {useGetProfile} from '@/hooks/useProfile';
import {navigate} from '@/navigators';
import {InvoiceResponse} from '@/services/invoice.api';
import {Colors} from '@/themes';
import {formatCurrency} from '@/utils/tools';
import React, {useEffect, useMemo} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
      {/*<View style={styles.infoIconWrapper}>{icon}</View> */}
      <Image source={icon} style={{width: 24, height: 24}} />
      <Text style={[styles.infoBoxValue, {color}]}>{value}</Text>
      <Text style={styles.infoBoxLabel}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen: React.FC = () => {
  const customerPhone = '0922982986';
  const {data: profile} = useGetProfile();
  const {
    data: invoiceResponse,
    isLoading,
    isFetching,
    refetch: refetchInvoices,
  } = useGetInvoiceList(profile?.phone_number) as {
    data?: InvoiceResponse;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
  };
  useEffect(() => {
    if (profile?.full_name === profile?.phone_number) {
      navigate(SCREEN_NAME.PROFILE_COMPLETION_SCREEN, {isFromHome: true});
    }
  }, [profile]);
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

    if (h >= 18 && h < 22) {
      return 'Chào buổi tối!';
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
              value={formatCurrency(profile?.total_invoiced.toString() || '0')}
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

          {/* <NextTaskBlock /> */}
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

          {/* <UpcomingEventBlock
                blockIcon="☕"
                eventTitle="Hội thảo Kỹ thuật Cà phê Lạnh"
                eventTime="2026-01-20 • 09:00 - 11:00"
                iconBackgroundColor={Colors.iconBg}
            /> */}

          <View style={styles.quickAccessGrid}>
            <QuickAccessBox icon={Images.skillCorner} label="Mẹo canh tác" />
            <QuickAccessBox icon={Images.helpSupport} label="Hỗ trợ" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
