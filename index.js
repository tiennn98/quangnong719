/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

try {
  const messaging = require('@react-native-firebase/messaging').default;
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[NOTIF] BACKGROUND - message received (FCM):', remoteMessage);
  });
} catch (error) {
  console.warn('[FCM] setBackgroundMessageHandler failed:', error);
}
