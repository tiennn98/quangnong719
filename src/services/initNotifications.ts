import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

function logMsg(tag: string, remoteMessage: any) {
  console.log(`[FCM] ${tag}:`, JSON.stringify(remoteMessage, null, 2));
}

export async function setupFcmListeners() {
  const unsubOnMessage = messaging().onMessage(async remoteMessage => {
    logMsg('onMessage (FOREGROUND)', remoteMessage);
    Alert.alert(
      remoteMessage?.notification?.title || 'Thông báo',
      remoteMessage?.notification?.body || '(no body)',
    );
  });

  const unsubOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
    logMsg('onNotificationOpenedApp (OPENED)', remoteMessage);
  });

  const initial = await messaging().getInitialNotification();
  if (initial) {
    logMsg('getInitialNotification (COLD START)', initial);
  }

  const unsubToken = messaging().onTokenRefresh(token => {
    console.log('[FCM] onTokenRefresh:', token);
  });

  return () => {
    unsubOnMessage();
    unsubOnOpened();
    unsubToken();
  };
}
