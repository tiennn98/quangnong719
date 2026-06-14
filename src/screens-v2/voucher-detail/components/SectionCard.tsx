import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const SectionCard: React.FC<Props> = ({ icon, title, children }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <View style={styles.iconWrap}>{icon}</View>
      <CText style={styles.title}>{title}</CText>
    </View>
    {children}
  </View>
);

export default memo(SectionCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginBottom: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(12),
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
});
