import React, { memo, useCallback, useMemo } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { scale } from 'react-native-utils-scale';
import { GIFT_ITEMS } from '../data';
import { GiftCategoryId, GiftItem, RedemptionHistoryItem } from '../types';
import ExchangeGiftsHeader from './ExchangeGiftsHeader';
import GiftCard from './GiftCard';
import GiftCategoryTabs from './GiftCategoryTabs';
import PointsBalanceCard from './PointsBalanceCard';
import RedemptionHistorySection from './RedemptionHistorySection';

type Props = {
  points: number;
  activeCategory: GiftCategoryId;
  onCategoryChange: (id: GiftCategoryId) => void;
  onSupportPress?: () => void;
  onRedeem?: (item: GiftItem) => void;
  onSeeAllHistory?: () => void;
  onHistoryPress?: (item: RedemptionHistoryItem) => void;
};

const ListHeader = memo(
  ({
    points,
    activeCategory,
    onCategoryChange,
  }: {
    points: number;
    activeCategory: GiftCategoryId;
    onCategoryChange: (id: GiftCategoryId) => void;
  }) => (
    <View>
      <PointsBalanceCard points={points} />
      <GiftCategoryTabs activeId={activeCategory} onChange={onCategoryChange} />
    </View>
  ),
);

const GiftGrid: React.FC<Props> = ({
  points,
  activeCategory,
  onCategoryChange,
  onSupportPress,
  onRedeem,
  onSeeAllHistory,
  onHistoryPress,
}) => {
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return GIFT_ITEMS;
    }
    return GIFT_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const renderItem: ListRenderItem<GiftItem> = useCallback(
    ({ item }) => <GiftCard item={item} onRedeem={onRedeem} />,
    [onRedeem],
  );

  const keyExtractor = useCallback((item: GiftItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => (
      <ListHeader
        points={points}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
    ),
    [points, activeCategory, onCategoryChange],
  );

  const ListFooterComponent = useCallback(
    () => (
      <RedemptionHistorySection
        onSeeAll={onSeeAllHistory}
        onItemPress={onHistoryPress}
      />
    ),
    [onSeeAllHistory, onHistoryPress],
  );

  return (
    <View style={styles.wrapper}>
      <ExchangeGiftsHeader onSupportPress={onSupportPress} />

      <FlatList
        data={filteredItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </View>
  );
};

export default memo(GiftGrid);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: scale(8),
  },
  column: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
});
