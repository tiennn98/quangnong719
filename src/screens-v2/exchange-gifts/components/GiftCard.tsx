import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Diamond } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale, width } from 'react-native-utils-scale';
import { GiftItem } from '../types';
import { Images } from '@/assets';

type Props = {
  item: GiftItem;
  onRedeem?: (item: GiftItem) => void;
};

const CARD_WIDTH = (width - scale(16) * 2 - scale(10)) / 2;

const GiftCard: React.FC<Props> = ({ item, onRedeem }) => (
  <View style={styles.card}>
    <Image
      source={Images.mu_qua_tang}
      style={styles.imagePlaceholder}
      resizeMode="cover"
    />

    <CText style={styles.title} numberOfLines={2}>
      {item.title}
    </CText>

    <View style={styles.pointsRow}>
      <Diamond color={Colors.blue400} size={12} fill="#E8F4FC" />
      <CText style={styles.pointsText}>{item.points} điểm</CText>
    </View>

    <Pressable
      onPress={() => onRedeem?.(item)}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <CText style={styles.buttonText}>Đổi ngay</CText>
    </Pressable>
  </View>
);

export default memo(GiftCard);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(10),
    marginBottom: scale(10),
  },
  imagePlaceholder: {
    width: '100%',
    height: scale(90),
    alignSelf: 'center',
    marginBottom: scale(8),
  },
  title: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    minHeight: scale(32),
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(4),
    marginBottom: scale(8),
  },
  pointsText: {
    fontSize: fontScale(11),
    color: Colors.blue400,
    fontFamily: Fonts.SEMIBOLD,
  },
  button: {
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(10),
    paddingVertical: scale(8),
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.88,
  },
  buttonText: {
    fontSize: fontScale(11),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
});
