import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CircleQuestionMark } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherUsageStep } from '../types';
import SectionCard from './SectionCard';

type Props = {
  steps: VoucherUsageStep[];
};

const HowToUseSection: React.FC<Props> = ({ steps }) => (
  <SectionCard
    icon={<CircleQuestionMark color={Colors.white} size={18} strokeWidth={2.2} />}
    title="Cách dùng"
  >
    <View style={styles.stepsRow}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepWrap}>
          {index > 0 ? <View style={styles.connector} /> : null}

          <View style={styles.stepContent}>
            <View style={styles.stepCircle}>
              <CText style={styles.stepNumber}>{step.step}</CText>
            </View>
            <CText style={styles.stepTitle}>{step.title}</CText>
            <CText style={styles.stepDescription}>{step.description}</CText>
          </View>
        </View>
      ))}
    </View>
  </SectionCard>
);

export default memo(HowToUseSection);

const styles = StyleSheet.create({
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    minWidth: 0,
  },
  connector: {
    position: 'absolute',
    left: -scale(8),
    top: scale(14),
    width: scale(16),
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.gray300,
  },
  stepContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(2),
  },
  stepCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumber: {
    fontSize: fontScale(12),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  stepTitle: {
    marginTop: scale(8),
    fontSize: fontScale(10),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  stepDescription: {
    marginTop: scale(4),
    fontSize: fontScale(8),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    lineHeight: fontScale(12),
  },
});
