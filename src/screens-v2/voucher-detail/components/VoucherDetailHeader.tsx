import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

const VoucherDetailHeader: React.FC = ({}) => {
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
        <CText style={styles.title}>Chi tiết voucher</CText>
      </View>
      <View />
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
  titleWrap: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
    marginRight: scale(36),
  },
});
