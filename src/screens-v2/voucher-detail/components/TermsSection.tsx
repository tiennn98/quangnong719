import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Check, Info, Percent } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherCondition } from '../types';
import SectionCard from './SectionCard';

type Props = {
  conditions: VoucherCondition[];
};

const TermsSection: React.FC<Props> = ({ conditions }) => (
  <SectionCard
    icon={<Percent color={Colors.white} size={18} strokeWidth={2.2} />}
    title="Điều kiện áp dụng"
  >
    {conditions.map(condition => (
      <View key={condition.id} style={styles.row}>
        {condition.type === 'check' ? (
          <Check color={Colors.greenPrimary} size={14} strokeWidth={2.5} />
        ) : (
          <Info color={Colors.gray500} size={14} strokeWidth={2.2} />
        )}
        <CText style={styles.text}>{condition.text}</CText>
      </View>
    ))}
  </SectionCard>
);

export default memo(TermsSection);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    marginBottom: scale(8),
  },
  text: {
    flex: 1,
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
});
