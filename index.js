/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import { displayLocalNotification } from './src/services/notifications';
import { handleNotificationClick } from './src/services/initNotifications';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(
    '[NOTIF] BACKGROUND - message received (chưa click):',
    remoteMessage,
  );
  await displayLocalNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    data: remoteMessage?.data,
  });
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    console.log('====================================');
    console.log('[NOTIF] 👉 CLICK khi app đang BACKGROUND (notifee)');
    console.log('====================================');
    console.log(
      '[NOTIF] BACKGROUND CLICK (notifee):',
      JSON.stringify(detail.notification, null, 2),
    );
    await handleNotificationClick(
      'BACKGROUND CLICK (notifee)',
      detail.notification,
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
