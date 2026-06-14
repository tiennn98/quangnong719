import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CalendarDays, Clock3, MapPin } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { EventDetailData } from '../types';

type Props = Pick<
  EventDetailData,
  'title' | 'subtitle' | 'status' | 'date' | 'time' | 'location'
>;

const EventBannerCard: React.FC<Props> = ({
  title,
  subtitle,
  status,
  date,
  time,
  location,
}) => (
  <View style={styles.card}>
    <View style={styles.imageArea}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.statusBadge}>
        <CText style={styles.statusText}>{status}</CText>
      </View>
    </View>

    <View style={styles.content}>
      <CText style={styles.title}>{title}</CText>
      <CText style={styles.subtitle}>{subtitle}</CText>

      <View style={styles.infoRow}>
        <CalendarDays color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
        <CText style={styles.infoText}>{date}</CText>
      </View>
      <View style={styles.infoRow}>
        <Clock3 color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
        <CText style={styles.infoText}>{time}</CText>
      </View>
      <View style={styles.infoRow}>
        <MapPin color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
        <CText style={styles.infoText}>{location}</CText>
      </View>
    </View>
  </View>
);

export default memo(EventBannerCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    overflow: 'hidden',
  },
  imageArea: {
    position: 'relative',
    minHeight: scale(160),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: 'red',
  },
  statusBadge: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
  statusText: {
    fontSize: fontScale(9),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  content: {
    padding: scale(14),
  },
  title: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  subtitle: {
    marginTop: scale(6),
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
    lineHeight: fontScale(16),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(8),
  },
  infoText: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
});
