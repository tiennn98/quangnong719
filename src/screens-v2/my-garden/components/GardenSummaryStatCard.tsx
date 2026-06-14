import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  valueColor?: string;
};

const GardenSummaryStatCard: React.FC<Props> = ({
  icon,
  label,
  value,
  subtext,
  valueColor = Colors.greenPrimary,
}) => (
  <View style={styles.card}>
    <View style={styles.iconWrap}>{icon}</View>
    <CText style={styles.label}>{label}</CText>
    <CText style={[styles.value, { color: valueColor }]}>{value}</CText>
    <CText style={styles.subtext}>{subtext}</CText>
  </View>
);

export default memo(GardenSummaryStatCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(10),
    alignItems: 'center',
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(8),
  },
  label: {
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
  value: {
    marginTop: scale(4),
    fontSize: fontScale(18),
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  subtext: {
    marginTop: scale(2),
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
});
