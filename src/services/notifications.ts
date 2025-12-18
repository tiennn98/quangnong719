import notifee, {AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

type Unsubscribe = () => void;

let cachedChannelId: string | null = null;

async function getAndroidChannelId(): Promise<string> {
  if (Platform.OS !== 'android') {return 'default';}

  if (cachedChannelId) {return cachedChannelId;}

  cachedChannelId = await notifee.createChannel({
    id: 'default',
    name: 'Default',
    importance: AndroidImportance.HIGH,
  });

  return cachedChannelId;
}

async function requestAndroidPostNotificationsPermission() {
  if (Platform.OS !== 'android') {return true;}

  const apiLevel = Number(Platform.Version);
  if (apiLevel < 33) {return true;}

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

async function requestIosFcmPermission() {
  if (Platform.OS !== 'ios') {return true;}

  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

export async function displayLocalNotification(opts: {
  title?: string;
  body?: string;
  data?: Record<string, any>;
}) {
  const channelId = await getAndroidChannelId();

  await notifee.displayNotification({
    title: opts.title ?? 'Thông báo',
    body: opts.body ?? '',
    data: opts.data,
    android:
      Platform.OS === 'android'
        ? {
            channelId,
            pressAction: {id: 'default'},
            smallIcon: 'ic_launcher',
          }
        : undefined,
  });
}

async function showFromRemoteMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  await displayLocalNotification({
    title: remoteMessage.notification?.title ?? 'Thông báo',
    body: remoteMessage.notification?.body ?? '',
    data: remoteMessage.data,
  });
}

export async function initPushNotifications(): Promise<{
  fcmToken: string | null;
  cleanup: Unsubscribe;
}> {

  await notifee.requestPermission();

  const allowed =
    Platform.OS === 'android'
      ? await requestAndroidPostNotificationsPermission()
      : await requestIosFcmPermission();

  if (!allowed) {
    console.log('[FCM] permission denied');
    return {fcmToken: null, cleanup: () => {}};
  }


  if (Platform.OS === 'android') {
    await getAndroidChannelId();
  }

  const fcmToken = await messaging().getToken();

  const unsubOnMessage = messaging().onMessage(async msg => {
    console.log('[FCM][FG] received:', JSON.stringify(msg, null, 2));
    await showFromRemoteMessage(msg);
  });

  const unsubToken = messaging().onTokenRefresh(token => {
    console.log('[FCM] token refreshed:', token.slice(-12));
  });

  const unsubOpened = messaging().onNotificationOpenedApp(msg => {
    console.log('[FCM] opened from background:', JSON.stringify(msg, null, 2));
  });

  messaging()
    .getInitialNotification()
    .then(msg => {
      if (msg) {console.log('[FCM] opened from quit:', JSON.stringify(msg, null, 2));}
    })
    .catch(() => {});

  return {
    fcmToken,
    cleanup: () => {
      unsubOnMessage();
      unsubToken();
      unsubOpened();
    },
  };
}
