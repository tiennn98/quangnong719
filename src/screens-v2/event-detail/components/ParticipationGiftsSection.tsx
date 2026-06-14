import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Gift } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import DetailSectionCard from './DetailSectionCard';

type Props = {
  description: string;
  onPress?: () => void;
};

const ParticipationGiftsSection: React.FC<Props> = ({
  description,
  onPress,
}) => (
  <DetailSectionCard
    icon={<Gift color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
    title="Quà tham gia"
    onPress={onPress}
  >
    <View style={styles.row}>
      <CText style={styles.text}>{description}</CText>
      <View style={styles.imagePlaceholder} />
    </View>
  </DetailSectionCard>
);

export default memo(ParticipationGiftsSection);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  text: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(15),
  },
  imagePlaceholder: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: 'red',
    flexShrink: 0,
  },
});
