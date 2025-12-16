import {Platform, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  getAPNSToken,
  requestPermission,
  AuthorizationStatus,
  onTokenRefresh,
  onMessage,
} from '@react-native-firebase/messaging';

const FCM_CACHE_KEY = 'LAST_FCM_TOKEN';

export type FcmInitResult = {
  fcmToken: string | null;
  apnsToken?: string | null;
  changed?: boolean;
};

async function requestAndroidNotificationPermission() {
  if (Platform.OS !== 'android') {
    return true;
  }

  const apiLevel = Number(Platform.Version);
  if (apiLevel < 33) {
    return true;
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export async function initFCM(): Promise<FcmInitResult> {
  try {
    const messaging = getMessaging(getApp());

    let iosAllowed = true;
    if (Platform.OS === 'ios') {
      const status = await requestPermission(messaging);
      iosAllowed =
        status === AuthorizationStatus.AUTHORIZED ||
        status === AuthorizationStatus.PROVISIONAL;
    }

    const androidAllowed = await requestAndroidNotificationPermission();

    if (
      (Platform.OS === 'ios' && !iosAllowed) ||
      (Platform.OS === 'android' && !androidAllowed)
    ) {
      return {fcmToken: null, apnsToken: null, changed: false};
    }

    const fcmToken = await getToken(messaging);

    const last = await AsyncStorage.getItem(FCM_CACHE_KEY);
    const changed = !!fcmToken && last !== fcmToken;
    if (fcmToken && changed) {
      await AsyncStorage.setItem(FCM_CACHE_KEY, fcmToken);
    }

    let apnsToken: string | null = null;
    if (Platform.OS === 'ios') {
      apnsToken = await getAPNSToken(messaging);
    }

    return {fcmToken, apnsToken, changed};
  } catch (e) {
    return {fcmToken: null, apnsToken: null, changed: false};
  }
}

export function subscribeFcmTokenRefresh(onNewToken: (token: string) => void) {
  const messaging = getMessaging(getApp());

  return onTokenRefresh(messaging, async token => {
    await AsyncStorage.setItem(FCM_CACHE_KEY, token);
    onNewToken(token);
  });
}

export function subscribeForegroundMessages(
  onMsg: (remoteMessage: any) => void,
) {
  const messaging = getMessaging(getApp());
  return onMessage(messaging, onMsg);
}
