import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  ChevronDown,
  FlaskConical,
  Leaf,
  ShoppingBag,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { VoucherProductChip } from '../types';
import SectionCard from './SectionCard';

type Props = {
  products: VoucherProductChip[];
  onSeeMore?: () => void;
};

const CHIP_ICONS = {
  leaf: Leaf,
  bottle: FlaskConical,
} as const;

const ProductsSection: React.FC<Props> = ({ products, onSeeMore }) => (
  <SectionCard
    icon={<ShoppingBag color={Colors.white} size={18} strokeWidth={2.2} />}
    title="Sản phẩm áp dụng"
  >
    <View style={styles.chipsRow}>
      {products.map(product => {
        const Icon = CHIP_ICONS[product.icon];
        return (
          <View key={product.id} style={styles.chip}>
            <Icon color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
            <CText style={styles.chipText}>{product.label}</CText>
          </View>
        );
      })}

      <Pressable
        onPress={onSeeMore}
        style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
      >
        <CText style={styles.chipText}>Xem thêm</CText>
        <ChevronDown color={Colors.greenPrimary} size={12} strokeWidth={2.2} />
      </Pressable>
    </View>
  </SectionCard>
);

export default memo(ProductsSection);

const styles = StyleSheet.create({
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#CFE7D8',
    backgroundColor: '#F5FBF7',
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
  },
  pressed: {
    opacity: 0.85,
  },
  chipText: {
    fontSize: fontScale(10),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
});
