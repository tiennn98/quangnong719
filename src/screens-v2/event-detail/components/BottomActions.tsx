import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ArrowRight, Bookmark } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onSave?: () => void;
  onRegister?: () => void;
};

const BottomActions: React.FC<Props> = ({ onSave, onRegister }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + scale(12) }]}>
      <Pressable
        onPress={onSave}
        style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
      >
        <Bookmark color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        <CText style={styles.outlineText}>Lưu sự kiện</CText>
      </Pressable>

      <Pressable
        onPress={onRegister}
        style={({ pressed }) => [styles.filledButton, pressed && styles.pressed]}
      >
        <CText style={styles.filledText}>Tiếp tục đăng ký</CText>
        <ArrowRight color={Colors.white} size={16} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
};

export default memo(BottomActions);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: scale(10),
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    backgroundColor: '#F5F7F6',
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  outlineButton: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    paddingVertical: scale(12),
  },
  filledButton: {
    flex: 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(12),
    paddingVertical: scale(12),
  },
  pressed: {
    opacity: 0.88,
  },
  outlineText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  filledText: {
    fontSize: fontScale(11),
    color: Colors.white,
    fontFamily: Fonts.SEMIBOLD,
  },
});
