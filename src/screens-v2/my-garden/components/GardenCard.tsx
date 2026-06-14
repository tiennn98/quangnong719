import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  CalendarDays,
  ChevronRight,
  Heart,
  LandPlot,
  Leaf,
  MapPin,
  Sprout,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { GardenHealthTone, GardenItem, GardenStageTone } from '../types';

type Props = {
  garden: GardenItem;
  onPress?: (garden: GardenItem) => void;
};

const STAGE_STYLES: Record<
  GardenStageTone,
  { bg: string; border: string; text: string }
> = {
  green: { bg: '#EAF6EE', border: '#CFE7D8', text: Colors.greenPrimary },
  yellow: { bg: '#FFF8E6', border: '#F5E6B8', text: '#B8860B' },
  blue: { bg: '#EAF3FB', border: '#C5DFF0', text: Colors.blue400 },
  orange: { bg: '#FFF3E8', border: '#F5D4B8', text: '#D97706' },
};

const HEALTH_STYLES: Record<
  GardenHealthTone,
  { bg: string; border: string; text: string }
> = {
  good: { bg: '#F5FBF7', border: '#CFE7D8', text: Colors.greenPrimary },
  warning: { bg: '#FFF5F5', border: '#F5C4C4', text: Colors.red400 },
};

const GardenCard: React.FC<Props> = ({ garden, onPress }) => {
  const stageStyle = STAGE_STYLES[garden.stageTone];
  const healthStyle = HEALTH_STYLES[garden.healthTone];

  return (
    <Pressable
      onPress={() => onPress?.(garden)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imagePlaceholder} />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <CText style={styles.name} numberOfLines={1}>
            {garden.name}
          </CText>
          <ChevronRight color={Colors.gray500} size={18} strokeWidth={2.2} />
        </View>

        <View style={styles.infoRow}>
          <Leaf color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
          <CText style={styles.variety} numberOfLines={1}>
            {garden.variety}
          </CText>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <LandPlot color={Colors.gray500} size={12} strokeWidth={2.2} />
            <CText style={styles.statText}>{garden.area}</CText>
          </View>
          <View style={[styles.statItem, styles.locationItem]}>
            <MapPin color={Colors.gray500} size={12} strokeWidth={2.2} />
            <CText style={styles.statText} numberOfLines={1}>
              {garden.location}
            </CText>
          </View>
        </View>

        <View style={styles.badgesRow}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: stageStyle.bg,
                borderColor: stageStyle.border,
              },
            ]}
          >
            <Sprout color={stageStyle.text} size={11} strokeWidth={2.2} />
            <CText style={[styles.badgeText, { color: stageStyle.text }]}>
              Giai đoạn: {garden.stage}
            </CText>
          </View>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: healthStyle.bg,
                borderColor: healthStyle.border,
              },
            ]}
          >
            <Heart color={healthStyle.text} size={11} strokeWidth={2.2} />
            <CText style={[styles.badgeText, { color: healthStyle.text }]}>
              Sức khỏe: {garden.health}
            </CText>
          </View>
        </View>

        <View style={styles.taskBanner}>
          <CalendarDays
            color={Colors.greenPrimary}
            size={13}
            strokeWidth={2.2}
          />
          <CText style={styles.taskText} numberOfLines={1}>
            Việc sắp tới:{' '}
            <CText style={styles.taskDate}>{garden.upcomingTaskDate}</CText>
            {' – '}
            {garden.upcomingTaskName}
          </CText>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(GardenCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(12),
    marginBottom: scale(12),
    marginHorizontal: scale(16),
  },
  cardPressed: {
    opacity: 0.92,
  },
  imagePlaceholder: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    backgroundColor: 'red',
    marginRight: scale(10),
    flexShrink: 0,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(4),
  },
  name: {
    flex: 1,
    fontSize: fontScale(14),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(4),
  },
  variety: {
    flex: 1,
    fontSize: fontScale(11),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(6),
    gap: scale(8),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
    flexShrink: 0,
  },
  locationItem: {
    flex: 1,
    minWidth: 0,
  },
  statText: {
    fontSize: fontScale(10),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(6),
    marginTop: scale(8),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(8),
    borderWidth: 1,
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
  },
  badgeText: {
    fontSize: fontScale(9),
    fontFamily: Fonts.SEMIBOLD,
  },
  taskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: scale(8),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
  },
  taskText: {
    flex: 1,
    fontSize: fontScale(10),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
  taskDate: {
    fontSize: fontScale(10),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
});
