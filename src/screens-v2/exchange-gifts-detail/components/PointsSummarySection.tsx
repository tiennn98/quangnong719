import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ArrowRight, Diamond } from 'lucide-react-native';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  currentPoints: number;
  redeemPoints: number;
};

const PointsSummarySection: React.FC<Props> = ({
  currentPoints,
  redeemPoints,
}) => {
  const remainingPoints = useMemo(
    () => Math.max(0, currentPoints - redeemPoints),
    [currentPoints, redeemPoints],
  );

  return (
    <View style={styles.section}>
      <CText style={styles.sectionTitle}>Tổng điểm</CText>

      <View style={styles.summaryBox}>
        <View style={styles.column}>
          <View style={styles.iconRow}>
            <Diamond color={Colors.blue400} size={14} fill="#E8F4FC" />
            <CText style={styles.columnLabel}>Điểm hiện tại</CText>
          </View>
          <CText style={styles.columnValue}>{currentPoints} điểm</CText>
        </View>

        <ArrowRight color={Colors.gray300} size={18} strokeWidth={2.2} />

        <View style={styles.column}>
          <CText style={styles.columnLabel}>Sau khi đổi còn lại</CText>
          <CText style={[styles.columnValue, styles.remainingValue]}>
            {remainingPoints} điểm
          </CText>
        </View>
      </View>
    </View>
  );
};

export default memo(PointsSummarySection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
  },
  sectionTitle: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(10),
  },
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF6EE',
    borderRadius: scale(14),
    padding: scale(14),
    gap: scale(8),
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  columnLabel: {
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  columnValue: {
    marginTop: scale(4),
    fontSize: fontScale(16),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  remainingValue: {
    color: Colors.greenPrimary,
  },
});
