import {SCREEN_NAME} from '@/constants';
import {HomeScreen} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAME.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
