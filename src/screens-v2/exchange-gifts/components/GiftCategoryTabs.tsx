import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import {
  Gift,
  HardHat,
  House,
  LayoutGrid,
  ShoppingBag,
} from 'lucide-react-native';
import React, { memo } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { GIFT_CATEGORIES } from '../data';
import { GiftCategoryId } from '../types';

const CATEGORY_ICONS: Record<GiftCategoryId, typeof LayoutGrid> = {
  all: LayoutGrid,
  small: Gift,
  supplies: ShoppingBag,
  household: House,
  raincoat: HardHat,
};

type Props = {
  activeId: GiftCategoryId;
  onChange: (id: GiftCategoryId) => void;
};

const GiftCategoryTabs: React.FC<Props> = ({ activeId, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.content}
  >
    {GIFT_CATEGORIES.map(category => {
      const active = category.id === activeId;
      const Icon = CATEGORY_ICONS[category.id];

      return (
        <Pressable
          key={category.id}
          onPress={() => onChange(category.id)}
          style={({ pressed }) => [
            styles.tab,
            active ? styles.tabActive : styles.tabInactive,
            pressed && styles.pressed,
          ]}
        >
          <Icon
            color={active ? Colors.white : Colors.greenPrimary}
            size={14}
            strokeWidth={2.2}
          />
          <CText style={[styles.tabLabel, active && styles.tabLabelActive]}>
            {category.label}
          </CText>
        </Pressable>
      );
    })}
  </ScrollView>
);

export default memo(GiftCategoryTabs);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginRight: scale(8),
  },
  tabActive: {
    backgroundColor: Colors.greenPrimary,
  },
  tabInactive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#CFE7D8',
  },
  pressed: {
    opacity: 0.88,
  },
  tabLabel: {
    fontSize: fontScale(11),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  tabLabelActive: {
    color: Colors.white,
  },
});
