import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ListFilter } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  sortLabel?: string;
  onSortPress?: () => void;
};

const GardenListHeader: React.FC<Props> = ({
  sortLabel = 'Mới nhất',
  onSortPress,
}) => (
  <View style={styles.wrapper}>
    <CText style={styles.title}>Danh sách vườn</CText>

    <Pressable
      onPress={onSortPress}
      style={({ pressed }) => [styles.sortButton, pressed && styles.pressed]}
    >
      <CText style={styles.sortText}>{sortLabel}</CText>
      <ListFilter color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
    </Pressable>
  </View>
);

export default memo(GardenListHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(18),
    marginBottom: scale(12),
  },
  title: {
    fontSize: fontScale(15),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
  },
  pressed: {
    opacity: 0.85,
  },
  sortText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
