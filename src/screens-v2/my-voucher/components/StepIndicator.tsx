import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Flag } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  step?: number;
  totalSteps?: number;
  description?: string;
};

const StepIndicator: React.FC<Props> = ({
  step = 3,
  totalSteps = 10,
  description = 'Chọn ưu đãi phù hợp cho mùa vụ',
}) => (
  <View style={styles.wrapper}>
    <View style={styles.badge}>
      <Flag color="#D97706" size={12} fill="#FFF3E0" strokeWidth={2.2} />
      <CText style={styles.badgeText}>
        Bước {step}/{totalSteps}
      </CText>
    </View>
    <CText style={styles.description}>{description}</CText>
  </View>
);

export default memo(StepIndicator);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: scale(16),
    marginTop: scale(4),
    marginBottom: scale(12),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: '#FFF3E0',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
  badgeText: {
    fontSize: fontScale(10),
    color: '#D97706',
    fontFamily: Fonts.BOLD,
  },
  description: {
    marginTop: scale(8),
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    backgroundColor: Colors.gray100,
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    overflow: 'hidden',
  },
});
