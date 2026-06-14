import { Images } from '@/assets/images';
import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Search, Settings } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
};

const NotificationHeader: React.FC<Props> = ({
  onSearchPress,
  onSettingsPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <Image
        source={Images.logowhite}
        style={styles.watermark}
        resizeMode="contain"
      />

      <View style={styles.topRow}>
        <View style={styles.brandRow}>
          <View style={styles.logoWrap}>
            <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.titleWrap}>
            <CText style={styles.title}>Thông báo</CText>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={onSearchPress}
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Search color={Colors.h1} size={18} strokeWidth={2.2} />
          </Pressable>
          <Pressable
            onPress={onSettingsPress}
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Settings color={Colors.h1} size={18} strokeWidth={2.2} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default memo(NotificationHeader);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EAF6EE',
    paddingHorizontal: scale(16),
    paddingBottom: scale(24),
  },
  watermark: {
    position: 'absolute',
    right: scale(-20),
    top: scale(-10),
    width: scale(140),
    height: scale(140),
    opacity: 0.12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: scale(8),
  },
  brandRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    minWidth: 0,
  },
  logoWrap: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logo: {
    width: scale(30),
    height: scale(30),
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontScale(24),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-start',
    marginTop: scale(4),
    backgroundColor: Colors.white,
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3),
  },
  stepText: {
    fontSize: fontScale(9),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
  actions: {
    flexDirection: 'row',
    gap: scale(8),
    flexShrink: 0,
  },
  actionButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
  },
});
