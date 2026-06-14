import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  ChevronRight,
  Clock3,
  Leaf,
  ShoppingBag,
  Star,
  UserRound,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherDescriptionIcon, VoucherItem } from '../types';

type Props = {
  item: VoucherItem;
  onPress?: (item: VoucherItem) => void;
  onActionPress?: (item: VoucherItem) => void;
};

const BADGE_STYLES = {
  green: { bg: '#EAF6EE', text: Colors.greenPrimary },
  blue: { bg: '#EAF3FB', text: Colors.blue400 },
} as const;

const DESCRIPTION_ICONS: Record<
  VoucherDescriptionIcon,
  typeof ShoppingBag
> = {
  bag: ShoppingBag,
  leaf: Leaf,
  user: UserRound,
};

const VoucherCard: React.FC<Props> = ({ item, onPress, onActionPress }) => {
  const badgeStyle = BADGE_STYLES[item.badgeTone];
  const DescIcon = DESCRIPTION_ICONS[item.descriptionIcon];

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imagePlaceholder} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
            <CText style={[styles.badgeText, { color: badgeStyle.text }]}>
              {item.badge}
            </CText>
          </View>
          <ChevronRight color={Colors.gray300} size={18} strokeWidth={2.2} />
        </View>

        <CText style={styles.title} numberOfLines={2}>
          {item.title}
        </CText>

        {item.expiryLabel ? (
          <View style={styles.expiryRow}>
            <Clock3 color="#D97706" size={12} strokeWidth={2.2} />
            <CText style={styles.expiryText}>{item.expiryLabel}</CText>
          </View>
        ) : null}

        {item.specialLabel ? (
          <View style={styles.specialBadge}>
            <Star color={Colors.white} size={10} fill={Colors.white} />
            <CText style={styles.specialText}>{item.specialLabel}</CText>
          </View>
        ) : null}

        <View style={styles.descriptionRow}>
          <DescIcon color={Colors.gray500} size={12} strokeWidth={2.2} />
          <CText style={styles.description} numberOfLines={2}>
            {item.description}
          </CText>
        </View>

        <Pressable
          onPress={() => onActionPress?.(item)}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionPressed,
          ]}
        >
          <CText style={styles.actionText}>{item.actionLabel}</CText>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default memo(VoucherCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    marginBottom: scale(12),
    marginHorizontal: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
  },
  imagePlaceholder: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: 'red',
    marginRight: scale(10),
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scale(6),
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: scale(6),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  badgeText: {
    fontSize: fontScale(9),
    fontFamily: Fonts.BOLD,
  },
  title: {
    fontSize: fontScale(13),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(18),
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(6),
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  expiryText: {
    fontSize: fontScale(10),
    color: '#D97706',
    fontFamily: Fonts.SEMIBOLD,
  },
  specialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-start',
    marginTop: scale(6),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  specialText: {
    fontSize: fontScale(9),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(4),
    marginTop: scale(6),
  },
  description: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
  actionButton: {
    alignSelf: 'flex-end',
    marginTop: scale(8),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
  },
  actionPressed: {
    opacity: 0.85,
  },
  actionText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
