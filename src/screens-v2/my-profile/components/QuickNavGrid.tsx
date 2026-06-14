import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Award,
  Leaf,
  QrCode,
  Wallet,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { QuickNavId } from '../types';

const ITEMS: { id: QuickNavId; label: string; icon: typeof QrCode }[] = [
  { id: 'qr', label: 'Mã QR', icon: QrCode },
  { id: 'garden', label: 'Vườn của tôi', icon: Leaf },
  { id: 'debt', label: 'Công nợ', icon: Wallet },
  { id: 'points', label: 'Điểm & hạng', icon: Award },
];

type Props = {
  onPress?: (id: QuickNavId) => void;
};

const QuickNavGrid: React.FC<Props> = ({ onPress }) => (
  <View style={styles.row}>
    {ITEMS.map(item => {
      const Icon = item.icon;
      return (
        <Pressable
          key={item.id}
          onPress={() => onPress?.(item.id)}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          <View style={styles.iconWrap}>
            <Icon color={Colors.greenPrimary} size={20} strokeWidth={2.2} />
          </View>
          <CText style={styles.label}>{item.label}</CText>
        </Pressable>
      );
    })}
  </View>
);

export default memo(QuickNavGrid);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: Colors.gray200,
    paddingVertical: scale(14),
    paddingHorizontal: scale(8),
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: scale(6),
  },
  pressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontScale(9),
    color: Colors.h1,
    fontFamily: Fonts.MEDIUM,
    textAlign: 'center',
  },
});
