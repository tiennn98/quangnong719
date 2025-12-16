/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

import {displayLocalNotification} from './src/services/notifications';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[FCM] background:', remoteMessage);
  await displayLocalNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    data: remoteMessage?.data,
  });
});

AppRegistry.registerComponent(appName, () => App);
