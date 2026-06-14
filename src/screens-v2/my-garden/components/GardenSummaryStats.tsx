import { Colors } from '@/themes';
import { CalendarDays, LandPlot, Sprout, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import { GARDEN_SUMMARY } from '../data';
import GardenSummaryStatCard from './GardenSummaryStatCard';

const GardenSummaryStats: React.FC = () => (
  <View style={styles.row}>
    <GardenSummaryStatCard
      icon={<Sprout color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
      label="Tổng vườn"
      value={String(GARDEN_SUMMARY.totalGardens)}
      subtext="vườn đang quản lý"
    />
    <GardenSummaryStatCard
      icon={<LandPlot color={Colors.greenPrimary} size={18} strokeWidth={2.2} />}
      label="Tổng diện tích"
      value={GARDEN_SUMMARY.totalArea}
      subtext="diện tích canh tác"
    />
    <GardenSummaryStatCard
      icon={
        <View style={styles.calendarIconWrap}>
          <CalendarDays color={Colors.blue400} size={16} strokeWidth={2.2} />
          <View style={styles.starBadge}>
            <Star color={Colors.blue400} size={8} fill={Colors.blue400} />
          </View>
        </View>
      }
      label="Việc sắp tới"
      value={String(GARDEN_SUMMARY.upcomingTasks)}
      subtext="công việc"
      valueColor={Colors.blue400}
    />
  </View>
);

export default memo(GardenSummaryStats);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: scale(8),
    paddingHorizontal: scale(16),
    marginTop: scale(4),
  },
  calendarIconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starBadge: {
    position: 'absolute',
    top: -scale(4),
    right: -scale(6),
  },
});
