import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  CalendarDays,
  ChevronRight,
  ShoppingBag,
  Ticket,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { UsageInfoItemData } from '../types';

type Props = {
  item: UsageInfoItemData;
  isLast?: boolean;
  onPress?: (item: UsageInfoItemData) => void;
};

const ICON_MAP = {
  shopping: ShoppingBag,
  calendar: CalendarDays,
  voucher: Ticket,
} as const;

const UsageInfoItem: React.FC<Props> = ({ item, isLast, onPress }) => {
  const Icon = ICON_MAP[item.icon];

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconWrap}>
        <Icon color={Colors.greenPrimary} size={18} strokeWidth={2.2} />
      </View>

      <View style={styles.content}>
        <CText style={styles.title}>{item.title}</CText>
        <CText style={styles.subtitle}>{item.subtitle}</CText>
      </View>

      <ChevronRight color={Colors.gray300} size={18} strokeWidth={2.2} />
    </Pressable>
  );
};

export default memo(UsageInfoItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    paddingHorizontal: scale(12),
    gap: scale(10),
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  pressed: {
    opacity: 0.9,
  },
  iconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontScale(13),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  subtitle: {
    marginTop: scale(3),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(15),
  },
});
