import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  actionLabel: string;
  backgroundColor: string;
  valueColor: string;
  onPress?: () => void;
};

const SummaryStatCard: React.FC<Props> = ({
  icon,
  label,
  value,
  actionLabel,
  backgroundColor,
  valueColor,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.card,
      { backgroundColor },
      pressed && styles.cardPressed,
    ]}
  >
    <View style={styles.iconWrap}>{icon}</View>
    <CText style={styles.label}>{label}</CText>
    <CText style={[styles.value, { color: valueColor }]}>{value}</CText>
    <View style={styles.actionRow}>
      <CText style={[styles.actionText, { color: valueColor }]}>
        {actionLabel}
      </CText>
      <ChevronRight color={valueColor} size={14} />
    </View>
  </Pressable>
);

export default memo(SummaryStatCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: scale(14),
    padding: scale(12),
    minHeight: scale(132),
  },
  cardPressed: {
    opacity: 0.92,
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
  },
  label: {
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
  value: {
    marginTop: scale(4),
    fontSize: fontScale(22),
    fontFamily: Fonts.BOLD,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
  },
  actionText: {
    fontSize: fontScale(11),
    fontFamily: Fonts.SEMIBOLD,
    marginRight: scale(2),
  },
});
