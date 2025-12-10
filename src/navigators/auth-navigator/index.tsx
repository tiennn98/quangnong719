import {SCREEN_NAME} from '@/constants';
import {ConfirmOtpScreen, LoginScreen} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={SCREEN_NAME.CONFIRM_OTP_SCREEN}
        component={ConfirmOtpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
