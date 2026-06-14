import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Diamond } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  points: number;
};

const RemainingPointsCard: React.FC<Props> = ({ points }) => (
  <View style={styles.card}>
    <View style={styles.iconWrap}>
      <Diamond color={Colors.blue400} size={20} fill="#E8F4FC" />
    </View>

    <View style={styles.content}>
      <CText style={styles.label}>Điểm còn lại</CText>
      <CText style={styles.value}>{points} điểm</CText>
    </View>

    <View style={styles.decorPlaceholder} />
  </View>
);

export default memo(RemainingPointsCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
    gap: scale(12),
    overflow: 'hidden',
    position: 'relative',
  },
  iconWrap: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#EAF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  value: {
    marginTop: scale(2),
    fontSize: fontScale(20),
    color: Colors.blue400,
    fontFamily: Fonts.BOLD,
  },
  decorPlaceholder: {
    position: 'absolute',
    right: scale(-10),
    bottom: scale(-10),
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: 'red',
    opacity: 0.9,
  },
});
