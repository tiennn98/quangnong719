import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { ChevronRight } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
};

const DetailSectionCard: React.FC<Props> = ({
  icon,
  title,
  children,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.card, pressed && styles.pressed]}
  >
    <View style={styles.header}>
      <View style={styles.iconWrap}>{icon}</View>
      <CText style={styles.title}>{title}</CText>
      <ChevronRight color={Colors.gray300} size={18} strokeWidth={2.2} />
    </View>
    <View style={styles.content}>{children}</View>
  </Pressable>
);

export default memo(DetailSectionCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    padding: scale(14),
  },
  pressed: {
    opacity: 0.92,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    marginBottom: scale(10),
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: fontScale(14),
    color: Colors.h1,
    fontFamily: Fonts.BOLD,
  },
  content: {},
});
