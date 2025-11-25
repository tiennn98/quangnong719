import React from 'react';
import {SCREEN_NAME} from '@/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen} from './auth-screen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREEN_NAME.AUTH_STACK}>
      {Object.entries({
        ...AuthScreen,
      }).map(([name, component]) => (
        <Stack.Screen name={name} component={component} key={name} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
