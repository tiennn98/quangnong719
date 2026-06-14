import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Cake,
  ChevronRight,
  Leaf,
  MapPin,
  UserRound,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { FeaturedInfoItem } from '../types';

const ICONS = {
  user: UserRound,
  map: MapPin,
  leaf: Leaf,
  cake: Cake,
} as const;

type Props = {
  items: FeaturedInfoItem[];
  onItemPress?: (item: FeaturedInfoItem) => void;
};

const FeaturedInfoSection: React.FC<Props> = ({ items, onItemPress }) => (
  <View style={styles.section}>
    <CText style={styles.title}>Thông tin nổi bật</CText>

    <View style={styles.card}>
      {items.map((item, index) => {
        const Icon = ICONS[item.icon];
        const isLast = index === items.length - 1;

        return (
          <Pressable
            key={item.id}
            onPress={() => onItemPress?.(item)}
            style={({ pressed }) => [
              styles.row,
              !isLast && styles.rowBorder,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.iconWrap}>
              <Icon color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
            </View>

            <CText style={styles.label}>{item.label}</CText>

            <CText style={styles.value} numberOfLines={1}>
              {item.value}
            </CText>

            <ChevronRight color={Colors.gray300} size={16} strokeWidth={2.2} />
          </Pressable>
        );
      })}
    </View>
  </View>
);

export default memo(FeaturedInfoSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(16),
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
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
  iconWrap: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    width: scale(72),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    flexShrink: 0,
  },
  value: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.text,
    fontFamily: Fonts.SEMIBOLD,
    textAlign: 'right',
  },
});
