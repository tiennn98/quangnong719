import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  BarChart3,
  MessageCircle,
  Shield,
  Sprout,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { EventFeature, EventFeatureIcon } from '../types';

type Props = {
  intro: string;
  features: EventFeature[];
};

const FEATURE_ICONS: Record<EventFeatureIcon, typeof Sprout> = {
  sprout: Sprout,
  shield: Shield,
  chart: BarChart3,
  message: MessageCircle,
};

const EventIntroSection: React.FC<Props> = ({ intro, features }) => (
  <View style={styles.section}>
    <CText style={styles.intro}>{intro}</CText>

    <View style={styles.grid}>
      {features.map(feature => {
        const Icon = FEATURE_ICONS[feature.icon];
        return (
          <View key={feature.id} style={styles.featureItem}>
            <View style={styles.iconWrap}>
              <Icon color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
            </View>
            <CText style={styles.featureLabel}>{feature.label}</CText>
          </View>
        );
      })}
    </View>
  </View>
);

export default memo(EventIntroSection);

const styles = StyleSheet.create({
  section: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
  },
  intro: {
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginTop: scale(12),
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(10),
  },
  iconWrap: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureLabel: {
    flex: 1,
    fontSize: fontScale(9),
    color: Colors.h1,
    fontFamily: Fonts.SEMIBOLD,
    lineHeight: fontScale(13),
  },
});
