import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Lightbulb } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

const VoucherTipCard: React.FC = () => (
  <View style={styles.card}>
    <View style={styles.iconWrap}>
      <Lightbulb color={Colors.white} size={16} strokeWidth={2.2} />
    </View>
    <CText style={styles.text}>
      Mẹo: Đừng quên sử dụng voucher trước khi hết hạn để tận dụng ưu đãi tốt
      nhất cho mùa vụ của bạn nhé! 🥳
    </CText>
  </View>
);

export default memo(VoucherTipCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(10),
    marginHorizontal: scale(16),
    marginTop: scale(4),
    marginBottom: scale(16),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(14),
    padding: scale(12),
  },
  iconWrap: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  text: {
    flex: 1,
    fontSize: fontScale(11),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
});
