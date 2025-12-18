
import {useAppSelector} from '@/redux/store';
import {initFCM, subscribeFcmTokenRefresh} from '@/services/fcm';
import {setupFcmListeners} from '@/services/initNotifications';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {getUniqueId} from 'react-native-device-info';
import AppStackNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import {navigationRef} from './navigation-service';
import { isValidDevicePayload, useUpdateCustomerDevice } from '@/hooks/useUpdateDevice';


const Navigators = () => {
  const accessToken = useAppSelector(state => state.auth.accessToken);


  const updateDeviceMutation = useUpdateCustomerDevice({
    onSuccess: res => console.log('[DEVICE] update ok:', res?.msg ?? 'ok'),
    onError: e => console.log('[DEVICE] update error:', e?.message),
  });

  const didInitRef = useRef(false);
  const fcmTokenRef = useRef<string>('');


  const lastSentRef = useRef<string>('');

  const tryUpdateDevice = async () => {

    if (!accessToken) {
      console.log('[DEVICE] skip update (no accessToken)');
      return;
    }
    const deviceId = await getUniqueId().then(deviceId => deviceId.trim());
    const payload = {
      device_id: deviceId || '',
      fcm_token: fcmTokenRef.current,
    };

    if (!isValidDevicePayload(payload)) {
      console.log('[DEVICE] skip update (missing deviceId/fcmToken)', payload);
      return;
    }

    const signature = `${payload.device_id}::${payload.fcm_token}`;
    if (signature === lastSentRef.current) {
      console.log('[DEVICE] skip update (same payload)');
      return;
    }

    lastSentRef.current = signature;


    await updateDeviceMutation.mutateAsync(payload);
  };


  useEffect(() => {
    if (didInitRef.current) {return;}
    didInitRef.current = true;

    let cleanupListeners: undefined | (() => void);
    let unsubTokenRefresh: undefined | (() => void);

    (async () => {
      try {
        cleanupListeners = await setupFcmListeners();


        const deviceId = getUniqueId();
        console.log('[DEVICE] uniqueId:', deviceId);

        const {fcmToken, apnsToken} = await initFCM();

        if (fcmToken) {
          fcmTokenRef.current = fcmToken;
          console.log('[FCM] token suffix:', fcmToken.slice(-12));
        } else {
          console.log('[FCM] no permission or no token');
        }

        if (apnsToken) {
          console.log('[FCM] apns:', apnsToken);
        }


        unsubTokenRefresh = subscribeFcmTokenRefresh(async newToken => {
          fcmTokenRef.current = newToken;
          console.log('[FCM] token refreshed:', newToken.slice(-12));
          await tryUpdateDevice();
        });


        await tryUpdateDevice();
      } catch (e: any) {
        console.log('[FCM] init error:', e?.message || e);
      }
    })();

    return () => {
      unsubTokenRefresh?.();
      cleanupListeners?.();
    };

  }, []);


  useEffect(() => {
    if (!accessToken) {return;}
    tryUpdateDevice();

  }, [accessToken]);

  return (
    <NavigationContainer ref={navigationRef}>
      {accessToken ? <AppStackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigators;
export {goBack, navigate, navigationRef, replace} from './navigation-service';
