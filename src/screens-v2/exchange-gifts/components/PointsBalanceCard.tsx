import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Diamond } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  points?: number;
};

const PointsBalanceCard: React.FC<Props> = ({ points = 0 }) => (
  <View style={styles.wrapper}>
    <LinearGradient
      colors={['#1F8A5B', '#19673A', '#145A32']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <View style={styles.diamondIconWrap}>
          <Diamond color={Colors.blue400} size={22} fill="#E8F4FC" />
        </View>

        <View style={styles.info}>
          <CText style={styles.label}>Bạn có</CText>
          <CText style={styles.points}>
            {points}
            <CText style={styles.pointsUnit}> điểm</CText>
          </CText>
          <CText style={styles.hint}>
            Đổi quà thiết thực cho mùa vụ bội thu
          </CText>
        </View>
      </View>
    </LinearGradient>
  </View>
);

export default memo(PointsBalanceCard);

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
  },
  card: {
    borderRadius: scale(16),
    padding: scale(14),
    minHeight: scale(110),
    overflow: 'hidden',
  },
  stepBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    marginBottom: scale(10),
  },
  stepText: {
    fontSize: fontScale(10),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  diamondIconWrap: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: fontScale(11),
    color: 'rgba(255,255,255,0.9)',
    fontFamily: Fonts.MEDIUM,
  },
  points: {
    fontSize: fontScale(28),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
    lineHeight: fontScale(34),
  },
  pointsUnit: {
    fontSize: fontScale(16),
    fontFamily: Fonts.SEMIBOLD,
  },
  hint: {
    marginTop: scale(2),
    fontSize: fontScale(10),
    color: 'rgba(255,255,255,0.85)',
    fontFamily: Fonts.MEDIUM,
  },
  decorPlaceholder: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    backgroundColor: 'red',
    flexShrink: 0,
  },
});
