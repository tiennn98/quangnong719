import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { FileText } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import DetailSectionCard from './DetailSectionCard';

type Props = {
  items: string[];
  onPress?: () => void;
};

const MainContentSection: React.FC<Props> = ({ items, onPress }) => (
  <DetailSectionCard
    icon={<FileText color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
    title="Nội dung chính"
    onPress={onPress}
  >
    {items.map((item, index) => (
      <View key={index} style={styles.row}>
        <View style={styles.bullet} />
        <CText style={styles.text}>{item}</CText>
      </View>
    ))}
  </DetailSectionCard>
);

export default memo(MainContentSection);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    marginBottom: scale(6),
  },
  bullet: {
    width: scale(5),
    height: scale(5),
    borderRadius: scale(3),
    backgroundColor: Colors.greenPrimary,
    marginTop: scale(6),
    flexShrink: 0,
  },
  text: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(15),
  },
});
