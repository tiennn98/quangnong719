import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { PromotionListItemData } from '../types';

type Props = {
  item: PromotionListItemData;
  onPress?: (item: PromotionListItemData) => void;
};

const BADGE_STYLES = {
  green: {
    bg: '#EAF6EE',
    text: Colors.greenPrimary,
  },
  darkGreen: {
    bg: '#DDF3E4',
    text: Colors.h1,
  },
  blue: {
    bg: '#EAF3FB',
    text: Colors.blue400,
  },
} as const;

const PromotionListItem: React.FC<Props> = ({ item, onPress }) => {
  const badgeStyle = BADGE_STYLES[item.badgeTone];
  const highlightColor =
    item.highlightTone === 'blue' ? Colors.blue400 : Colors.greenPrimary;

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        {item.discountBadge ? (
          <View style={styles.discountBadge}>
            <CText style={styles.discountText}>{item.discountBadge}</CText>
          </View>
        ) : null}
      </View>

      <View style={styles.content}>
        <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
          <CText style={[styles.badgeText, { color: badgeStyle.text }]}>
            {item.badge}
          </CText>
        </View>

        <CText style={styles.title}>{item.title}</CText>
        <CText style={styles.description}>{item.description}</CText>

        <View
          style={[
            styles.highlightWrap,
            item.highlightTone === 'blue'
              ? styles.highlightBlue
              : styles.highlightGreen,
          ]}
        >
          <CText style={[styles.highlight, { color: highlightColor }]}>
            {item.highlight}
          </CText>
        </View>
      </View>

      <View style={styles.actionWrap}>
        <View style={styles.actionButton}>
          <ChevronRight color={Colors.greenPrimary} size={18} />
        </View>
      </View>
    </Pressable>
  );
};

export default memo(PromotionListItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    marginBottom: scale(12),
  },
  cardPressed: {
    opacity: 0.92,
  },
  imageWrap: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(12),
    backgroundColor: '#F5F7F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
    overflow: 'hidden',
  },
  image: {
    width: scale(56),
    height: scale(56),
  },
  discountBadge: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: Colors.yellow,
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
  },
  discountText: {
    fontSize: fontScale(9),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
    marginBottom: scale(6),
  },
  badgeText: {
    fontSize: fontScale(9),
    fontFamily: Fonts.BOLD,
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: scale(4),
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
  highlightWrap: {
    alignSelf: 'flex-start',
    marginTop: scale(8),
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
  highlightGreen: {
    backgroundColor: '#EAF6EE',
  },
  highlightBlue: {
    backgroundColor: '#EAF3FB',
  },
  highlight: {
    fontSize: fontScale(11),
    fontFamily: Fonts.SEMIBOLD,
  },
  actionWrap: {
    marginLeft: scale(6),
    alignSelf: 'center',
  },
  actionButton: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    borderWidth: 1,
    borderColor: '#CFE7D8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
});
