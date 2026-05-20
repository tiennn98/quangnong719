import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {SCREEN_NAME} from '@/constants/screen-name';
import {navigate, waitForNavigationReady} from '@/navigators/navigation-service';
import {
  getInvoiceDetailById,
  mapInvoiceDetailApiToDTO,
} from './invoice.api';

function logMsg(tag: string, payload: any) {
  console.log(`[NOTIF] ${tag}:`, JSON.stringify(payload, null, 2));
}

export function extractInvoiceId(payload: any): string | undefined {
  const data = payload?.data ?? payload?.notification?.data;
  if (!data) {
    return undefined;
  }
  const rawId = data.id ?? data.invoice_id ?? data.invoiceId;
  return rawId != null ? String(rawId) : undefined;
}

async function navigateToInvoiceDetail(invoiceId: string) {
  try {
    console.log('[NOTIF] → fetching invoice detail, id =', invoiceId);
    const data = await getInvoiceDetailById(invoiceId);
    console.log('[NOTIF] ← invoice detail loaded:', data?.invoice_code);

    const invoice = mapInvoiceDetailApiToDTO(data);

    const ready = await waitForNavigationReady();
    if (!ready) {
      console.log('[NOTIF] navigation not ready, skip navigate');
      return;
    }

    navigate(SCREEN_NAME.INVOICE_DETAIL_SCREEN, {invoice});
    console.log(
      '[NOTIF] → navigated to INVOICE_DETAIL_SCREEN with id =',
      invoice.id,
    );
  } catch (e: any) {
    console.log(
      '[NOTIF] navigateToInvoiceDetail error:',
      e?.message || e,
    );
  }
}

export async function handleNotificationClick(source: string, payload: any) {
  const invoiceId = extractInvoiceId(payload);
  if (!invoiceId) {
    console.log(`[NOTIF] ${source}: missing invoice id in data, skip`);
    return;
  }
  await navigateToInvoiceDetail(invoiceId);
}

function payloadFromIosNotification(notification: any) {
  const data =
    typeof notification?.getData === 'function'
      ? notification.getData()
      : notification?.data;
  return {data};
}

export async function setupFcmListeners() {
  const unsubOnMessage = messaging().onMessage(async remoteMessage => {
    logMsg('FOREGROUND - message received (FCM)', remoteMessage);
  });

  const unsubOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('====================================');
    console.log('[NOTIF] 👉 CLICK khi app đang BACKGROUND (FCM)');
    console.log('====================================');
    logMsg('BACKGROUND CLICK', remoteMessage);
    handleNotificationClick('BACKGROUND CLICK (FCM)', remoteMessage);
  });

  const initialFcm = await messaging().getInitialNotification();
  if (initialFcm) {
    console.log('====================================');
    console.log('[NOTIF] 👉 CLICK khi app đã KILL (FCM cold start)');
    console.log('====================================');
    logMsg('KILLED CLICK', initialFcm);
    handleNotificationClick('KILLED CLICK (FCM)', initialFcm);
  }

  const onIosNotificationPress = (notification: any) => {
    console.log('====================================');
    console.log('[NOTIF] 👉 CLICK khi app đang MỞ (foreground - iOS)');
    console.log('====================================');
    const payload = payloadFromIosNotification(notification);
    logMsg('FOREGROUND CLICK (iOS)', payload);
    handleNotificationClick('FOREGROUND CLICK (iOS)', payload);
  };

  if (Platform.OS === 'ios') {
    PushNotificationIOS.addEventListener(
      'notification',
      onIosNotificationPress,
    );
  }

  const unsubToken = messaging().onTokenRefresh(token => {
    console.log('[FCM] onTokenRefresh:', token);
  });

  return () => {
    unsubOnMessage();
    unsubOnOpened();
    unsubToken();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeEventListener(
        'notification',
        onIosNotificationPress,
      );
    }
  };
}
