import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CalendarDays, ShoppingBag, Sprout, Wallet } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';
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

const CARD_GAP = scale(8);
const CARD_WIDTH = (width - scale(32) - CARD_GAP * 3) / 4;

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
            <CText
              style={[styles.value, { color: tone.text }]}
              numberOfLines={1}
            >
              {item.value}
            </CText>
            <CText style={styles.subtext} numberOfLines={2}>
              {item.subtext}
            </CText>
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
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: scale(12),
    paddingVertical: scale(10),
    paddingHorizontal: scale(4),
    alignItems: 'center',
  },
  value: {
    marginTop: scale(6),
    fontSize: fontScale(13),
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  subtext: {
    marginTop: scale(2),
    fontSize: fontScale(8),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
});
