import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import { PromotionListItemData } from '../types';
import PromotionListItem from './PromotionListItem';

type Props = {
  items: PromotionListItemData[];
  onItemPress?: (item: PromotionListItemData) => void;
};

const PromotionList: React.FC<Props> = ({ items, onItemPress }) => (
  <View style={styles.wrapper}>
    {items.map(item => (
      <PromotionListItem key={item.id} item={item} onPress={onItemPress} />
    ))}
  </View>
);

export default memo(PromotionList);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(16),
  },
});
