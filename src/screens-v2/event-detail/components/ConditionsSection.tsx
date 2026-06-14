import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ShieldCheck } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import DetailSectionCard from './DetailSectionCard';

type Props = {
  description: string;
  onPress?: () => void;
};

const ConditionsSection: React.FC<Props> = ({ description, onPress }) => (
  <DetailSectionCard
    icon={<ShieldCheck color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
    title="Điều kiện tham gia"
    onPress={onPress}
  >
    <CText style={styles.text}>{description}</CText>
  </DetailSectionCard>
);

export default memo(ConditionsSection);

const styles = StyleSheet.create({
  text: {
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(15),
  },
});
