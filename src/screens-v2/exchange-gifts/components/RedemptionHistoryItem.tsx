import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Check, ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { RedemptionHistoryItem as HistoryItem } from '../types';

type Props = {
  item: HistoryItem;
  isLast?: boolean;
  onPress?: (item: HistoryItem) => void;
};

const RedemptionHistoryItem: React.FC<Props> = ({
  item,
  isLast,
  onPress,
}) => (
  <Pressable
    onPress={() => onPress?.(item)}
    style={({ pressed }) => [
      styles.row,
      !isLast && styles.rowBorder,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.thumbnail} />

    <View style={styles.content}>
      <CText style={styles.title} numberOfLines={1}>
        {item.title}
      </CText>
      <CText style={styles.time}>{item.redeemedAt}</CText>

      <View style={styles.statusRow}>
        <CText style={styles.pointsUsed}>-{item.pointsUsed} điểm</CText>
        <View style={styles.statusBadge}>
          <Check color={Colors.greenPrimary} size={10} strokeWidth={2.5} />
          <CText style={styles.statusText}>Thành công</CText>
        </View>
      </View>
    </View>

    <ChevronRight color={Colors.gray300} size={18} strokeWidth={2.2} />
  </Pressable>
);

export default memo(RedemptionHistoryItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    paddingVertical: scale(12),
    paddingHorizontal: scale(12),
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  pressed: {
    opacity: 0.9,
  },
  thumbnail: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'red',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  time: {
    marginTop: scale(2),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    marginTop: scale(6),
    flexWrap: 'wrap',
  },
  pointsUsed: {
    fontSize: fontScale(11),
    color: Colors.red400,
    fontFamily: Fonts.BOLD,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
  },
  statusText: {
    fontSize: fontScale(9),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
