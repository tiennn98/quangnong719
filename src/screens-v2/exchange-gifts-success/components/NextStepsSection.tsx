import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Box, Store, Truck } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { NextStep } from '../types';

type Props = {
  steps: NextStep[];
};

const STEP_ICONS = {
  store: Store,
  box: Box,
  truck: Truck,
} as const;

const NextStepsSection: React.FC<Props> = ({ steps }) => (
  <View style={styles.card}>
    <CText style={styles.title}>Các bước tiếp theo</CText>

    <View style={styles.content}>
      <View style={styles.stepsColumn}>
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[step.icon];
          const isLast = index === steps.length - 1;

          return (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <View style={styles.iconWrap}>
                  <Icon color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
                </View>
                {!isLast ? <View style={styles.connector} /> : null}
              </View>

              <View style={styles.stepBody}>
                <View style={styles.stepHeader}>
                  <View style={styles.stepNumber}>
                    <CText style={styles.stepNumberText}>{step.step}</CText>
                  </View>
                  <CText style={styles.stepTitle}>{step.title}</CText>
                </View>
                <CText style={styles.stepDesc}>{step.description}</CText>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.illustrationPlaceholder} />
    </View>
  </View>
);

export default memo(NextStepsSection);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    marginBottom: scale(12),
  },
  content: {
    flexDirection: 'row',
    gap: scale(8),
  },
  stepsColumn: {
    flex: 1,
    minWidth: 0,
  },
  stepRow: {
    flexDirection: 'row',
    gap: scale(8),
    marginBottom: scale(4),
  },
  stepLeft: {
    alignItems: 'center',
    width: scale(28),
  },
  iconWrap: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  connector: {
    flex: 1,
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginVertical: scale(4),
    minHeight: scale(20),
  },
  stepBody: {
    flex: 1,
    minWidth: 0,
    paddingBottom: scale(10),
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  stepNumber: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: fontScale(10),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  stepTitle: {
    flex: 1,
    fontSize: fontScale(11),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  stepDesc: {
    marginTop: scale(4),
    marginLeft: scale(26),
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(13),
  },
  illustrationPlaceholder: {
    width: scale(80),
    height: scale(120),
    borderRadius: scale(40),
    backgroundColor: 'red',
    alignSelf: 'center',
    flexShrink: 0,
  },
});
