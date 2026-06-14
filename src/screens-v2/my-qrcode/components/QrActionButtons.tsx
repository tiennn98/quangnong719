import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Download, Share2 } from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';

type Props = {
  onSave?: () => void;
  onShare?: () => void;
};

const QrActionButtons: React.FC<Props> = ({ onSave, onShare }) => (
  <View style={styles.row}>
    <Pressable
      onPress={onSave}
      style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
    >
      <Download color={Colors.greenPrimary} size={16} strokeWidth={2.2} />
      <CText style={styles.outlineText}>Lưu vào máy</CText>
    </Pressable>

    <Pressable
      onPress={onShare}
      style={({ pressed }) => [styles.filledButton, pressed && styles.pressed]}
    >
      <Share2 color={Colors.white} size={16} strokeWidth={2.2} />
      <CText style={styles.filledText}>Chia sẻ mã</CText>
    </Pressable>
  </View>
);

export default memo(QrActionButtons);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: scale(10),
    marginHorizontal: scale(16),
    marginTop: scale(14),
  },
  outlineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Colors.greenPrimary,
    paddingVertical: scale(12),
  },
  filledButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(12),
    paddingVertical: scale(12),
  },
  pressed: {
    opacity: 0.88,
  },
  outlineText: {
    fontSize: fontScale(12),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  filledText: {
    fontSize: fontScale(12),
    color: Colors.white,
    fontFamily: Fonts.SEMIBOLD,
  },
});
