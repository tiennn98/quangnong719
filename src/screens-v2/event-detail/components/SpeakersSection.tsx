import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { UserRound } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { EventSpeaker } from '../types';
import DetailSectionCard from './DetailSectionCard';

type Props = {
  speakers: EventSpeaker[];
  onPress?: () => void;
};

const SpeakersSection: React.FC<Props> = ({ speakers, onPress }) => (
  <DetailSectionCard
    icon={<UserRound color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
    title="Diễn giả"
    onPress={onPress}
  >
    <View style={styles.row}>
      {speakers.map(speaker => (
        <View key={speaker.id} style={styles.speakerItem}>
          <View style={styles.avatar} />
          <CText style={styles.name} numberOfLines={1}>
            {speaker.name}
          </CText>
          <CText style={styles.role} numberOfLines={2}>
            {speaker.title}
          </CText>
        </View>
      ))}
    </View>
  </DetailSectionCard>
);

export default memo(SpeakersSection);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: scale(10),
  },
  speakerItem: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'red',
    marginBottom: scale(6),
  },
  name: {
    fontSize: fontScale(9),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  role: {
    marginTop: scale(2),
    fontSize: fontScale(8),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
    lineHeight: fontScale(11),
  },
});
