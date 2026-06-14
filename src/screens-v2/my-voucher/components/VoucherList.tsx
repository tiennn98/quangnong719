import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-utils-scale';
import { VOUCHER_ITEMS } from '../data';
import { VoucherItem, VoucherTabId } from '../types';
import MyVoucherHeader from './MyVoucherHeader';
import StepIndicator from './StepIndicator';
import VoucherCard from './VoucherCard';
import VoucherFilterTabs from './VoucherFilterTabs';
import VoucherTipCard from './VoucherTipCard';

type Props = {
  activeCount: number;
  activeTab: VoucherTabId;
  onTabChange: (id: VoucherTabId) => void;
  onVoucherPress?: (item: VoucherItem) => void;
  onActionPress?: (item: VoucherItem) => void;
};

const ListHeader = memo(
  ({
    activeTab,
    onTabChange,
  }: {
    activeTab: VoucherTabId;
    onTabChange: (id: VoucherTabId) => void;
  }) => (
    <View>
      <StepIndicator />
      <VoucherFilterTabs activeId={activeTab} onChange={onTabChange} />
    </View>
  ),
);

const VoucherList: React.FC<Props> = ({
  activeCount,
  activeTab,
  onTabChange,
  onVoucherPress,
  onActionPress,
}) => {
  const filteredItems = useMemo(
    () => VOUCHER_ITEMS.filter(item => item.tab === activeTab),
    [activeTab],
  );

  const renderItem: ListRenderItem<VoucherItem> = useCallback(
    ({ item }) => (
      <VoucherCard
        item={item}
        onPress={onVoucherPress}
        onActionPress={onActionPress}
      />
    ),
    [onVoucherPress, onActionPress],
  );

  const keyExtractor = useCallback((item: VoucherItem) => item.id, []);

  const ListHeaderComponent = useCallback(
    () => <ListHeader activeTab={activeTab} onTabChange={onTabChange} />,
    [activeTab, onTabChange],
  );

  const ListFooterComponent = useCallback(() => <VoucherTipCard />, []);

  return (
    <View style={styles.wrapper}>
      <MyVoucherHeader activeCount={activeCount} />

      <FlatList
        data={filteredItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </View>
  );
};

export default memo(VoucherList);

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
