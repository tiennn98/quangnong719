import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

import {SCREEN_NAME} from '@/constants/screen-name';
import {navigate, waitForNavigationReady} from '@/navigators/navigation-service';
import {
  getInvoiceDetailById,
  mapInvoiceDetailApiToDTO,
} from './invoice.api';
import {displayLocalNotification, ensureDefaultChannel} from './notifications';

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

export async function setupFcmListeners() {
  try {
    await ensureDefaultChannel();
  } catch (e: any) {
    console.log('[NOTIF] ensureDefaultChannel error:', e?.message || e);
  }

  const unsubOnMessage = messaging().onMessage(async remoteMessage => {
    logMsg('FOREGROUND - message received (chưa click)', remoteMessage);
    try {
      await displayLocalNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        data: remoteMessage?.data as Record<string, any> | undefined,
      });
    } catch (e: any) {
      console.log('[NOTIF] displayLocalNotification error:', e?.message || e);
    }
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

  const unsubNotifeeFg = notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS) {
      console.log('====================================');
      console.log('[NOTIF] 👉 CLICK khi app đang MỞ (foreground - notifee)');
      console.log('====================================');
      logMsg('FOREGROUND CLICK', detail.notification);
      handleNotificationClick(
        'FOREGROUND CLICK (notifee)',
        detail.notification,
      );
    }
  });

  const initialNotifee = await notifee.getInitialNotification();
  if (initialNotifee) {
    console.log('====================================');
    console.log('[NOTIF] 👉 CLICK khi app đã KILL (notifee cold start)');
    console.log('====================================');
    logMsg('KILLED CLICK (notifee)', initialNotifee.notification);
    handleNotificationClick(
      'KILLED CLICK (notifee)',
      initialNotifee.notification,
    );
  }

  const unsubToken = messaging().onTokenRefresh(token => {
    console.log('[FCM] onTokenRefresh:', token);
  });

  return () => {
    unsubOnMessage();
    unsubOnOpened();
    unsubNotifeeFg();
    unsubToken();
  };
}
