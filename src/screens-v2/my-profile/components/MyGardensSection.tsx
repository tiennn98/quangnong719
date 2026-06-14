import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CalendarDays, ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { ProfileGardenItem } from '../types';

type Props = {
  gardens: ProfileGardenItem[];
  onSeeAll?: () => void;
  onGardenPress?: (garden: ProfileGardenItem) => void;
};

const GardenCard = ({
  garden,
  onPress,
}: {
  garden: ProfileGardenItem;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.gardenCard, pressed && styles.pressed]}
  >
    <View style={styles.thumbnail} />

    <CText style={styles.gardenName}>{garden.name}</CText>
    <CText style={styles.gardenMeta}>
      {garden.area} • {garden.location}
    </CText>

    <View style={styles.cropBadge}>
      <CText style={styles.cropText}>Cây trồng: {garden.crop}</CText>
    </View>

    <View style={styles.taskBanner}>
      <CalendarDays color={Colors.greenPrimary} size={11} strokeWidth={2.2} />
      <CText style={styles.taskText} numberOfLines={1}>
        {garden.nextTask} {garden.nextTaskDate}
      </CText>
    </View>
  </Pressable>
);

const MyGardensSection: React.FC<Props> = ({
  gardens,
  onSeeAll,
  onGardenPress,
}) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <CText style={styles.title}>Vườn của tôi</CText>
      <Pressable
        onPress={onSeeAll}
        style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}
      >
        <CText style={styles.seeAllText}>Xem tất cả</CText>
        <ChevronRight color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
      </Pressable>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {gardens.map(garden => (
        <GardenCard
          key={garden.id}
          garden={garden}
          onPress={() => onGardenPress?.(garden)}
        />
      ))}
    </ScrollView>
  </View>
);

export default memo(MyGardensSection);

const styles = StyleSheet.create({
  section: {
    marginTop: scale(16),
    marginBottom: scale(8),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginBottom: scale(10),
  },
  title: {
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },
  pressed: {
    opacity: 0.85,
  },
  seeAllText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  list: {
    paddingHorizontal: scale(16),
    gap: scale(10),
  },
  gardenCard: {
    width: scale(180),
    backgroundColor: Colors.white,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(10),
  },
  thumbnail: {
    width: '100%',
    height: scale(80),
    borderRadius: scale(10),
    backgroundColor: 'red',
    marginBottom: scale(8),
  },
  gardenName: {
    fontSize: fontScale(12),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
  },
  gardenMeta: {
    marginTop: scale(2),
    fontSize: fontScale(9),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  cropBadge: {
    alignSelf: 'flex-start',
    marginTop: scale(6),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(3),
  },
  cropText: {
    fontSize: fontScale(8),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  taskBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(8),
    backgroundColor: '#F5FBF7',
    borderRadius: scale(8),
    paddingHorizontal: scale(6),
    paddingVertical: scale(5),
  },
  taskText: {
    flex: 1,
    fontSize: fontScale(8),
    color: Colors.gray600,
    fontFamily: Fonts.MEDIUM,
  },
});
