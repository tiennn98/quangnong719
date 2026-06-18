import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Headphones } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onSupportPress?: () => void;
};

const GiftDetailHeader: React.FC<Props> = ({ onSupportPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <ArrowLeft color={Colors.h1} size={20} strokeWidth={2.2} />
      </Pressable>

      <View style={styles.titleWrap}>
        <CText style={styles.title}>Chi tiết quà đổi điểm</CText>
      </View>

      <Pressable
        onPress={onSupportPress}
        style={({ pressed }) => [
          styles.supportButton,
          pressed && styles.pressed,
        ]}
      >
        <Headphones color={Colors.greenPrimary} size={14} strokeWidth={2.2} />
        <CText style={styles.supportText}>Hỗ trợ</CText>
      </Pressable>
    </View>
  );
};

export default memo(GiftDetailHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
    gap: scale(8),
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
  },
  pressed: {
    opacity: 0.85,
  },
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(16),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  step: {
    marginTop: scale(2),
    fontSize: fontScale(11),
    color: Colors.h2,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
    flexShrink: 0,
  },
  supportText: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
