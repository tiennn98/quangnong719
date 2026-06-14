import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ClipboardList, Gift } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onViewHistory?: () => void;
  onContinue?: () => void;
};

const BottomActions: React.FC<Props> = ({ onViewHistory, onContinue }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + scale(12) }]}>
      <Pressable
        onPress={onViewHistory}
        style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
      >
        <ClipboardList color={Colors.white} size={16} strokeWidth={2.2} />
        <CText style={styles.primaryText}>Xem lịch sử đổi quà</CText>
      </Pressable>

      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
      >
        <Gift color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        <CText style={styles.secondaryText}>Tiếp tục đổi quà</CText>
      </Pressable>
    </View>
  );
};

export default memo(BottomActions);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    backgroundColor: '#F5F7F6',
    gap: scale(10),
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(12),
    paddingVertical: scale(14),
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    paddingVertical: scale(14),
  },
  pressed: {
    opacity: 0.88,
  },
  primaryText: {
    fontSize: fontScale(13),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  secondaryText: {
    fontSize: fontScale(13),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
});
