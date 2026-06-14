import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import { GARDEN_ITEMS } from '../data';
import { GardenItem } from '../types';
import GardenCard from './GardenCard';
import GardenListHeader from './GardenListHeader';
import GardenSummaryStats from './GardenSummaryStats';
import MyGardenHeader from './MyGardenHeader';

type Props = {
  onGardenPress?: (garden: GardenItem) => void;
  onSortPress?: () => void;
};

const ListHeader = memo(({ onSortPress }: { onSortPress?: () => void }) => (
  <View>
    <GardenSummaryStats />
    <GardenListHeader onSortPress={onSortPress} />
  </View>
));

const GardenList: React.FC<Props> = ({ onGardenPress, onSortPress }) => {
  const renderItem: ListRenderItem<GardenItem> = useCallback(
    ({ item }) => <GardenCard garden={item} onPress={onGardenPress} />,
    [onGardenPress],
  );

  const keyExtractor = useCallback((item: GardenItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => <ListHeader onSortPress={onSortPress} />,
    [onSortPress],
  );

  return (
    <View style={styles.wrapper}>
      <MyGardenHeader />

      <FlatList
        data={GARDEN_ITEMS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </View>
  );
};

export default memo(GardenList);

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
});
