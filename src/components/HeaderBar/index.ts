import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import CText from '@/components/text';
import { Colors } from '@/themes';
import { StyleSheet } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

const HeaderBar = memo(({ onBack }: { onBack: () => void }) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack}
        hitSlop={10}
        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
      >
        <ArrowLeft size={20} color={Colors.h1} />
      </Pressable>

      <CText style={styles.headerTitle}>Chỉnh sửa hồ sơ</CText>

      <View style={{ width: 40 }} />
    </View>
  );
});

export default HeaderBar;

const styles= StyleSheet.create({
  header: {
    height: scale(54),
    paddingHorizontal: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  backBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontScale(16),
    fontWeight: '900',
    color: Colors.h1,
  },
});