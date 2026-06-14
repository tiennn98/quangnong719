import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  step?: number;
  totalSteps?: number;
  onSharePress?: () => void;
};

const EventDetailHeader: React.FC<Props> = ({
  step = 4,
  totalSteps = 10,
  onSharePress,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + scale(8) }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={10}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
      >
        <ArrowLeft color={Colors.h1} size={20} strokeWidth={2.2} />
      </Pressable>

      <View style={styles.center}>
        <CText style={styles.title}>Chi tiết sự kiện</CText>
        <View style={styles.stepBadge}>
          <CText style={styles.stepText}>
            Bước {step}/{totalSteps}
          </CText>
        </View>
      </View>

      <Pressable
        onPress={onSharePress}
        hitSlop={10}
        style={({ pressed }) => [styles.sideButton, pressed && styles.pressed]}
      >
        <Share2 color={Colors.h1} size={20} strokeWidth={2.2} />
      </Pressable>
    </View>
  );
};

export default memo(EventDetailHeader);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
    backgroundColor: '#F5F7F6',
  },
  sideButton: {
    width: scale(36),
    height: scale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(16),
    color: Colors.text,
    fontFamily: Fonts.BOLD,
    textAlign: 'center',
  },
  stepBadge: {
    marginTop: scale(4),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
  },
  stepText: {
    fontSize: fontScale(10),
    color: Colors.greenPrimary,
    fontFamily: Fonts.BOLD,
  },
});
