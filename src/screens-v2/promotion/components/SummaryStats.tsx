import { Colors } from '@/themes';
import { Diamond, Percent } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import SummaryStatCard from './SummaryStatCard';

type Props = {
  voucherCount?: number;
  points?: number;
  onVoucherPress?: () => void;
  onPointsPress?: () => void;
};

const SummaryStats: React.FC<Props> = ({
  voucherCount = 0,
  points = 0,
  onVoucherPress,
  onPointsPress,
}) => (
  <View style={styles.row}>
    <SummaryStatCard
      icon={<Percent color={Colors.greenPrimary} size={18} />}
      label="Voucher đang có"
      value={String(voucherCount)}
      actionLabel="Xem và dùng ngay"
      backgroundColor="#EAF6EE"
      valueColor={Colors.greenPrimary}
      onPress={onVoucherPress}
    />
    <SummaryStatCard
      icon={<Diamond color={Colors.blue400} size={18} fill="#E8F4FC" />}
      label="Điểm đổi quà"
      value={`${points} điểm`}
      actionLabel="Đổi quà lấy liền"
      backgroundColor="#EAF3FB"
      valueColor={Colors.blue400}
      onPress={onPointsPress}
    />
  </View>
);

export default memo(SummaryStats);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: scale(10),
    paddingHorizontal: scale(16),
    marginTop: scale(14),
  },
});
