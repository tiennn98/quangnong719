import { Images } from '@/assets/images';
import { CText } from '@/components';
import { SCREEN_NAME } from '@/constants';
import { useGetProfile } from '@/hooks/useProfile';
import { navigate } from '@/navigators';
import { Colors, Fonts } from '@/themes';
import {
  CalendarDays,
  ChevronRight,
  CloudRain,
  Percent,
  ShoppingBag,
  Sprout,
  Ticket,
} from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';
import CustomerSummaryCard from './components/CustomerSummaryCard';
import HomeHeader from './components/HomeHeader';

const VOUCHERS = [
  {
    id: '1',
    title: '3 voucher đang có',
    subtitle: 'Sẵn sàng sử dụng',
    icon: 'ticket' as const,
  },
  {
    id: '2',
    title: 'Giảm 50.000đ',
    subtitle: 'Cho đơn từ 500K',
    icon: 'percent' as const,
  },
  {
    id: '3',
    title: 'Tiết kiệm 15%',
    subtitle: 'Phân bón mùa mưa',
    icon: 'percent' as const,
  },
];

const QUICK_INFO = [
  {
    id: 'purchase',
    icon: 'bag' as const,
    value: '1.111.430đ',
    label: 'Tổng mua hàng',
    action: 'Xem chi tiết',
  },
  {
    id: 'gardens',
    icon: 'sprout' as const,
    value: '4',
    label: 'Số vườn',
    action: 'Xem vườn',
  },
  {
    id: 'schedule',
    icon: 'calendar' as const,
    value: '3',
    label: 'Lịch sắp tới',
    action: 'Xem lịch',
  },
  {
    id: 'events',
    icon: 'ticket' as const,
    value: '0',
    label: 'Sự kiện đã tham gia',
    action: 'Xem sự kiện',
  },
];

const SPRAY_SCHEDULE = [
  {
    id: '1',
    title: 'Vườn Sầu Riêng 1',
    task: 'Phun nấm bệnh',
    time: '09:00',
    rain: '70%',
    image: Images.thung,
  },
  {
    id: '2',
    title: 'Vườn Cam 2',
    task: 'Phun sâu bệnh',
    time: '15:30',
    rain: '40%',
    image: Images.thung,
  },
];

