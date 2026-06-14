import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Check } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

const SuccessHero: React.FC = () => (
  <View style={styles.wrapper}>
    <View style={styles.illustrationArea}>
      <View style={styles.giftPlaceholder} />
      <View style={styles.checkCircle}>
        <Check color={Colors.greenPrimary} size={36} strokeWidth={3} />
      </View>
    </View>

    <CText style={styles.title}>Đổi quà thành công!</CText>
    <CText style={styles.subtitle}>
      Cảm ơn bạn đã đồng hành cùng Quang Nông 719
    </CText>
  </View>
);

export default memo(SuccessHero);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(16),
  },
  illustrationArea: {
    width: scale(180),
    height: scale(160),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(12),
    position: 'relative',
  },
  giftPlaceholder: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    backgroundColor: 'red',
  },
  checkCircle: {
    position: 'absolute',
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: fontScale(22),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: scale(6),
    fontSize: fontScale(12),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
});
