import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  step?: number;
  totalSteps?: number;
};

const VoucherDetailHeader: React.FC<Props> = ({
  step = 4,
  totalSteps = 10,
}) => {
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

      <CText style={styles.title}>Chi tiết voucher</CText>

      <View style={styles.stepBadge}>
        <CText style={styles.stepText}>
          Bước {step}/{totalSteps}
        </CText>
      </View>
    </View>
  );
};

export default memo(VoucherDetailHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
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
  title: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  stepBadge: {
    backgroundColor: '#FFF3E0',
    borderRadius: scale(12),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  stepText: {
    fontSize: fontScale(10),
    color: '#D97706',
    fontFamily: Fonts.BOLD,
  },
});
