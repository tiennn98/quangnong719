import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Headphones } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  title?: string;
  subtitle?: string;
  onSupportPress?: () => void;
};

const PromotionHeader: React.FC<Props> = ({
  title = 'Khuyến mãi',
  subtitle = 'Ưu đãi dễ hiểu – dễ dùng cho bà con',
  onSupportPress,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <View style={styles.textWrap}>
        <CText style={styles.title}>{title}</CText>
        <CText style={styles.subtitle}>{subtitle}</CText>
      </View>

      <Pressable
        onPress={onSupportPress}
        style={({ pressed }) => [
          styles.supportButton,
          pressed && styles.supportButtonPressed,
        ]}
      >
        <Headphones color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
        <CText style={styles.supportText}>Hỗ trợ</CText>
      </Pressable>
    </View>
  );
};

export default memo(PromotionHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
  },
  textWrap: {
    flex: 1,
    paddingRight: scale(12),
  },
  title: {
    fontSize: fontScale(24),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  subtitle: {
    marginTop: scale(4),
    fontSize: fontScale(12),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: Colors.gray200,
    backgroundColor: Colors.white,
  },
  supportButtonPressed: {
    opacity: 0.85,
  },
  supportText: {
    fontSize: fontScale(12),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