const HomeScreen: React.FC = () => {
  const { data: profile } = useGetProfile();

  const greetingTitle = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 11) {
      return 'Chào buổi sáng! ☀️';
    }
    if (h >= 11 && h < 14) {
      return 'Chào buổi trưa! 🌤️';
    }
    if (h >= 14 && h < 18) {
      return 'Chào buổi chiều! 🌥️';
    }
    return 'Chào buổi tối! 🌙';
  }, []);

  const avatarUri = profile?.avatar
    ? profile.avatar.startsWith('http')
      ? profile.avatar
      : `https://quangnong.vn/${profile.avatar.replace(/^\//, '')}`
    : null;

  const renderVoucherIcon = (type: 'ticket' | 'percent') => {
    if (type === 'ticket') {
      return <Ticket color={Colors.greenPrimary} size={18} />;
    }
    return <Percent color={Colors.greenPrimary} size={18} />;
  };

  const renderQuickIcon = (type: 'bag' | 'sprout' | 'calendar' | 'ticket') => {
    const color = Colors.greenPrimary;
    const size = 18;
    switch (type) {
      case 'bag':
        return <ShoppingBag color={color} size={size} />;
      case 'sprout':
        return <Sprout color={color} size={size} />;
      case 'calendar':
        return <CalendarDays color={color} size={size} />;
      default:
        return <Ticket color={color} size={size} />;
    }
  };

  const handleGardenInfoPress = useCallback(() => {
    navigate(SCREEN_NAME.MY_GARDEN);
  }, []);

  const handleQrPress = useCallback(() => {
    navigate(SCREEN_NAME.MY_QRCODE_SCREEN);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <HomeHeader
        greeting={greetingTitle}
        notificationCount={2}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CustomerSummaryCard
          avatarUri={avatarUri}
          customerCode={profile?.phone_number || '—'}
          memberLabel="Member"
          points={profile?.reward_point ?? profile?.loyalty_points ?? 0}
          onQrPress={handleQrPress}
          onGardenInfoPress={handleGardenInfoPress}
        />

        <SectionHeader title="Khuyến mãi nổi bật" actionLabel="Xem tất cả" />
        <View style={styles.bannerWrap}>
          <Image
            source={Images.bannner}
            style={styles.featureBanner}
            resizeMode="cover"
          />
          <View style={styles.bannerDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <SectionHeader title="Voucher của tôi" actionLabel="Xem tất cả" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {VOUCHERS.map(item => (
            <View key={item.id} style={styles.voucherCard}>
              <View style={styles.voucherIconWrap}>
                {renderVoucherIcon(item.icon)}
              </View>
              <View style={styles.voucherTextWrap}>
                <CText style={styles.voucherTitle}>{item.title}</CText>
                <CText style={styles.voucherSubtitle}>{item.subtitle}</CText>
              </View>
              <ChevronRight color={Colors.gray300} size={18} />
            </View>
          ))}
        </ScrollView>

        <SectionHeader title="Thông tin nhanh" />
        <View style={styles.quickGrid}>
          {QUICK_INFO.map(item => (
            <View key={item.id} style={styles.quickCard}>
              <View style={styles.quickCardTop}>
                <View style={styles.quickIconWrap}>
                  {renderQuickIcon(item.icon)}
                </View>
                <View style={styles.quickTextWrap}>
                  <CText style={styles.quickValue}>{item.value}</CText>
                  <CText style={styles.quickLabel}>{item.label}</CText>
                </View>
              </View>
              <Pressable style={styles.quickActionRow}>
                <CText style={styles.quickActionText}>{item.action}</CText>
                <ChevronRight color={Colors.greenPrimary} size={14} />
              </Pressable>
            </View>
          ))}
        </View>

        <SectionHeader title="Lịch phun hôm nay" actionLabel="Xem lịch" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {SPRAY_SCHEDULE.map(item => (
            <View key={item.id} style={styles.scheduleCard}>
              <Image source={item.image} style={styles.scheduleImage} />
              <View style={styles.scheduleBody}>
                <CText style={styles.scheduleTitle}>{item.title}</CText>
                <CText style={styles.scheduleTask}>{item.task}</CText>
                <View style={styles.scheduleMeta}>
                  <CText style={styles.scheduleTime}>{item.time}</CText>
                  <View style={styles.rainRow}>
                    <CloudRain color={Colors.blue400} size={14} />
                    <CText style={styles.rainText}>{item.rain}</CText>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const SectionHeader = ({
  title,
  actionLabel,
}: {
  title: string;
  actionLabel?: string;
}) => (
  <View style={styles.sectionHeader}>
    <CText style={styles.sectionTitle}>{title}</CText>
    {actionLabel ? (
      <Pressable hitSlop={8} style={styles.sectionActionRow}>
        <CText style={styles.sectionAction}>{actionLabel}</CText>
        <ChevronRight color={Colors.gray500} size={14} />
      </Pressable>
    ) : null}
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scale(24),
  },
  bannerWrap: {
    marginHorizontal: scale(16),
    borderRadius: scale(16),
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  featureBanner: {
    width: '100%',
    height: scale(150),
  },
  bannerDots: {
    position: 'absolute',
    bottom: scale(10),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(6),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: 'rgba(255,255,255,0.45)',
  },
  dotActive: {
    width: scale(16),
    backgroundColor: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(20),
    marginBottom: scale(10),
  },
  sectionTitle: {
    fontSize: fontScale(16),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  sectionAction: {
    fontSize: fontScale(12),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    marginRight: scale(2),
  },
  sectionActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalList: {
    paddingHorizontal: scale(16),
    gap: scale(10),
  },
  voucherCard: {
    width: width * 0.72,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    padding: scale(12),
    marginRight: scale(10),
  },
  voucherIconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  voucherTextWrap: {
    flex: 1,
  },
  voucherTitle: {
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  voucherSubtitle: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(2),
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(16),
    gap: scale(10),
  },
  quickCard: {
    width: (width - scale(42)) / 2,
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    padding: scale(12),
  },
  quickCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quickIconWrap: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(10),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(8),
  },
  quickTextWrap: {
    flex: 1,
  },
  quickValue: {
    fontSize: fontScale(15),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  quickLabel: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(2),
  },
  quickActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
  },
  quickActionText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
    marginRight: scale(2),
  },
  scheduleCard: {
    width: width * 0.72,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    overflow: 'hidden',
    marginRight: scale(10),
  },
  scheduleImage: {
    width: scale(88),
    height: '100%',
    minHeight: scale(96),
  },
  scheduleBody: {
    flex: 1,
    padding: scale(12),
    justifyContent: 'center',
  },
  scheduleTitle: {
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  scheduleTask: {
    fontSize: fontScale(12),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(4),
  },
  scheduleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(10),
  },
  scheduleTime: {
    fontSize: fontScale(13),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  rainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  rainText: {
    fontSize: fontScale(12),
    color: Colors.blue400,
    fontFamily: Fonts.MEDIUM,
  },
  bottomSpacer: {
    height: scale(16),
  },
});
