import { CText } from '@/components';
import { Colors, Fonts } from '@/themes';
import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { fontScale, scale } from 'react-native-utils-scale';
import { NOTIFICATION_ITEMS } from '../data';
import { NotificationItem, NotificationTabId } from '../types';
import NotificationCard from './NotificationCard';
import NotificationFilterTabs from './NotificationFilterTabs';
import NotificationHeader from './NotificationHeader';

type Props = {
  activeTab: NotificationTabId;
  onTabChange: (id: NotificationTabId) => void;
  onSearchPress?: () => void;
  onSettingsPress?: () => void;
  onNotificationPress?: (item: NotificationItem) => void;
};

const ListFooter = memo(() => (
  <CText style={styles.footerText}>Đã tải hết thông báo</CText>
));

const NotificationList: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onSearchPress,
  onSettingsPress,
  onNotificationPress,
}) => {
  const filteredItems = useMemo(() => {
    if (activeTab === 'all') {
      return NOTIFICATION_ITEMS;
    }
    return NOTIFICATION_ITEMS.filter(item => item.tab === activeTab);
  }, [activeTab]);

  const renderItem: ListRenderItem<NotificationItem> = useCallback(
    ({ item }) => (
      <NotificationCard item={item} onPress={onNotificationPress} />
    ),
    [onNotificationPress],
  );

  const keyExtractor = useCallback((item: NotificationItem) => item.id, []);

  const ListFooterComponent = useCallback(() => <ListFooter />, []);

  return (
    <View style={styles.wrapper}>
      <NotificationHeader
        onSearchPress={onSearchPress}
        onSettingsPress={onSettingsPress}
      />

      <NotificationFilterTabs activeId={activeTab} onChange={onTabChange} />

      <FlatList
        data={filteredItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </View>
  );
};

export default memo(NotificationList);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  list: {
    paddingHorizontal: scale(16),
    paddingTop: scale(4),
    paddingBottom: scale(24),
  },
  footerText: {
    textAlign: 'center',
    fontSize: fontScale(11),
    color: Colors.gray500,
    fontFamily: Fonts.MEDIUM,
    marginTop: scale(8),
    marginBottom: scale(8),
  },
});
