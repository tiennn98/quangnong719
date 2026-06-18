import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import { Check } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { Images } from '@/assets';

type Props = {
  inStock?: boolean;
};

const ProductImageCard: React.FC<Props> = ({ inStock = true }) => (
  <View style={styles.card}>
    {inStock ? (
      <View style={styles.stockBadge}>
        <Check color={Colors.white} size={10} strokeWidth={2.5} />
        <CText style={styles.stockText}>Còn hàng</CText>
      </View>
    ) : null}

    <Image
      source={Images.mu_qua_tang}
      style={styles.imagePlaceholder}
      resizeMode="cover"
    />
  </View>
);

export default memo(ProductImageCard);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: scale(16),
    marginTop: scale(4),
    backgroundColor: '#EAF6EE',
    borderRadius: scale(16),
    minHeight: scale(200),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  stockBadge: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: Colors.greenPrimary,
    borderRadius: scale(12),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    zIndex: 1,
  },
  stockText: {
    fontSize: fontScale(9),
    color: Colors.white,
    fontFamily: Fonts.BOLD,
  },
  imagePlaceholder: {
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
    backgroundColor: 'red',
  },
});
