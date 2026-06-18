import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search, Settings } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  showBackButton?: boolean;
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
};

const NotificationHeader: React.FC<Props> = ({
  showBackButton = false,
  onSearchPress,
  onSettingsPress,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  if (showBackButton) {
    return (
      <View style={[styles.stackWrapper, { paddingTop: insets.top + scale(8) }]}>
        <View style={styles.stackLeftSection}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={10}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ArrowLeft color={Colors.h1} size={20} strokeWidth={2.2} />
          </Pressable>

          <View style={styles.titleWrap}>
            <CText style={styles.stackTitle}>Thông báo</CText>
            <CText style={styles.stackSubtitle}>
              Cập nhật mới từ ứng dụng
            </CText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <View style={styles.topRow}>
        <View style={styles.brandRow}>
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
  stackWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
    gap: scale(8),
  },
  stackLeftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(8),
    minWidth: 0,
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(2),
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
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: fontScale(24),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  stackTitle: {
    fontSize: fontScale(20),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  stackSubtitle: {
    marginTop: scale(2),
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
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
