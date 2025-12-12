import {Images} from '@/assets/images';
import {CText} from '@/components';
import InvoiceBlock from '@/components/invoice-block';
import React from 'react';
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
import {Colors} from '@/themes';
import { hidePhoneNumber } from '@/utils/tools';

const scale = (size: number) => size;
const fontScale = (size: number) => size;
const defaultProps = {
  invoiceId: 'HD004632',
  branch: 'Chi nhánh trung tâm',
  purchaseDate: '2025-11-22',
  totalAmount: '7,000,000 VND',
  onDetailPress: () => console.log('Xem chi tiết hóa đơn'),
};

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
      <View style={styles.infoIconWrapper}>{icon}</View>
      <Image source={icon} style={{width: 24, height: 24}} />
      <Text style={[styles.infoBoxValue, {color}]}>{value}</Text>
      <Text style={styles.infoBoxLabel}>{label}</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen: React.FC = () => {
  const customerPhone = '0332775667';
  const customerPoints = '999,999';

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundInput}
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
          <CText style={styles.greetingTitle}>Chào buổi sáng!</CText>
          <CText
            fontSize={fontScale(20)}
            style={{fontWeight: 'bold', paddingHorizontal: scale(10)}}>
            Nhâm QT
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
                {hidePhoneNumber(customerPhone)}
              </CText>
              <CText fontSize={fontScale(16)}>Nguyễn Đức Nhâm!</CText>
            </View>

            <View style={styles.pointsContainer}>
              <CText style={styles.diamondIcon}>💎</CText>
              <CText style={styles.pointsText}>Kim cương</CText>
              <CText style={styles.pointsValue}>{customerPoints} điểm</CText>
            </View>
          </View>

          <View style={styles.quickActionsContainer}>
            <TouchableOpacity
              style={styles.quickActionButton}
              activeOpacity={0.7}>
              <Image
                source={Images.qrcodeIcon}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Mã của tôi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              activeOpacity={0.7}>
              <Image
                source={Images.walletIcon}
                style={styles.quickActionIcon}
              />
              <Text style={styles.quickActionText}>Công nợ của tôi</Text>
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
              value="2"
              label="Phiếu ưu đãi"
              color={Colors.orange}
            />
            <InfoBox
              icon={Images.listInvoice}
              value="48"
              label="Tổng số hoá đơn"
            />
            <InfoBox
              icon={Images.eventIcon}
              value="2"
              label="Số sự kiện đã tham gia"
            />
            <InfoBox
              icon={Images.debt}
              value="7,000,000"
              label="Công nợ hiện tại"
              color={Colors.green}
            />
          </View>

          {/* <NextTaskBlock /> */}
          <View style={{paddingVertical: scale(10)}}>
            <View style={styles.invoiceCurrentHeader}>
              <Image source={Images.listInvoice} style={styles.iconStyle} />
              <CText fontSize={fontScale(18)} style={{fontWeight: 'bold'}}>Hóa đơn gần đây</CText>
            </View>
            <InvoiceBlock
            {...defaultProps}
            status="PARTIALLY_PAID"
            remainingDebt="500,000 VND"
          />
          </View>

          {/* <UpcomingEventBlock
                blockIcon="☕"
                eventTitle="Hội thảo Kỹ thuật Cà phê Lạnh"
                eventTime="2026-01-20 • 09:00 - 11:00"
                iconBackgroundColor={Colors.iconBg}
            /> */}

          <View style={styles.quickAccessGrid}>
            <QuickAccessBox
              icon={Images.skillCorner}
              label="Mẹo canh tác"
            />
            <QuickAccessBox
              icon={Images.helpSupport}
              label="Hỗ trợ"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
