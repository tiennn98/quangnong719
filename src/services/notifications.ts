import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';

export async function ensureChannel() {
  if (Platform.OS !== 'android') {return null;}

  return notifee.createChannel({
    id: 'default',
    name: 'Default',
    importance: AndroidImportance.HIGH,
  });
}

export async function displayLocalNotification(opts: {
  title?: string;
  body?: string;
  data?: Record<string, string>;
}) {
  const channelId = await ensureChannel();

  await notifee.displayNotification({
    title: opts.title ?? 'Thông báo',
    body: opts.body ?? '',
    data: opts.data,
    android: Platform.OS === 'android'
      ? {
          channelId: channelId ?? 'default',
          pressAction: {id: 'default'},
          smallIcon: 'ic_launcher', // đảm bảo icon này tồn tại (Android)
        }
      : undefined,
  });
}
