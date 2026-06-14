import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Settings } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onSettingsPress?: () => void;
};

const ProfileHeader: React.FC<Props> = ({ onSettingsPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <View style={styles.side} />

      <CText style={styles.title}>Tài khoản</CText>

      <Pressable
        onPress={onSettingsPress}
        hitSlop={10}
        style={({ pressed }) => [styles.side, pressed && styles.pressed]}
      >
        <Settings color={Colors.h1} size={22} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
};

export default memo(ProfileHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
  },
  side: {
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  title: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
});
