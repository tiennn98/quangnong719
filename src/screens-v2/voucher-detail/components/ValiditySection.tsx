import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ArrowRight, CalendarDays } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import SectionCard from './SectionCard';

type Props = {
  startDate: string;
  endDate: string;
};

const ValiditySection: React.FC<Props> = ({ startDate, endDate }) => (
  <SectionCard
    icon={<CalendarDays color={Colors.white} size={18} strokeWidth={2.2} />}
    title="Thời gian hiệu lực"
  >
    <View style={styles.row}>
      <View style={styles.column}>
        <CText style={styles.label}>Bắt đầu</CText>
        <CText style={styles.value}>{startDate}</CText>
      </View>

      <ArrowRight color={Colors.gray300} size={18} strokeWidth={2.2} />

      <View style={styles.column}>
        <CText style={styles.label}>Hết hạn</CText>
        <CText style={styles.value}>{endDate}</CText>
      </View>
    </View>
  </SectionCard>
);

export default memo(ValiditySection);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  value: {
    marginTop: scale(4),
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
});
