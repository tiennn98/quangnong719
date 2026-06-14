import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { CalendarDays, Camera, Plus } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onAddGarden?: () => void;
  onSchedule?: () => void;
  onReport?: () => void;
};

const BottomActions: React.FC<Props> = ({
  onAddGarden,
  onSchedule,
  onReport,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + scale(12) }]}>
      <Pressable
        onPress={onAddGarden}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View style={styles.iconCircle}>
          <Plus color={Colors.greenPrimary} size={14} strokeWidth={2.5} />
        </View>
        <CText style={styles.buttonText}>Thêm vườn</CText>
      </Pressable>

      <Pressable
        onPress={onSchedule}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <CalendarDays color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        <CText style={styles.buttonText}>Lịch chăm sóc</CText>
      </Pressable>

      <Pressable
        onPress={onReport}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Camera color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        <CText style={styles.buttonText}>Gửi ảnh cây bệnh</CText>
      </Pressable>
    </View>
  );
};

export default memo(BottomActions);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: scale(8),
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    backgroundColor: '#F5F7F6',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.gray200,
    paddingVertical: scale(10),
    paddingHorizontal: scale(4),
  },
  pressed: {
    opacity: 0.85,
  },
  iconCircle: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: fontScale(9),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
    textAlign: 'center',
  },
});
