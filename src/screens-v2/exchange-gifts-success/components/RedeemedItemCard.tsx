import { Images } from '@/assets';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Diamond, Gift } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  title: string;
  points: number;
  description: string;
};

const RedeemedItemCard: React.FC<Props> = ({ title, points, description }) => (
  <View style={styles.card}>
    <Image
      source={Images.mu_qua_tang}
      style={styles.imagePlaceholder}
      resizeMode="cover"
    />

    <View style={styles.content}>
      <View style={styles.badge}>
        <Gift color={Colors.greenPrimary} size={10} strokeWidth={2.2} />
        <CText style={styles.badgeText}>Quà đã đổi</CText>
      </View>

      <CText style={styles.title}>{title}</CText>

      <View style={styles.pointsRow}>
        <Diamond color={Colors.blue400} size={12} fill="#E8F4FC" />
        <CText style={styles.points}>{points} điểm</CText>
      </View>

      <CText style={styles.description}>{description}</CText>
    </View>
  </View>
);

export default memo(RedeemedItemCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    gap: scale(10),
  },
  imagePlaceholder: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: 'red',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-start',
    backgroundColor: '#EAF6EE',
    borderRadius: scale(8),
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
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(4),
  },
  points: {
    fontSize: fontScale(12),
    color: Colors.blue400,
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: scale(4),
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(14),
  },
});
