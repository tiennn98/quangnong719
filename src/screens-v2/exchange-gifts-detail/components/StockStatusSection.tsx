import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  remaining: number;
  total: number;
  updatedAt: string;
};

const StockStatusSection: React.FC<Props> = ({
  remaining,
  total,
  updatedAt,
}) => {
  const progress = useMemo(
    () => (total > 0 ? remaining / total : 0),
    [remaining, total],
  );

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <CText style={styles.label}>Số lượng còn lại</CText>
        <CText style={styles.updatedAt}>{updatedAt}</CText>
      </View>

      <CText style={styles.count}>
        <CText style={styles.countHighlight}>{remaining}</CText>
        {' / '}
        {total}
      </CText>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

export default memo(StockStatusSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  label: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  updatedAt: {
    flex: 1,
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'right',
  },
  count: {
    marginTop: scale(8),
    fontSize: fontScale(18),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
  countHighlight: {
    fontSize: fontScale(22),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
  track: {
    marginTop: scale(10),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.gray100,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: scale(4),
    backgroundColor: Colors.greenPrimary,
  },
});
