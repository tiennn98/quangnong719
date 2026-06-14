import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Clock3 } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherDetailData } from '../types';

type Props = {
  voucher: Pick<
    VoucherDetailData,
    'badge' | 'title' | 'subtitle' | 'expiryLabel'
  >;
};

const VoucherHeroCard: React.FC<Props> = ({ voucher }) => (
  <View style={styles.card}>
    <Image
      source={Images.logowhite}
      style={styles.watermark}
      resizeMode="contain"
    />
    <View style={styles.overlay} />

    <View style={styles.content}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.info}>
        <View style={styles.badge}>
          <CText style={styles.badgeText}>{voucher.badge}</CText>
        </View>

        <CText style={styles.title}>{voucher.title}</CText>
        <CText style={styles.subtitle}>{voucher.subtitle}</CText>

        <View style={styles.expiryBadge}>
          <Clock3 color="#D97706" size={12} strokeWidth={2.2} />
          <CText style={styles.expiryText}>{voucher.expiryLabel}</CText>
        </View>
      </View>
    </View>
  </View>
);

export default memo(VoucherHeroCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
    borderRadius: scale(16),
    backgroundColor: '#EAF6EE',
    overflow: 'hidden',
    minHeight: scale(140),
  },
  watermark: {
    position: 'absolute',
    right: scale(-10),
    top: scale(-10),
    width: scale(120),
    height: scale(120),
    opacity: 0.15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    gap: scale(12),
  },
  imagePlaceholder: {
    width: scale(88),
    height: scale(88),
    borderRadius: scale(44),
    backgroundColor: 'red',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    marginBottom: scale(6),
  },
  badgeText: {
    fontSize: fontScale(9),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
  title: {
    fontSize: fontScale(15),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(20),
  },
  subtitle: {
    marginTop: scale(4),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
  expiryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-start',
    marginTop: scale(8),
    backgroundColor: '#FFF3E0',
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: '#F5D4A8',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  expiryText: {
    fontSize: fontScale(10),
    color: '#D97706',
    fontFamily: Fonts.SEMIBOLD,
  },
});
