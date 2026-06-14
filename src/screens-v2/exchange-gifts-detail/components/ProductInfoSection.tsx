import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Diamond, Droplets, Leaf, Shield } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { GiftFeature } from '../types';

type Props = {
  title: string;
  points: number;
  description: string;
  features: GiftFeature[];
};

const FEATURE_ICONS = {
  shield: Shield,
  droplet: Droplets,
  leaf: Leaf,
} as const;

const ProductInfoSection: React.FC<Props> = ({
  title,
  points,
  description,
  features,
}) => (
  <View style={styles.section}>
    <View style={styles.titleRow}>
      <CText style={styles.title}>{title}</CText>
      <View style={styles.pointsRow}>
        <Diamond color={Colors.blue400} size={14} fill="#E8F4FC" />
        <CText style={styles.points}>{points} điểm</CText>
      </View>
    </View>

    <CText style={styles.description}>{description}</CText>

    <View style={styles.featuresRow}>
      {features.map(feature => {
        const Icon = FEATURE_ICONS[feature.icon];
        return (
          <View key={feature.id} style={styles.featureItem}>
            <View style={styles.featureIconWrap}>
              <Icon color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
            </View>
            <CText style={styles.featureTitle}>{feature.title}</CText>
            <CText style={styles.featureDesc}>{feature.description}</CText>
          </View>
        );
      })}
    </View>
  </View>
);

export default memo(ProductInfoSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(14),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  title: {
    flex: 1,
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    flexShrink: 0,
  },
  points: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: scale(10),
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
  featuresRow: {
    flexDirection: 'row',
    marginTop: scale(14),
    gap: scale(8),
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
  },
  featureIconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(6),
  },
  featureTitle: {
    fontSize: fontScale(9),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  featureDesc: {
    marginTop: scale(2),
    fontSize: fontScale(8),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    lineHeight: fontScale(11),
  },
});
