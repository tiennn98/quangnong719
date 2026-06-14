import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Info } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onInfoPress?: () => void;
};

const MyGardenHeader: React.FC<Props> = ({ onInfoPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
      >
        <ArrowLeft color={Colors.h1} size={22} strokeWidth={2.2} />
      </Pressable>

      <CText style={styles.title}>Vườn của tôi</CText>

      <Pressable
        onPress={onInfoPress}
        hitSlop={10}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
      >
        <Info color={Colors.greenPrimary} size={22} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
};

export default memo(MyGardenHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
  },
  sideButton: {
    width: scale(32),
    height: scale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    fontSize: fontScale(18),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
});
