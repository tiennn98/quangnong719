import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, TicketPercent } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  activeCount?: number;
};

const MyVoucherHeader: React.FC<Props> = ({ activeCount = 0 }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <View style={styles.leftSection}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={10}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <ArrowLeft color={Colors.h1} size={20} strokeWidth={2.2} />
        </Pressable>

        <View style={styles.titleWrap}>
          <CText style={styles.title}>Voucher của tôi</CText>
          <CText style={styles.subtitle}>Quản lý mã ưu đãi của bạn</CText>
        </View>
      </View>

      <View style={styles.badge}>
        <TicketPercent color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
        <CText style={styles.badgeText}>{activeCount} mã đang hoạt động</CText>
      </View>
    </View>
  );
};

export default memo(MyVoucherHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
    gap: scale(8),
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    minWidth: 0,
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(2),
  },
  pressed: {
    opacity: 0.85,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontScale(20),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  subtitle: {
    marginTop: scale(2),
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
    marginTop: scale(4),
    flexShrink: 0,
  },
  badgeText: {
    fontSize: fontScale(9),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
