import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAME } from '@/constants';
import BottomTabNavigator from '../bottom-tab-navigator';
import { BarCodeCustomerScreen, ProfileCompletionScreen } from '@/screens';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
