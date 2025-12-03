import { Notifications } from 'react-native-notifications';

if (__DEV__) {
  require('./src/services/reactotron-config');
}

import React, { useEffect } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalLoading, { globalLoadingRef } from '@/components/global-loading';
import Navigators from '@/navigators';
import { persistor, store } from '@/redux/store';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/react-query-client';

// disable font scaling
if (Text.defaultProps == null) { Text.defaultProps = {}; }
if (TextInput.defaultProps == null) { TextInput.defaultProps = {}; }
if (TouchableOpacity.defaultProps == null) { TouchableOpacity.defaultProps = {}; }
if (Pressable.defaultProps == null) { Pressable.defaultProps = {}; }

Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;
TouchableOpacity.defaultProps.allowFontScaling = false;
Pressable.defaultProps.allowFontScaling = false;

const App = () => {
  useEffect(() => {
    Notifications.registerRemoteNotifications();

    Notifications.registerRemoteNotifications();

    Notifications.ios.checkPermissions().then((currentPermissions) => {
      console.log('Badges enabled: ' + !!currentPermissions.badge);
      console.log('Sounds enabled: ' + !!currentPermissions.sound);
      console.log('Alerts enabled: ' + !!currentPermissions.alert);
      console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
      console.log('Critical Alerts enabled: ' + !!currentPermissions.criticalAlert);
      console.log('Provisional enabled: ' + !!currentPermissions.provisional);
      console.log('Provides App Notification Settings enabled: ' + !!currentPermissions.providesAppNotificationSettings);
      console.log('Announcement enabled: ' + !!currentPermissions.announcement);
    });


    Notifications.getInitialNotification()
      .then((notification) => {
        console.log(
          'Initial notification was:',
          notification ? notification.payload : 'N/A',
        );
      })
      .catch((err) =>
        console.error('getInitialNotification() failed', err),
      );
let someLocalNotification = Notifications.postLocalNotification({
    body: 'Chúc quý khách có một mùa vụ bội thu!',
    title: 'Quang Nông 719 xin chào quý khách hàng ',
    sound: 'chime.aiff',
});

Notifications.cancelLocalNotification(someLocalNotification);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalLoading ref={globalLoadingRef} />
            <Navigators />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
