import React from 'react';
import {SCREEN_NAME} from '@/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppScreen} from './app-screen';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCREEN_NAME.HOME}>
      {Object.entries({
        ...AppScreen,
      }).map(([name, component]) => (
        <Stack.Screen name={name} component={component} key={name} />
      ))}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
