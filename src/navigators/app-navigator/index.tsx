import { SCREEN_NAME } from '@/constants';
import {
  BarCodeCustomerScreen,
  ProfileCompletionScreen,
  VoucherUseScreen,
} from '@/screens';
import DeleteAccountOtpScreen from '@/screens/DeleteAccountOtpScreen';
import InvoiceDetailScreen from '@/screens/InvoiceDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EventDetailScreen, ExchangeGiftsDetailScreen, ExchangeGiftsScreen, ExchangeGiftsSuccessScreen, MyGardenScreen, MyQrcodeScreen, MyVoucherScreen, PushNotificationScreen, VoucherDetailScreen } from '@/screens-v2';
// import BottomTabNavigator from '../bottom-tab-navigator';
import BottomTabsV2 from '../bottom-tab-navigator/bottom-tabs-v2';

const Stack = createNativeStackNavigator<any>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREEN_NAME.BOTTOM_TAB_NAVIGATOR}
        // component={BottomTabNavigator}
        component={BottomTabsV2}
      />

      <Stack.Screen
        name={SCREEN_NAME.BARCODE_CUSTOMER_SCREEN}
        component={BarCodeCustomerScreen}
      />

      <Stack.Screen
        name={SCREEN_NAME.PROFILE_COMPLETION_SCREEN}
        component={ProfileCompletionScreen}
      />

      <Stack.Screen
        name={SCREEN_NAME.INVOICE_DETAIL_SCREEN}
        component={InvoiceDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.VOUCHER_USE_SCREEN}
        component={VoucherUseScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.DELETE_ACCOUNT_OTP_SCREEN}
        component={DeleteAccountOtpScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.MY_GARDEN}
        component={MyGardenScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.MY_QRCODE_SCREEN}
        component={MyQrcodeScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.MY_VOUCHER_SCREEN}
        component={MyVoucherScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.VOUCHER_DETAIL_SCREEN}
        component={VoucherDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EXCHANGE_GIFTS_SCREEN}
        component={ExchangeGiftsScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EXCHANGE_GIFTS_DETAIL_SCREEN}
        component={ExchangeGiftsDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EXCHANGE_GIFTS_SUCCESS_SCREEN}
        component={ExchangeGiftsSuccessScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.EVENT_DETAIL_SCREEN}
        component={EventDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.PUSH_NOTIFICATION_SCREEN}
        component={PushNotificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
