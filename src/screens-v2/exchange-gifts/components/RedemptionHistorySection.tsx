import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { REDEMPTION_HISTORY } from '../data';
import { RedemptionHistoryItem as HistoryItem } from '../types';
import RedemptionHistoryItem from './RedemptionHistoryItem';

type Props = {
  onSeeAll?: () => void;
  onItemPress?: (item: HistoryItem) => void;
};

const RedemptionHistorySection: React.FC<Props> = ({
  onSeeAll,
  onItemPress,
}) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <CText style={styles.title}>Lịch sử đổi quà gần đây</CText>
      <Pressable
        onPress={onSeeAll}
        style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}
      >
        <CText style={styles.seeAllText}>Xem tất cả</CText>
        <ChevronRight color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
      </Pressable>
    </View>

    <View style={styles.card}>
      {REDEMPTION_HISTORY.map((item, index) => (
        <RedemptionHistoryItem
          key={item.id}
          item={item}
          isLast={index === REDEMPTION_HISTORY.length - 1}
          onPress={onItemPress}
        />
      ))}
    </View>
  </View>
);

export default memo(RedemptionHistorySection);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: scale(8),
    paddingHorizontal: scale(16),
    marginBottom: scale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  pressed: {
    opacity: 0.85,
  },
  seeAllText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    overflow: 'hidden',
  },
});
