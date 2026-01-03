import {SCREEN_NAME} from '@/constants';
import {
  BarCodeCustomerScreen,
  ProfileCompletionScreen,
  VoucherUseScreen,
} from '@/screens';
import DeleteAccountOtpScreen from '@/screens/DeleteAccountOtpScreen';
import InvoiceDetailScreen from '@/screens/InvoiceDetailScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomTabNavigator from '../bottom-tab-navigator';

const Stack = createNativeStackNavigator<any>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAME.BOTTOM_TAB_NAVIGATOR}
        component={BottomTabNavigator}
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
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
