import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  CalendarDays,
  ShoppingBag,
  Sprout,
  Wallet,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { OverviewStat } from '../types';

type Props = {
  items: OverviewStat[];
};

const ICONS = {
  bag: ShoppingBag,
  wallet: Wallet,
  tree: Sprout,
  calendar: CalendarDays,
} as const;

const TONE_STYLES = {
  green: { bg: '#EAF6EE', text: Colors.greenPrimary },
  red: { bg: '#FFF0F0', text: Colors.red400 },
  blue: { bg: '#EAF3FB', text: Colors.blue400 },
} as const;

const OverviewSection: React.FC<Props> = ({ items }) => (
  <View style={styles.section}>
    <CText style={styles.title}>Tổng quan của tôi</CText>

    <View style={styles.grid}>
      {items.map(item => {
        const Icon = ICONS[item.icon];
        const tone = TONE_STYLES[item.tone];

        return (
          <View
            key={item.id}
            style={[styles.card, { backgroundColor: tone.bg }]}
          >
            <Icon color={tone.text} size={16} strokeWidth={2.2} />
            <CText style={[styles.value, { color: tone.text }]}>
              {item.value}
            </CText>
            <CText style={styles.subtext}>{item.subtext}</CText>
          </View>
        );
      })}
    </View>
  </View>
);

export default memo(OverviewSection);

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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  card: {
    width: '48%',
    borderRadius: scale(12),
    padding: scale(12),
    minHeight: scale(88),
  },
  value: {
    marginTop: scale(8),
    fontSize: fontScale(16),
    fontFamily: Fonts.BOLD,
  },
  subtext: {
    marginTop: scale(2),
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
});
