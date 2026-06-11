import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { CATEGORY_ICONS, PROMOTION_CATEGORIES } from '../data';
import { PromotionCategoryId } from '../types';

type Props = {
  activeId: PromotionCategoryId;
  onChange: (id: PromotionCategoryId) => void;
};

const CategoryTabs: React.FC<Props> = ({ activeId, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.content}
  >
    {PROMOTION_CATEGORIES.map(category => {
      const active = category.id === activeId;
      const Icon = CATEGORY_ICONS[category.id];

      return (
        <Pressable
          key={category.id}
          onPress={() => onChange(category.id)}
          style={({ pressed }) => [
            styles.tab,
            active ? styles.tabActive : styles.tabInactive,
            pressed && styles.tabPressed,
          ]}
        >
          {Icon ? (
            <Icon
              color={active ? Colors.white : Colors.greenPrimary}
              size={14}
            />
          ) : null}
          <CText style={[styles.tabLabel, active && styles.tabLabelActive]}>
            {category.label}
          </CText>
        </Pressable>
      );
    })}
  </ScrollView>
);

export default memo(CategoryTabs);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
    gap: scale(8),
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
  tabPressed: {
    opacity: 0.88,
  },
  tabLabel: {
    fontSize: fontScale(12),
    color: Colors.greenPrimary,
    fontFamily: Fonts.SEMIBOLD,
  },
  tabLabelActive: {
    color: Colors.white,
  },
});
