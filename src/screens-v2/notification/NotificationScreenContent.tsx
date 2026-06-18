import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import NotificationList from './components/NotificationList';
import { NotificationItem, NotificationTabId } from './types';
import { SCREEN_NAME } from '@/constants/screen-name';
import { navigate } from '@/navigators/navigation-service';

type Props = {
  showBackButton?: boolean;
};

const NotificationScreenContent: React.FC<Props> = ({
  showBackButton = false,
}) => {
  const [activeTab, setActiveTab] = useState<NotificationTabId>('all');

  const handleSearchPress = useCallback(() => {
    console.log('[Notification] search');
  }, []);

  const handleSettingsPress = useCallback(() => {
    console.log('[Notification] settings');
  }, []);

  const handleNotificationPress = useCallback((_item: NotificationItem) => {
    navigate(SCREEN_NAME.EVENT_DETAIL_SCREEN);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={showBackButton ? '#F5F7F6' : '#EAF6EE'}
      />

      <NotificationList
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showBackButton={showBackButton}
        onSearchPress={handleSearchPress}
        onSettingsPress={handleSettingsPress}
        onNotificationPress={handleNotificationPress}
      />
    </View>
  );
};

export default NotificationScreenContent;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7F6',
  },
});
